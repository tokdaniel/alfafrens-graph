import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import {
  ChannelBalancesQuery,
  PoolsWithMembersConnectedAndZeroUnitsQuery,
  PoolsWithMembersDisConnectedAndNonZeroUnitsQuery,
} from "../../subgraph/.graphclient";
import { HandleMap } from "../types";
import { withCtx } from "../utils/transform";
import { log } from "fp-ts/lib/Console";
import { aggregatePoolMemberConnectionHealth } from "./memberConnectionHealthAggregation";
import { calculateTotalChannelBalanceLocked } from "./channelBalanceAggregation";
import { formatEther } from "viem";

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

export const aggregateChannelBalances = withCtx(
  ({
    channelBalances,
  }: {
    channelBalances: ChannelBalancesQuery["accountTokenSnapshots"];
  }) =>
    pipe(
      TE.Do,
      TE.chainFirst(() =>
        TE.fromIO(log(`\nCalculating total DEGENx balance locked in channels.`))
      ),
      TE.let("ctx", () => ({
        totalBalanceLocked: calculateTotalChannelBalanceLocked(channelBalances),
      })),
      TE.chainFirst(({ ctx }) =>
        TE.fromIO(log(`Total balance locked: ${ctx.totalBalanceLocked} DEGENx`))
      ),
      TE.chainFirst(() => TE.fromIO(log(`✅ done.`))),
      TE.mapLeft((e) => new Error(e))
    )
);
