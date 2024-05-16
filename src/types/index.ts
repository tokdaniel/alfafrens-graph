import { Address } from "viem";

export interface User {
  channelAddress: Address;
  handle: string;
  aa_address: string;
}

export interface PaginatedChannelOwnerHandlesResponse {
  result: {
    data: {
      channeladdress: Address;
      users: { handle: string; aa_address: string };
    }[];
  };
}

export interface PaginatedChannelsResponse<T> {
  data: T;
  currentPage: number;
}

export interface MemberAggregation {
  user: User;
  poolsConnectedWithZeroUnits: Address[];
  poolsDisconnectedWithNonZeroUnits: Address[];
}

export type ChannelMap = Record<
  Address,
  { channelAddress: Address; owner: Address }
>;
export type HandleMap = Record<Address, User>;
