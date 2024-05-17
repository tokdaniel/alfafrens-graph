import { pipe } from "fp-ts/lib/function";
import { getBuiltGraphSdkFor } from "../../subgraph";
import { supportedChains } from "../endpoints";
import { fetchPaginatedChannels } from "./fetchChannels";
import TE from "fp-ts/TaskEither";
import { writeFile } from "../utils/file-utis";
import { fetchPaginatedPools } from "./fetchPools";
import { log } from "fp-ts/lib/Console";
import { aggregatePoolMemberConnectionHealth } from "../memberConnectionHealthAggregation";
import { fetchChannelOwnerHandles } from "./fetchChannelOwnerHandles";

import {
  transformChannelsToRecord,
  transformHandlesToRecord,
  withCtx,
} from "../utils/transform";
import {
  ChannelsQuery,
  PoolsWithMembersConnectedAndZeroUnitsQuery,
  PoolsWithMembersDisConnectedAndNonZeroUnitsQuery,
} from "../../subgraph/.graphclient";
import { ChannelMap, HandleMap, MemberAggregation } from "../types";

const client = getBuiltGraphSdkFor(supportedChains.base.id);

export const fetchChannels = pipe(
  TE.Do,
  TE.chainFirst(() => TE.fromIO(log("\nFetching Channels...\n"))),
  TE.bind("channelData", () => fetchPaginatedChannels(client)),
  TE.let("ctx", ({ channelData }) => ({
    channelData,
    channelMap: transformChannelsToRecord(channelData),
  })),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`)))
);

export const fetchHandles = withCtx(
  ({
    channelMap,
    channelData,
    poolsCuEQ0,
    poolsDuGT0,
  }: {
    channelMap: ChannelMap;
    channelData: ChannelsQuery["channels"];
    poolsCuEQ0: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"];
    poolsDuGT0: PoolsWithMembersDisConnectedAndNonZeroUnitsQuery["pools"];
  }) =>
    pipe(
      TE.Do,
      TE.chainFirst(() =>
        TE.fromIO(
          log(`\nFetching handles for ${channelData.length} channels...\n`)
        )
      ),
      TE.bind("handles", () => fetchChannelOwnerHandles(channelData)),
      TE.let("ctx", ({ handles }) => ({
        poolsCuEQ0,
        poolsDuGT0,
        handleMap: transformHandlesToRecord(handles, channelMap),
      })),
      TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`)))
    )
);

export const fetchPools = withCtx(
  ({
    channelData,
    channelMap,
  }: {
    channelData: ChannelsQuery["channels"];
    channelMap: ChannelMap;
  }) =>
    pipe(
      TE.Do,
      TE.chainFirst(() =>
        TE.fromIO(
          log(
            "\nFetching pools containing poolMembers connected, with 0 units...\n"
          )
        )
      ),
      TE.bind("poolsCuEQ0", () =>
        fetchPaginatedPools(
          client,
          channelMap,
          "PoolsWithMembersConnectedAndZeroUnits"
        )
      ),
      TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`))),
      TE.chainFirst(() =>
        TE.fromIO(
          log(
            "\nFetching pools containing poolMembers disconnected, with x > 0 units...\n"
          )
        )
      ),
      TE.bind("poolsDuGT0", () =>
        fetchPaginatedPools(
          client,
          channelMap,
          "PoolsWithMembersDisConnectedAndNonZeroUnits"
        )
      ),
      TE.let("ctx", ({ poolsCuEQ0, poolsDuGT0 }) => ({
        channelData,
        channelMap,
        poolsCuEQ0,
        poolsDuGT0,
      })),
      TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`)))
    )
);

export const aggregatePoolMembers = withCtx(
  ({
    poolsCuEQ0,
    poolsDuGT0,
    handleMap,
  }: {
    poolsCuEQ0: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"];
    poolsDuGT0: PoolsWithMembersDisConnectedAndNonZeroUnitsQuery["pools"];
    handleMap: HandleMap;
  }) =>
    pipe(
      TE.Do,
      TE.chainFirst(() =>
        TE.fromIO(log(`\nGrouping pool health data based on members.`))
      ),
      TE.let("ctx", () => ({
        poolsCuEQ0,
        poolsDuGT0,
        memberConnectionHealth: aggregatePoolMemberConnectionHealth(
          poolsCuEQ0.concat(poolsDuGT0),
          handleMap
        ),
      })),
      TE.chainFirst(() => TE.fromIO(log(`✅ done.`))),
      TE.mapLeft((e) => new Error(e))
    )
);

export const writeFiles = withCtx(
  ({
    poolsCuEQ0,
    poolsDuGT0,
    memberConnectionHealth,
  }: {
    memberConnectionHealth: Map<string, MemberAggregation>;
    poolsCuEQ0: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"];
    poolsDuGT0: PoolsWithMembersDisConnectedAndNonZeroUnitsQuery["pools"];
  }) =>
    pipe(
      writeFile(
        "PoolsWithMembersConnectedAndZeroUnits.json",
        JSON.stringify(poolsCuEQ0, null, 2)
      ),
      TE.chain(() =>
        writeFile(
          "PoolsWithMembersDisConnectedAndNonZeroUnits.json",
          JSON.stringify(poolsDuGT0, null, 2)
        )
      ),
      TE.chain(() =>
        writeFile(
          "MemberConnectionHealth.json",
          JSON.stringify(
            Object.fromEntries(memberConnectionHealth.entries()),
            null,
            2
          )
        )
      ),
      TE.chainFirst(() =>
        TE.fromIO(
          log(
            `\nFiles saved into:\n${[
              "\t- PoolsWithMembersConnectedAndZeroUnits.json",
              "\t- PoolsWithMembersDisConnectedAndNonZeroUnits.json",
              "\t- MemberConnectionHealth.json",
            ].join("\n")}\n`
          )
        )
      ),
      TE.chain(() => TE.right({ ctx: void 0 }))
    )
);
