import { Address } from "viem";
import { PoolsWithMembersConnectedAndZeroUnitsQuery } from "../subgraph/.graphclient";
import { Monoid } from "fp-ts/lib/Monoid";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/Array";

type Pools = PoolsWithMembersConnectedAndZeroUnitsQuery["pools"];

interface MemberAggregation {
  id: Address;
  poolsConnectedWithZeroUnits: Address[];
  poolsDisconnectedWithNonZeroUnits: Address[];
}

const getMemberAggregationMonoid = (): Monoid<
  Map<string, MemberAggregation>
> => ({
  concat: (x, y) => {
    return Array.from(y.keys()).reduce(
      (acc, key) => {
        const existing = acc.get(key.toLowerCase());
        const val = y.get(key.toLowerCase());

        if (existing && val) {
          acc.set(key, {
            id: existing.id,
            poolsConnectedWithZeroUnits: existing.poolsConnectedWithZeroUnits.concat(
              val.poolsConnectedWithZeroUnits
            ),
            poolsDisconnectedWithNonZeroUnits: existing.poolsDisconnectedWithNonZeroUnits.concat(
              val.poolsDisconnectedWithNonZeroUnits
            ),
          });
        } else if (val) {
          acc.set(key, val);
        }

        return acc;
      },
      new Map([...x])
    );
  },
  empty: new Map<string, MemberAggregation>(),
});

export const aggregatePoolMemberConnectionHealth = (
  pools: Pools
): Map<string, MemberAggregation> => {
  const monoid = getMemberAggregationMonoid();
  return pipe(
    pools,
    A.foldMap(monoid)((pool) =>
      pipe(
        pool.poolMembers,
        A.foldMap(monoid)((member) =>
          new Map<string, MemberAggregation>().set(
            member.account.id.toLowerCase(),
            {
              id: member.account.id.toLowerCase() as Address,
              poolsConnectedWithZeroUnits: member.isConnected
                ? [pool.id as Address]
                : [],
                poolsDisconnectedWithNonZeroUnits: !member.isConnected
                ? [pool.id as Address]
                : [],
            }
          )
        )
      )
    )
  );
};
