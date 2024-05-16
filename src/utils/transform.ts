import { Address } from "viem";
import { ChannelsQuery } from "../../subgraph/.graphclient";
import {
  ChannelMap,
  HandleMap,
  PaginatedChannelOwnerHandlesResponse,
} from "../types";

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
