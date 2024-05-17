import { Address } from "viem";
import { ChannelsQuery } from "../../subgraph/.graphclient";
import * as TE from "fp-ts/TaskEither";
import {
  ChannelMap,
  HandleMap,
  PaginatedChannelOwnerHandlesResponse,
} from "../types";
import { pipe } from "fp-ts/lib/function";

export const transformChannelsToRecord = (
  channels: ChannelsQuery["channels"]
): ChannelMap =>
  channels.reduce<ChannelMap>((acc, channel) => {
    acc[channel.poolAddress.toLowerCase()] = {
      channelAddress: channel.poolAddress,
      owner: channel.owner,
    };
    acc[channel.id.toLowerCase()] = {
      channelAddress: channel.poolAddress,
      owner: channel.owner,
    };
    return acc;
  }, {});

export const transformHandlesToRecord = (
  handles: PaginatedChannelOwnerHandlesResponse,
  channelMap: ChannelMap
): HandleMap =>
  handles.result.data.reduce<HandleMap>((acc, user) => {
    acc[channelMap[user.channeladdress as Address].owner] = {
      channelAddress: user.channeladdress,
      handle: user.users.handle,
      aa_address: user.users.aa_address,
    };
    return acc;
  }, {});

export const withCtx =
  <A, B>(fn: (ctx: A) => TE.TaskEither<Error, { ctx: B }>) =>
  (obj: { ctx: A }): TE.TaskEither<Error, { ctx: B }> =>
    fn(obj.ctx);
