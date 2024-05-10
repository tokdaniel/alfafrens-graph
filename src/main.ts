import { pipe } from "fp-ts/lib/function";
import { getBuiltGraphSdkFor } from "../subgraph";
import { supportedChains } from "./endpoints";
import { fetchPaginatedChannels } from "./fetchChannels";
import TE from "fp-ts/TaskEither";
import { writeFile } from "./utils/file-utis";
import { fetchPaginatedPools } from "./fetchPools";
import { ChannelsQuery } from "../subgraph/.graphclient";
import { log } from "fp-ts/lib/Console";

const client = getBuiltGraphSdkFor(supportedChains.base.id);

const transformChannelsToRecord = (
  channels: ChannelsQuery["channels"]
): Record<string, boolean> =>
  channels.reduce(
    (acc, channel) => {
      acc[channel.poolAddress.toLowerCase()] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );

const main = pipe(
  TE.Do,
  TE.chainFirst(() => TE.fromIO(log("\nFetching Channels...\n"))),
  TE.bind("channelData", () => fetchPaginatedChannels(client)),
  TE.bind("channelMap", ({ channelData }) =>
    TE.right(transformChannelsToRecord(channelData))
  ),
  TE.chainFirst(() => TE.fromIO(log("\nFetching pools containing poolMembers connected, with 0 units...\n"))),
  TE.bind("poolsCuEQ0", ({ channelMap }) =>
    fetchPaginatedPools(
      client,
      channelMap,
      "PoolsWithMembersConnectedAndZeroUnits"
    )
  ),
  TE.chainFirst(() => TE.fromIO(log("\nFetching pools containing poolMembers disconnected, with x > 0 units...\n"))),
  TE.bind("poolsDuGT0", ({ channelMap }) =>
    fetchPaginatedPools(
      client,
      channelMap,
      "PoolsWithMembersDisConnectedAndNonZeroUnits"
    )
  ),
  TE.chainFirst(() => TE.fromIO(log("\n✅ Fetching Complete. Writing into files..."))),
  TE.chain(({ poolsCuEQ0, poolsDuGT0 }) =>
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
      )
    )
  ),
  TE.chainFirst(() => TE.fromIO(log("\n✅ Writing into files complete.\n\tfiles:\n\t\t-- PoolsWithMembersConnectedAndZeroUnits.json\n\t\t-- PoolsWithMembersConnectedAndZeroUnits.json\n"))),
);

await main();
