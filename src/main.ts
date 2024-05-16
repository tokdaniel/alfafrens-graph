import { pipe } from "fp-ts/lib/function";
import { getBuiltGraphSdkFor } from "../subgraph";
import { supportedChains } from "./endpoints";
import { fetchPaginatedChannels } from "./fetchChannels";
import TE from "fp-ts/TaskEither";
import { writeFile } from "./utils/file-utis";
import { fetchPaginatedPools } from "./fetchPools";
import { log } from "fp-ts/lib/Console";
import { aggregatePoolMemberConnectionHealth } from "./memberConnectionHealthAggregation";
import { fetchChannelOwnerHandles } from "./fetchChannelOwnerHandles";

import {
  transformChannelsToRecord,
  transformHandlesToRecord,
} from "./utils/transform";
import {
  ChannelsQuery,
  PoolsWithMembersConnectedAndZeroUnitsQuery,
  PoolsWithMembersDisConnectedAndNonZeroUnitsQuery,
} from "../subgraph/.graphclient";
import { ChannelMap, HandleMap } from "./types";

const client = getBuiltGraphSdkFor(supportedChains.base.id);

const fetchChannels = pipe(
  TE.Do,
  TE.chainFirst(() => TE.fromIO(log("\nFetching Channels...\n"))),
  TE.bind("channelData", () => fetchPaginatedChannels(client)),
  TE.let("ctx", ({ channelData }) => ({
    channelMap: transformChannelsToRecord(channelData),
  })),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`)))
);

const fetchHandles = (
  channelData: ChannelsQuery["channels"],
  channelMap: ChannelMap
) =>
  pipe(
    TE.Do,
    TE.chainFirst(() =>
      TE.fromIO(
        log(`\nFetching handles for ${channelData.length} channels...\n`)
      )
    ),
    TE.bind("handles", () => fetchChannelOwnerHandles(channelData)),
    TE.let("ctx", ({ handles }) => ({
      channelData,
      channelMap,
      handleMap: transformHandlesToRecord(handles, channelMap),
    })),
    TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`)))
  );

const fetchPools = (channelMap: ChannelMap, handleMap: HandleMap) =>
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
      poolsCuEQ0,
      poolsDuGT0,
      handleMap,
    })),
    TE.chainFirst(() => TE.fromIO(log(`\n✅ done.`)))
  );

const poolConnectionsHealth = pipe(
  fetchChannels,
  TE.chain(({ channelData, ctx }) => fetchHandles(channelData, ctx.channelMap)),
  TE.chain(({ ctx }) => fetchPools(ctx.channelMap, ctx.handleMap)),
  TE.chainFirst(() =>
    TE.fromIO(log(`\nGrouping pool health data based on members.`))
  ),
  TE.let("result", ({ ctx }) => ({
    ...ctx,
    memberConnectionHealth: aggregatePoolMemberConnectionHealth(
      ctx.poolsCuEQ0.concat(ctx.poolsDuGT0),
      ctx.handleMap
    ),
  })),
  TE.chainFirst(() => TE.fromIO(log(`✅ done.`))),
  TE.chain(({ result }) =>
    pipe(
      writeFile(
        "PoolsWithMembersConnectedAndZeroUnits.json",
        JSON.stringify(result.poolsCuEQ0, null, 2)
      ),
      TE.chain(() =>
        writeFile(
          "PoolsWithMembersDisConnectedAndNonZeroUnits.json",
          JSON.stringify(result.poolsDuGT0, null, 2)
        )
      ),
      TE.chain(() =>
        writeFile(
          "MemberConnectionHealth.json",
          JSON.stringify(
            Object.fromEntries(result.memberConnectionHealth.entries()),
            null,
            2
          )
        )
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
  )
);

await poolConnectionsHealth();
