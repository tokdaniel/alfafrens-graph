import { Address } from "viem";
import { ChannelsQuery } from "../../subgraph/.graphclient";
import { PaginatedChannelOwnerHandlesResponse, Users } from "../types";

export const transformChannelsToRecord = (
  channels: ChannelsQuery["channels"]
): Record<Address, Address> =>
  channels.reduce(
    (acc, channel) => {
      acc[channel.poolAddress.toLowerCase()] = channel.id.toLocaleLowerCase();
      return acc;
    },
    {} as Record<Address, Address>
  );

export const transformHandlesToRecord = (
  handles: PaginatedChannelOwnerHandlesResponse
): Record<Address, Users["users"]> =>
  handles.result.data.reduce(
    (acc, user) => {
      acc[user.channeladdress] = user.users;
      return acc;
    },
    {} as Record<Address, Users["users"]>
  );
