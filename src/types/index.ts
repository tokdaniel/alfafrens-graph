import { Address } from "viem";

export interface Users {
  channeladdress: Address;
  users: {
    handle: string;
    aa_address: string;
  };
}

export interface PaginatedChannelOwnerHandlesResponse {
  result: {
    data: Users[];
  };
}

export interface PaginatedChannelsResponse<T> {
  data: T;
  currentPage: number;
}

export interface MemberAggregation {
  user: Users["users"];
  poolsConnectedWithZeroUnits: Address[];
  poolsDisconnectedWithNonZeroUnits: Address[];
}
