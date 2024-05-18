import { pipe } from "fp-ts/lib/function";
import TE from "fp-ts/TaskEither";
import {
  fetchChannelBalances,
  fetchChannels,
  fetchHandles,
  fetchPools,
  writeChannelBalancesFile,
  writePoolHealthFiles,
} from "./fetch";
import { aggregateChannelBalances, aggregatePoolMembers } from "./aggregate";

const poolConnectionsHealth = pipe(
  fetchChannels,
  TE.chain(fetchPools),
  TE.chain(fetchHandles),
  TE.chain(aggregatePoolMembers),
  TE.chain(writePoolHealthFiles)
);

const totalLockedDegenBalance = pipe(
  fetchChannelBalances,
  TE.chain(aggregateChannelBalances),
  TE.chain(writeChannelBalancesFile)
);

//await poolConnectionsHealth();
 await totalLockedDegenBalance();
