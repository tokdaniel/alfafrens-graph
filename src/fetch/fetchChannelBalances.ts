import { getBuiltGraphSdkFor } from "../../subgraph";
import { DEGENx } from "../constants";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { ChannelBalancesQuery } from "../../subgraph/.graphclient";
import { log } from "../utils/cli-utils";

interface PaginatedChannelsResponse<T> {
  data: T;
  currentPage: number;
}

export const fetchPaginatedChannelBalances = (
  client: ReturnType<typeof getBuiltGraphSdkFor>,
  page = 0,
  accumulatedData: PaginatedChannelsResponse<ChannelBalancesQuery> = {
    data: { accountTokenSnapshots: [] },
    currentPage: 0,
  }
): TE.TaskEither<Error, ChannelBalancesQuery["accountTokenSnapshots"]> => {
  return pipe(
    TE.tryCatch(
      () =>
        client
          .ChannelBalances({
            degenx: DEGENx,
            first: 1000,
            skip: page * 1000,
          })
          .then((response) => {
            if (!response?.accountTokenSnapshots) {
              throw new Error("Failed to Fetch");
            }
            return {
              currentPage: page,
              data: response,
            };
          }),
      (reason: unknown) => new Error(String(reason))
    ),
    TE.chain((response) => {
      const newData = {
        data: {
          accountTokenSnapshots: [
            ...accumulatedData.data.accountTokenSnapshots,
            ...response.data.accountTokenSnapshots,
          ],
        },
        currentPage: response.currentPage,
      };

      const logEffect = TE.fromIO(
        log(
          `Fetched page ${response.currentPage + 1}, ${
            response.data.accountTokenSnapshots.length
          } snapshots found. Cumulative number of snapshots: ${
            newData.data.accountTokenSnapshots.length
          }`
        )
      );

      return pipe(
        logEffect,
        TE.chain(() => {
          if (response.data.accountTokenSnapshots.length === 1000) {
            return fetchPaginatedChannelBalances(
              client,
              response.currentPage + 1,
              newData
            );
          } else {
            return TE.right(newData.data.accountTokenSnapshots);
          }
        })
      );
    })
  );
};
