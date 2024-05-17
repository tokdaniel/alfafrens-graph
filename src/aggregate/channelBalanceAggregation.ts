import { Monoid } from "fp-ts/lib/Monoid";
import { ChannelBalance } from "../types";
import { ChannelBalancesQuery } from "../../subgraph/.graphclient";
import * as A from "fp-ts/Array";
import { formatEther, parseEther } from "viem";
import { pipe } from "fp-ts/lib/function";

const getChannelBalancesMonoid = (): Monoid<bigint> => ({
  concat: (x, y) => x + y,
  empty: 0n,
});

const calculateBalance = (entry: ChannelBalance, now: bigint): bigint => {
  const updatedAt = BigInt(entry.updatedAtTimestamp);
  const balanceUntilUpdatedAt = BigInt(entry.balanceUntilUpdatedAt);
  const totalNetFlowRate = BigInt(entry.totalNetFlowRate);

  return balanceUntilUpdatedAt + (now - updatedAt) * totalNetFlowRate;
};

export const calculateTotalChannelBalanceLocked = (
  balances: ChannelBalancesQuery["accountTokenSnapshots"]
): string => {
  const monoid = getChannelBalancesMonoid();
  const now = BigInt(Math.floor(Date.now() / 1000));

  return formatEther(
    pipe(
      balances,
      A.foldMap(monoid)((entry) => calculateBalance(entry, now))
    )
  );
};
