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

const client = getBuiltGraphSdkFor(supportedChains.base.id);

const poolConnectionsHealth = pipe(
  TE.Do,
  TE.chainFirst(() => TE.fromIO(log("\nFetching Channels...\n"))),
  TE.bind("channelData", () => fetchPaginatedChannels(client)),
  TE.bind("channelMap", ({ channelData }) =>
    TE.right(transformChannelsToRecord(channelData))
  ),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.\n`))),
  TE.chainFirst(({ channelData }) =>
    TE.fromIO(log(`\nFetching handles for ${channelData.length} channels...\n`))
  ),
  TE.bind("handles", ({ channelData }) =>
    fetchChannelOwnerHandles(channelData)
  ),
  TE.bind("handleMap", ({ handles }) =>
    TE.right(transformHandlesToRecord(handles))
  ),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.\n`))),
  TE.chainFirst(() =>
    TE.fromIO(
      log(
        "\nFetching pools containing poolMembers connected, with 0 units...\n"
      )
    )
  ),
  TE.bind("poolsCuEQ0", ({ channelMap }) =>
    fetchPaginatedPools(
      client,
      channelMap,
      "PoolsWithMembersConnectedAndZeroUnits"
    )
  ),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.\n`))),
  TE.chainFirst(() =>
    TE.fromIO(
      log(
        "\nFetching pools containing poolMembers disconnected, with x > 0 units...\n"
      )
    )
  ),
  TE.bind("poolsDuGT0", ({ channelMap }) =>
    fetchPaginatedPools(
      client,
      channelMap,
      "PoolsWithMembersDisConnectedAndNonZeroUnits"
    )
  ),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.\n`))),
  TE.chainFirst(() =>
    TE.fromIO(log(`\nGrouping pool health data based on members.\n`))
  ),
  TE.bind(
    "memberConnectionHealth",
    ({ poolsCuEQ0, poolsDuGT0, channelMap, handleMap }) =>
      TE.right(
        aggregatePoolMemberConnectionHealth(
          poolsCuEQ0.concat(poolsDuGT0),
          channelMap,
          handleMap
        )
      )
  ),
  TE.chainFirst(() => TE.fromIO(log(`\n✅ done.\n`))),
  TE.chain(({ poolsCuEQ0, poolsDuGT0, memberConnectionHealth }) =>
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
      )
    )
  ),
  TE.chainFirst(() =>
    TE.fromIO(
      log(
        [
          "\n✅ Writing into files complete.\n",
          "\tfiles:",
          "\n\t-- PoolsWithMembersConnectedAndZeroUnits.json",
          "\n\t-- PoolsWithMembersConnectedAndZeroUnits.json",
          "\n\t-- MemberConnectionHealth.json",
        ].join("")
      )
    )
  )
);

await poolConnectionsHealth();
