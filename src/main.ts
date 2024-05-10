import { pipe } from "fp-ts/lib/function";
import { getBuiltGraphSdkFor } from "../subgraph";
import { supportedChains } from "./endpoints";
import { fetchPaginatedChannels } from "./fetchChannels";
import TE from "fp-ts/TaskEither";
import { writeFile } from "./utils/file-utis";
import { fetchPaginatedPools } from "./fetchPools";
import { ChannelsQuery } from "../subgraph/.graphclient";

const client = getBuiltGraphSdkFor(supportedChains.base.id);

const transformChannelsToRecord = (
  channels: ChannelsQuery["channels"]
): Record<string, boolean> =>
  channels.reduce(
    (acc, channel) => {
      acc[channel.poolAddress] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );

const main = pipe(
  TE.Do,
  TE.bind("channelData", () => fetchPaginatedChannels(client)),
  TE.bind("channelMap", ({ channelData }) =>
    TE.right(transformChannelsToRecord(channelData))
  ),
  TE.bind("poolsCuEQ0", ({ channelMap }) =>
    fetchPaginatedPools(
      client,
      channelMap,
      "PoolsWithMembersConnectedAndZeroUnits"
    )
  ),
  TE.bind("poolsDuGT0", ({ channelMap }) =>
    fetchPaginatedPools(
      client,
      channelMap,
      "PoolsWithMembersDisConnectedAndNonZeroUnits"
    )
  ),
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
  )
);

await main();
