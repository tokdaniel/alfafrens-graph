import { pipe } from "fp-ts/lib/function";
import TE from "fp-ts/TaskEither";
import {
  aggregatePoolMembers,
  fetchChannels,
  fetchHandles,
  fetchPools,
  writeFiles,
} from "./fetch";

const poolConnectionsHealth = pipe(
  fetchChannels,
  TE.chain(fetchPools),
  TE.chain(fetchHandles),
  TE.chain(aggregatePoolMembers),
  TE.chain(writeFiles)
);

await poolConnectionsHealth();
