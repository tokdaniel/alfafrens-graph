import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { ChannelsQuery } from "../../subgraph/.graphclient";

import { log } from "../utils/cli-utils";
import { CHUNK_SIZE } from "../constants";
import { PaginatedChannelOwnerHandlesResponse } from "../types";
import { fetchChannelOwnerHandlesChunk } from "../utils/fetch-utils";

export const fetchChannelOwnerHandles = (
  channels: ChannelsQuery["channels"],
  chunk: number = 0,
  accumulatedData: PaginatedChannelOwnerHandlesResponse = {
    result: { data: [] },
  },
  totalChannels: number = channels.length
): TE.TaskEither<Error, PaginatedChannelOwnerHandlesResponse> => {
  if (channels.length === 0) {
    return TE.right(accumulatedData);
  }

  const currentChunk = channels.slice(0, CHUNK_SIZE);
  const remainingChunks = channels.slice(CHUNK_SIZE);

  return pipe(
    TE.fromIO(
      log(
        `Fetching handles for users: ${(
          ((totalChannels - remainingChunks.length) / totalChannels) *
          100
        ).toFixed(2)}%`
      )
    ),
    TE.chain(() => fetchChannelOwnerHandlesChunk(currentChunk)),
    TE.chain((response) => {
      const newAccumulatedData = {
        result: {
          data: [...accumulatedData.result.data, ...response.result.data],
        },
      };

      if (remainingChunks.length > 0) {
        return fetchChannelOwnerHandles(
          remainingChunks,
          chunk + 1,
          newAccumulatedData,
          totalChannels
        );
      }

      return TE.right(newAccumulatedData);
    })
  );
};
