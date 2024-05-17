import { getBuiltGraphSdkFor } from "../../subgraph";
import { DEGENx } from "../constants";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { type PoolsWithMembersConnectedAndZeroUnitsQuery } from "../../subgraph/.graphclient";
import { Address } from "viem";
import { ChannelMap, User } from "../types";
import { log } from "../utils/cli-utils";

interface PaginatedChannelsResponse<T> {
  data: T;
  currentPage: number;
}

export const fetchPaginatedPools = (
  client: ReturnType<typeof getBuiltGraphSdkFor>,
  channelMap: ChannelMap,
  query:
    | "PoolsWithMembersConnectedAndZeroUnits"
    | "PoolsWithMembersDisConnectedAndNonZeroUnits",
  page = 0,
  accumulatedData: PaginatedChannelsResponse<PoolsWithMembersConnectedAndZeroUnitsQuery>[] = []
): TE.TaskEither<
  Error,
  PoolsWithMembersConnectedAndZeroUnitsQuery["pools"]
> => {
  return pipe(
    TE.tryCatch(
      () =>
        client[query]({
          degenx: DEGENx,
          first: 1000,
          skip: page * 1000,
        }).then((response) => {
          if (!response?.pools) {
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
      const pools = response.data.pools.filter((pool) => {
        return (
          pool.poolMembers.length > 0 &&
          Boolean(channelMap[pool.id.toLowerCase() as Address])
        );
      });

      const newData = accumulatedData.concat({
        data: { pools },
        currentPage: response.currentPage,
      });

      const logEffect = TE.fromIO(
        log(
          `Fetched page ${response.currentPage + 1}, looking at ${
            response.data.pools.length
          } pools. Matching pools: ${
            pools.length
          } Cumulative number of pools: ${
            newData.flatMap((d) => d.data.pools).length
          }`
        )
      );

      return pipe(
        logEffect,
        TE.chain(() => {
          if (response.data.pools.length === 1000) {
            return fetchPaginatedPools(
              client,
              channelMap,
              query,
              response.currentPage + 1,
              newData
            );
          } else {
            return TE.right(newData.flatMap((d) => d.data.pools));
          }
        })
      );
    })
  );
};
