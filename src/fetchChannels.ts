import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { getBuiltGraphSdkFor } from "../subgraph";
import { ChannelsQuery } from "../subgraph/.graphclient";
import { PaginatedChannelsResponse } from "./types";
import { log } from "./utils/cli-utils";

export const fetchPaginatedChannels = (
  client: ReturnType<typeof getBuiltGraphSdkFor>,
  page: number = 0,
  accumulatedData: PaginatedChannelsResponse<ChannelsQuery>[] = []
): TE.TaskEither<Error, ChannelsQuery["channels"]> =>
  pipe(
    TE.tryCatch(
      () =>
        client.Channels({ first: 1000, skip: page * 1000 }).then((response) => {
          if (!response?.channels) {
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
      const newData = accumulatedData.concat({
        data: response.data,
        currentPage: response.currentPage,
      });

      const logEffect = TE.fromIO(
        log(
          `Fetched page ${response.currentPage + 1}, ${
            response.data.channels.length
          } channels found. Cumulative number of channels: ${
            newData.flatMap((d) => d.data.channels).length
          }`
        )
      );

      return pipe(
        logEffect,
        TE.chain(() => {
          if (response.data.channels.length === 1000) {
            return fetchPaginatedChannels(
              client,
              response.currentPage + 1,
              newData
            );
          } else {
            return TE.right(newData.flatMap((d) => d.data.channels));
          }
        })
      );
    })
  );
