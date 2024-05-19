import { Address } from "viem";
import { ChannelsQuery } from "../../subgraph/.graphclient";
import { alfafrensAPI } from "../endpoints";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { PaginatedChannelOwnerHandlesResponse } from "../types";

export const fetchOwnersOfChannels = (
  channels: Address[] | ChannelsQuery["channels"]
) =>
  fetch(
    alfafrensAPI.url.concat(
      alfafrensAPI.endpoints.getChannelsOwners(
        channels.map((channel) =>
          typeof channel === "string" ? channel : channel.id
        )
      )
    ),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.ALFAFRENS_API_AUTH_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

export const fetchChannelOwnerHandlesChunk = (
  fetchFn: (
    channels: Address[] | ChannelsQuery["channels"]
  ) => Promise<Response>,
  channelsChunk: ChannelsQuery["channels"]
): TE.TaskEither<Error, PaginatedChannelOwnerHandlesResponse> =>
  pipe(
    TE.tryCatch(
      () => fetchFn(channelsChunk).then(processResponse),
      (reason: unknown) => new Error(String(reason))
    )
  );

const processResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data: PaginatedChannelOwnerHandlesResponse = await response.json();
  return data;
};

export const fetchChannelOwnerHandlesChunkC = (
  channels: ChannelsQuery["channels"]
) => fetchChannelOwnerHandlesChunk(fetchOwnersOfChannels, channels);
