import { getBuiltGraphSdkFor } from "../protocol-subgraph";
import { supportedChains } from "./endpoints";
import { DEGENx } from "./constants";
import { type PoolsWithMembersConnectedAndZeroUnitsQuery } from "../protocol-subgraph/.graphclient";
import { writeFileSync } from "fs";

import channels from "../channels/channels.json";
import { type Address } from "viem";


// Map of channelPools to identify if an address is a channel's pool
const channelMap = channels.data.channels.reduce<Record<Address, boolean>>(
  (acc, { poolAddress }) => {
    acc[poolAddress.toLowerCase() as Address] = true;

    return acc;
  },
  {}
);

const client = getBuiltGraphSdkFor(supportedChains.base.id);

{
  console.log(
    `Fetching pools with members connected and zero units for DEGENx: ${DEGENx}\n`
  );

  let allPools: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"] = [];
  let pools: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"] = [];
  let skip = 0;

  //fetch the first set of pools
  const data = await client.PoolsWithMembersConnectedAndZeroUnits({
    degenx: DEGENx,
    first: 1000,
    skip,
  });

  let resultLength = data.pools.length;

  pools = data.pools.filter((pool) => pool.poolMembers.length > 0);
  allPools = allPools.concat(pools);

  console.log(
    `running 0. iteration, looking at ${resultLength}, ${pools.length} matching pools found. Cumulative number of matching pools: ${allPools.length}`
  );

  while (resultLength > 0) {
    skip += 1000;
    const data = await client.PoolsWithMembersConnectedAndZeroUnits({
      degenx: DEGENx,
      first: 1000,
      skip,
    });

    resultLength = data.pools.length;

    pools = data.pools.filter((pool) => pool.poolMembers.length > 0);
    allPools = allPools.concat(pools);

    console.log(
      `running ${skip / 1000}. iteration, looking at ${resultLength} pools, ${
        pools.length
      } matching pools found. Cumulative number of matching pools: ${
        allPools.length
      }`
    );
  }

  writeFileSync(
    "PoolsWithMembersConnectedAndZeroUnits.json",
    JSON.stringify(
      allPools.filter(({ id }) => channelMap[id.toLowerCase() as Address]),
      null,
      2
    )
  );

  console.log("\n ✅ Saved to PoolsWithMembersConnectedAndZeroUnits.json");
}

console.log(
  "\n\n ============================================================================================================================================= \n\n"
);

{
  console.log(
    `Fetching pools with members not-connected and x>zero units for DEGENx: ${DEGENx}\n`
  );

  let allPools: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"] = [];
  let pools: PoolsWithMembersConnectedAndZeroUnitsQuery["pools"] = [];

  let skip = 0;
  const data = await client.PoolsWithMembersDisConnectedAndNonZeroUnits({
    degenx: DEGENx,
    first: 1000,
    skip,
  });

  let resultLength = data.pools.length;

  pools = data.pools.filter(
    (pool) => pool.poolMembers.length > 0 && channelMap[pool.id.toLowerCase() as Address]
  );
  allPools = allPools.concat(pools);

  console.log(
    `running 0. iteration, looking at ${resultLength} pools, ${pools.length} matching pools found. Cumulative number of matching pools: ${allPools.length}`
  );

  while (resultLength > 0) {
    skip += 1000;
    const data = await client.PoolsWithMembersConnectedAndZeroUnits({
      degenx: DEGENx,
      first: 1000,
      skip,
    });

    resultLength = data.pools.length;

    pools = data.pools.filter(
      (pool) => pool.poolMembers.length > 0 && channelMap[pool.id.toLowerCase() as Address]
    );
    allPools = allPools.concat(pools);

    console.log(
      `running ${skip / 1000}. iteration, looking at ${resultLength} pools, ${
        pools.length
      } matching pools found. Cumulative number of matching pools: ${
        allPools.length
      }`
    );
  }

  writeFileSync(
    "PoolsWithMembersDisConnectedAndNonZeroUnits.json",
    JSON.stringify(
      allPools,
      null,
      2
    )
  );

  console.log(
    "\n ✅ Saved to PoolsWithMembersDisConnectedAndNonZeroUnits.json"
  );
}
