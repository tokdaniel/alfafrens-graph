import { getBuiltGraphSdkFor } from "../subgraph";
import { supportedChains } from "./endpoints";
import { DEGENx } from "./constants";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { log } from "fp-ts/Console";
import { ChannelsQuery, type PoolsWithMembersConnectedAndZeroUnitsQuery } from "../subgraph/.graphclient";
import { fetchPaginatedChannels } from "./fetchChannels";
import { Address } from "viem";

interface PaginatedChannelsResponse<T> {
  data: T;
  currentPage: number;
}

export const fetchPaginatedPools = (
  client: ReturnType<typeof getBuiltGraphSdkFor>,
  channelMap: Record<Address, boolean>,
  query: 'PoolsWithMembersConnectedAndZeroUnits' | 'PoolsWithMembersDisConnectedAndNonZeroUnits',
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
      const newPools = response.data.pools.filter(
        (pool) => pool.poolMembers.length > 0 && channelMap[pool.id]
      );

      const newData = accumulatedData.concat({
        data: { pools: newPools },
        currentPage: response.currentPage,
      });

      const logEffect = TE.fromIO(
        log(
          `Fetched page ${response.currentPage + 1}, looking at ${
            response.data.pools.length
          } pools. Matching pools: ${
            newPools.length
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