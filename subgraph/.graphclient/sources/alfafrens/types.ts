// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace AlfafrensTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Channel = {
  /**
   * The address of the deployed channel contract.
   *
   */
  id: Scalars['Bytes'];
  /**
   * Last updated timestamp of the channel.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt'];
  /**
   * The account that executed the creation of the channel.
   *
   */
  creator: Scalars['Bytes'];
  /**
   * The content creator of the channel.
   *
   */
  owner: Scalars['Bytes'];
  /**
   * The flow rate required to subscribe to this channel.
   *
   */
  subscriptionFlowRatePrice: Scalars['BigInt'];
  /**
   * The percentage of the subscription flow rate that goes to the creator.
   *
   */
  creatorSubscriptionPercentage: Scalars['BigInt'];
  /**
   * Pool address associated with this channel.
   *
   */
  poolAddress: Scalars['Bytes'];
  /**
   * Total number of active subscribers
   *
   */
  numberOfSubscribers: Scalars['Int'];
  /**
   * Total number of stakers
   *
   */
  numberOfStakers: Scalars['Int'];
  /**
   * The total amount of $FAN tokens currently staked in this channel.
   *
   */
  currentStaked: Scalars['BigInt'];
  /**
   * The total amount of $FAN tokens claimed in this channel.
   *
   */
  totalClaimed: Scalars['BigInt'];
  /**
   * Estimated earnings per second per FAN staked.
   * Note that this is calculated using a scaling factor. See `utils.ts` and `constants.ts` for more details.
   *
   */
  estimatedEarningsPerSecond: Scalars['BigInt'];
  /**
   * The ratio of subscription income to amount of FAN staked: `totalSubscriptionFlowRate` * SCALING_FACTOR / `currentStaked`.
   * Note that this is calculated using a scaling factor. See `utils.ts` and `constants.ts` for more details.
   *
   */
  incomeToStakeRatio: Scalars['BigInt'];
  /**
   * The ratio of FAN staked to subscription income: `currentStaked` * SCALING_FACTOR / `totalSubscriptionFlowRate`.
   * Note that this is calculated using a scaling factor. See `utils.ts` and `constants.ts` for more details.
   *
   */
  stakeToIncomeRatio: Scalars['BigInt'];
  /**
   * The cashback flowrate from the pool to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowRate: Scalars['BigInt'];
  /**
   * Total subscription cashback streamed to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowAmount: Scalars['BigInt'];
  /**
   * The current in flow rate of the channel.
   *
   */
  totalSubscriptionFlowRate: Scalars['BigInt'];
  /**
   * Total subscription inflows streamed to channel.
   *
   */
  totalSubscriptionInflowAmount: Scalars['BigInt'];
  /**
   * The subscribers of this channel.
   *
   */
  subscribers: Array<ChannelMember>;
};


export type ChannelsubscribersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
};

export type ChannelMember = {
  /**
   * The concatenated address of the channel and subscriber:
   * channel.id.concat(user.id)
   *
   */
  id: Scalars['Bytes'];
  /**
   * The status of the channel member, the possible states are:
   * "INACTIVE" | "ACTIVE" | "STOPPED" | "LIQUIDATED"
   *
   */
  status: Scalars['String'];
  /**
   * A boolean indicating whether the user is subscribed to this channel.
   *
   */
  isSubscribed: Scalars['Boolean'];
  /**
   * A boolean indicating whether the user is staked to this channel.
   *
   */
  isStaked: Scalars['Boolean'];
  /**
   * The amount of $FAN tokens currently staked by this user to this channel.
   *
   */
  currentStaked: Scalars['BigInt'];
  /**
   * The total amount of $FAN tokens claimed by this user in this channel.
   *
   */
  totalClaimed: Scalars['BigInt'];
  /**
   * Last updated timestamp of the channel.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt'];
  /**
   * The timestamp this user claimed for this channel.
   *
   */
  lastClaimedTimestamp: Scalars['BigInt'];
  /**
   * The current outflow rate from the channel subscriber to the channels (excludes external flows).
   *
   */
  totalSubscriptionOutflowRate: Scalars['BigInt'];
  /**
   * Total subscription amount streamed to the channel.
   *
   */
  totalSubscriptionOutflowAmount: Scalars['BigInt'];
  /**
   * The estimated current cashback inflow rate to the user from `channel`.
   * This is estimated because it is based on the flowrate from the pool to the user at the
   * lastUpdatedTimestamp. This value changes when other users join the pool.
   *
   */
  estimatedTotalCashbackFlowRate: Scalars['BigInt'];
  /**
   * The estimated total cashback amount to the user from `channel`.
   * This is estimated because it is based on the `estimatedTotalCashbackRate`.
   *
   */
  estimatedTotalCashbackAmount: Scalars['BigInt'];
  /**
   * The channel that this subscriber is subscribed to.
   *
   */
  channel: Channel;
  /**
   * The subscriber of this channel.
   *
   */
  subscriber: User;
};

export type ChannelMember_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  status?: InputMaybe<Scalars['String']>;
  status_not?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_contains_nocase?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']>;
  status_starts_with?: InputMaybe<Scalars['String']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_starts_with?: InputMaybe<Scalars['String']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_ends_with?: InputMaybe<Scalars['String']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_ends_with?: InputMaybe<Scalars['String']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  isSubscribed?: InputMaybe<Scalars['Boolean']>;
  isSubscribed_not?: InputMaybe<Scalars['Boolean']>;
  isSubscribed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isSubscribed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isStaked?: InputMaybe<Scalars['Boolean']>;
  isStaked_not?: InputMaybe<Scalars['Boolean']>;
  isStaked_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isStaked_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  currentStaked?: InputMaybe<Scalars['BigInt']>;
  currentStaked_not?: InputMaybe<Scalars['BigInt']>;
  currentStaked_gt?: InputMaybe<Scalars['BigInt']>;
  currentStaked_lt?: InputMaybe<Scalars['BigInt']>;
  currentStaked_gte?: InputMaybe<Scalars['BigInt']>;
  currentStaked_lte?: InputMaybe<Scalars['BigInt']>;
  currentStaked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentStaked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastClaimedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastClaimedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowRate?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowAmount?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackFlowRate?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_not?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_gt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_lt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_gte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_lte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackAmount?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_not?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_gt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_lt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_gte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_lte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  channel?: InputMaybe<Scalars['String']>;
  channel_not?: InputMaybe<Scalars['String']>;
  channel_gt?: InputMaybe<Scalars['String']>;
  channel_lt?: InputMaybe<Scalars['String']>;
  channel_gte?: InputMaybe<Scalars['String']>;
  channel_lte?: InputMaybe<Scalars['String']>;
  channel_in?: InputMaybe<Array<Scalars['String']>>;
  channel_not_in?: InputMaybe<Array<Scalars['String']>>;
  channel_contains?: InputMaybe<Scalars['String']>;
  channel_contains_nocase?: InputMaybe<Scalars['String']>;
  channel_not_contains?: InputMaybe<Scalars['String']>;
  channel_not_contains_nocase?: InputMaybe<Scalars['String']>;
  channel_starts_with?: InputMaybe<Scalars['String']>;
  channel_starts_with_nocase?: InputMaybe<Scalars['String']>;
  channel_not_starts_with?: InputMaybe<Scalars['String']>;
  channel_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  channel_ends_with?: InputMaybe<Scalars['String']>;
  channel_ends_with_nocase?: InputMaybe<Scalars['String']>;
  channel_not_ends_with?: InputMaybe<Scalars['String']>;
  channel_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  channel_?: InputMaybe<Channel_filter>;
  subscriber?: InputMaybe<Scalars['String']>;
  subscriber_not?: InputMaybe<Scalars['String']>;
  subscriber_gt?: InputMaybe<Scalars['String']>;
  subscriber_lt?: InputMaybe<Scalars['String']>;
  subscriber_gte?: InputMaybe<Scalars['String']>;
  subscriber_lte?: InputMaybe<Scalars['String']>;
  subscriber_in?: InputMaybe<Array<Scalars['String']>>;
  subscriber_not_in?: InputMaybe<Array<Scalars['String']>>;
  subscriber_contains?: InputMaybe<Scalars['String']>;
  subscriber_contains_nocase?: InputMaybe<Scalars['String']>;
  subscriber_not_contains?: InputMaybe<Scalars['String']>;
  subscriber_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subscriber_starts_with?: InputMaybe<Scalars['String']>;
  subscriber_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subscriber_not_starts_with?: InputMaybe<Scalars['String']>;
  subscriber_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subscriber_ends_with?: InputMaybe<Scalars['String']>;
  subscriber_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subscriber_not_ends_with?: InputMaybe<Scalars['String']>;
  subscriber_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subscriber_?: InputMaybe<User_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ChannelMember_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ChannelMember_filter>>>;
};

export type ChannelMember_orderBy =
  | 'id'
  | 'status'
  | 'isSubscribed'
  | 'isStaked'
  | 'currentStaked'
  | 'totalClaimed'
  | 'lastUpdatedTimestamp'
  | 'lastClaimedTimestamp'
  | 'totalSubscriptionOutflowRate'
  | 'totalSubscriptionOutflowAmount'
  | 'estimatedTotalCashbackFlowRate'
  | 'estimatedTotalCashbackAmount'
  | 'channel'
  | 'channel__id'
  | 'channel__lastUpdatedTimestamp'
  | 'channel__creator'
  | 'channel__owner'
  | 'channel__subscriptionFlowRatePrice'
  | 'channel__creatorSubscriptionPercentage'
  | 'channel__poolAddress'
  | 'channel__numberOfSubscribers'
  | 'channel__numberOfStakers'
  | 'channel__currentStaked'
  | 'channel__totalClaimed'
  | 'channel__estimatedEarningsPerSecond'
  | 'channel__incomeToStakeRatio'
  | 'channel__stakeToIncomeRatio'
  | 'channel__totalSubscriptionCashbackFlowRate'
  | 'channel__totalSubscriptionCashbackFlowAmount'
  | 'channel__totalSubscriptionFlowRate'
  | 'channel__totalSubscriptionInflowAmount'
  | 'subscriber'
  | 'subscriber__id'
  | 'subscriber__currentStaked'
  | 'subscriber__totalClaimed'
  | 'subscriber__lastUpdatedTimestamp'
  | 'subscriber__lastClaimedTimestamp'
  | 'subscriber__lastUnstakedTimestamp'
  | 'subscriber__numberOfSubscriptions'
  | 'subscriber__numberOfStakes'
  | 'subscriber__totalSubscriptionOutflowRate'
  | 'subscriber__totalSubscriptionOutflowAmount'
  | 'subscriber__estimatedTotalCashbackFlowRate'
  | 'subscriber__estimatedTotalCashbackAmount';

export type Channel_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creator?: InputMaybe<Scalars['Bytes']>;
  creator_not?: InputMaybe<Scalars['Bytes']>;
  creator_gt?: InputMaybe<Scalars['Bytes']>;
  creator_lt?: InputMaybe<Scalars['Bytes']>;
  creator_gte?: InputMaybe<Scalars['Bytes']>;
  creator_lte?: InputMaybe<Scalars['Bytes']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_contains?: InputMaybe<Scalars['Bytes']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  subscriptionFlowRatePrice?: InputMaybe<Scalars['BigInt']>;
  subscriptionFlowRatePrice_not?: InputMaybe<Scalars['BigInt']>;
  subscriptionFlowRatePrice_gt?: InputMaybe<Scalars['BigInt']>;
  subscriptionFlowRatePrice_lt?: InputMaybe<Scalars['BigInt']>;
  subscriptionFlowRatePrice_gte?: InputMaybe<Scalars['BigInt']>;
  subscriptionFlowRatePrice_lte?: InputMaybe<Scalars['BigInt']>;
  subscriptionFlowRatePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  subscriptionFlowRatePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorSubscriptionPercentage?: InputMaybe<Scalars['BigInt']>;
  creatorSubscriptionPercentage_not?: InputMaybe<Scalars['BigInt']>;
  creatorSubscriptionPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  creatorSubscriptionPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  creatorSubscriptionPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  creatorSubscriptionPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  creatorSubscriptionPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorSubscriptionPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolAddress?: InputMaybe<Scalars['Bytes']>;
  poolAddress_not?: InputMaybe<Scalars['Bytes']>;
  poolAddress_gt?: InputMaybe<Scalars['Bytes']>;
  poolAddress_lt?: InputMaybe<Scalars['Bytes']>;
  poolAddress_gte?: InputMaybe<Scalars['Bytes']>;
  poolAddress_lte?: InputMaybe<Scalars['Bytes']>;
  poolAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolAddress_contains?: InputMaybe<Scalars['Bytes']>;
  poolAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  numberOfSubscribers?: InputMaybe<Scalars['Int']>;
  numberOfSubscribers_not?: InputMaybe<Scalars['Int']>;
  numberOfSubscribers_gt?: InputMaybe<Scalars['Int']>;
  numberOfSubscribers_lt?: InputMaybe<Scalars['Int']>;
  numberOfSubscribers_gte?: InputMaybe<Scalars['Int']>;
  numberOfSubscribers_lte?: InputMaybe<Scalars['Int']>;
  numberOfSubscribers_in?: InputMaybe<Array<Scalars['Int']>>;
  numberOfSubscribers_not_in?: InputMaybe<Array<Scalars['Int']>>;
  numberOfStakers?: InputMaybe<Scalars['Int']>;
  numberOfStakers_not?: InputMaybe<Scalars['Int']>;
  numberOfStakers_gt?: InputMaybe<Scalars['Int']>;
  numberOfStakers_lt?: InputMaybe<Scalars['Int']>;
  numberOfStakers_gte?: InputMaybe<Scalars['Int']>;
  numberOfStakers_lte?: InputMaybe<Scalars['Int']>;
  numberOfStakers_in?: InputMaybe<Array<Scalars['Int']>>;
  numberOfStakers_not_in?: InputMaybe<Array<Scalars['Int']>>;
  currentStaked?: InputMaybe<Scalars['BigInt']>;
  currentStaked_not?: InputMaybe<Scalars['BigInt']>;
  currentStaked_gt?: InputMaybe<Scalars['BigInt']>;
  currentStaked_lt?: InputMaybe<Scalars['BigInt']>;
  currentStaked_gte?: InputMaybe<Scalars['BigInt']>;
  currentStaked_lte?: InputMaybe<Scalars['BigInt']>;
  currentStaked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentStaked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedEarningsPerSecond?: InputMaybe<Scalars['BigInt']>;
  estimatedEarningsPerSecond_not?: InputMaybe<Scalars['BigInt']>;
  estimatedEarningsPerSecond_gt?: InputMaybe<Scalars['BigInt']>;
  estimatedEarningsPerSecond_lt?: InputMaybe<Scalars['BigInt']>;
  estimatedEarningsPerSecond_gte?: InputMaybe<Scalars['BigInt']>;
  estimatedEarningsPerSecond_lte?: InputMaybe<Scalars['BigInt']>;
  estimatedEarningsPerSecond_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedEarningsPerSecond_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  incomeToStakeRatio?: InputMaybe<Scalars['BigInt']>;
  incomeToStakeRatio_not?: InputMaybe<Scalars['BigInt']>;
  incomeToStakeRatio_gt?: InputMaybe<Scalars['BigInt']>;
  incomeToStakeRatio_lt?: InputMaybe<Scalars['BigInt']>;
  incomeToStakeRatio_gte?: InputMaybe<Scalars['BigInt']>;
  incomeToStakeRatio_lte?: InputMaybe<Scalars['BigInt']>;
  incomeToStakeRatio_in?: InputMaybe<Array<Scalars['BigInt']>>;
  incomeToStakeRatio_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stakeToIncomeRatio?: InputMaybe<Scalars['BigInt']>;
  stakeToIncomeRatio_not?: InputMaybe<Scalars['BigInt']>;
  stakeToIncomeRatio_gt?: InputMaybe<Scalars['BigInt']>;
  stakeToIncomeRatio_lt?: InputMaybe<Scalars['BigInt']>;
  stakeToIncomeRatio_gte?: InputMaybe<Scalars['BigInt']>;
  stakeToIncomeRatio_lte?: InputMaybe<Scalars['BigInt']>;
  stakeToIncomeRatio_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stakeToIncomeRatio_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowRate?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowAmount?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionFlowRate?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionInflowAmount?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionInflowAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionInflowAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionInflowAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionInflowAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionInflowAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionInflowAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionInflowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  subscribers_?: InputMaybe<ChannelMember_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Channel_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Channel_filter>>>;
};

export type Channel_orderBy =
  | 'id'
  | 'lastUpdatedTimestamp'
  | 'creator'
  | 'owner'
  | 'subscriptionFlowRatePrice'
  | 'creatorSubscriptionPercentage'
  | 'poolAddress'
  | 'numberOfSubscribers'
  | 'numberOfStakers'
  | 'currentStaked'
  | 'totalClaimed'
  | 'estimatedEarningsPerSecond'
  | 'incomeToStakeRatio'
  | 'stakeToIncomeRatio'
  | 'totalSubscriptionCashbackFlowRate'
  | 'totalSubscriptionCashbackFlowAmount'
  | 'totalSubscriptionFlowRate'
  | 'totalSubscriptionInflowAmount'
  | 'subscribers';

export type GlobalData = {
  /**
   * An arbitrary ID for the global data.
   *
   */
  id: Scalars['Bytes'];
  /**
   * Last updated timestamp of the channel.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt'];
  /**
   * The total amount of tokens staked in all channels.
   *
   */
  totalStaked: Scalars['BigInt'];
  /**
   * The total amount of tokens staked in all channels.
   *
   */
  totalClaimed: Scalars['BigInt'];
  /**
   * The total subscription flow rate of all channels.
   *
   */
  totalSubscriptionFlowRate: Scalars['BigInt'];
  /**
   * The total amount of tokens streamed to all channels.
   *
   */
  totalSubscriptionFlowAmount: Scalars['BigInt'];
  /**
   * The cashback flowrate from the pool to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowRate: Scalars['BigInt'];
  /**
   * Total subscription cashback streamed to all the channel pool members.
   *
   */
  totalSubscriptionCashbackFlowAmount: Scalars['BigInt'];
  /**
   * The total number of subscriptions (a single user can have multiple subscriptions to different channels).
   *
   */
  totalNumberOfSubscriptions: Scalars['Int'];
  /**
   * The total number of stakers (a single user can stake in multiple channels).
   *
   */
  totalNumberOfStakers: Scalars['Int'];
  /**
   * The total number of channels/Users.
   *
   */
  totalNumberOfChannels: Scalars['Int'];
};

export type GlobalData_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStaked?: InputMaybe<Scalars['BigInt']>;
  totalStaked_not?: InputMaybe<Scalars['BigInt']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionFlowRate?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionFlowAmount?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionFlowAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionFlowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowRate?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowAmount?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionCashbackFlowAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionCashbackFlowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNumberOfSubscriptions?: InputMaybe<Scalars['Int']>;
  totalNumberOfSubscriptions_not?: InputMaybe<Scalars['Int']>;
  totalNumberOfSubscriptions_gt?: InputMaybe<Scalars['Int']>;
  totalNumberOfSubscriptions_lt?: InputMaybe<Scalars['Int']>;
  totalNumberOfSubscriptions_gte?: InputMaybe<Scalars['Int']>;
  totalNumberOfSubscriptions_lte?: InputMaybe<Scalars['Int']>;
  totalNumberOfSubscriptions_in?: InputMaybe<Array<Scalars['Int']>>;
  totalNumberOfSubscriptions_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalNumberOfStakers?: InputMaybe<Scalars['Int']>;
  totalNumberOfStakers_not?: InputMaybe<Scalars['Int']>;
  totalNumberOfStakers_gt?: InputMaybe<Scalars['Int']>;
  totalNumberOfStakers_lt?: InputMaybe<Scalars['Int']>;
  totalNumberOfStakers_gte?: InputMaybe<Scalars['Int']>;
  totalNumberOfStakers_lte?: InputMaybe<Scalars['Int']>;
  totalNumberOfStakers_in?: InputMaybe<Array<Scalars['Int']>>;
  totalNumberOfStakers_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalNumberOfChannels?: InputMaybe<Scalars['Int']>;
  totalNumberOfChannels_not?: InputMaybe<Scalars['Int']>;
  totalNumberOfChannels_gt?: InputMaybe<Scalars['Int']>;
  totalNumberOfChannels_lt?: InputMaybe<Scalars['Int']>;
  totalNumberOfChannels_gte?: InputMaybe<Scalars['Int']>;
  totalNumberOfChannels_lte?: InputMaybe<Scalars['Int']>;
  totalNumberOfChannels_in?: InputMaybe<Array<Scalars['Int']>>;
  totalNumberOfChannels_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GlobalData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GlobalData_filter>>>;
};

export type GlobalData_orderBy =
  | 'id'
  | 'lastUpdatedTimestamp'
  | 'totalStaked'
  | 'totalClaimed'
  | 'totalSubscriptionFlowRate'
  | 'totalSubscriptionFlowAmount'
  | 'totalSubscriptionCashbackFlowRate'
  | 'totalSubscriptionCashbackFlowAmount'
  | 'totalNumberOfSubscriptions'
  | 'totalNumberOfStakers'
  | 'totalNumberOfChannels';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  user?: Maybe<User>;
  users: Array<User>;
  channelMember?: Maybe<ChannelMember>;
  channelMembers: Array<ChannelMember>;
  globalData?: Maybe<GlobalData>;
  globalDatas: Array<GlobalData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerychannelArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychannelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Channel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Channel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychannelMemberArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychannelMembersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryglobalDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryglobalDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GlobalData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GlobalData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  user?: Maybe<User>;
  users: Array<User>;
  channelMember?: Maybe<ChannelMember>;
  channelMembers: Array<ChannelMember>;
  globalData?: Maybe<GlobalData>;
  globalDatas: Array<GlobalData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionchannelArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchannelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Channel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Channel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchannelMemberArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchannelMembersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionglobalDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionglobalDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GlobalData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GlobalData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type User = {
  /**
   * The address of the user.
   *
   */
  id: Scalars['Bytes'];
  /**
   * The creator channel for this user. Users can only have one creator channel.
   * They also do not need to have a channel to stake/subscribe, etc.
   *
   */
  userChannel?: Maybe<Channel>;
  /**
   * The total amount of $FAN tokens currently staked by this user.
   *
   */
  currentStaked: Scalars['BigInt'];
  /**
   * The total amount of $FAN tokens claimed by this user.
   *
   */
  totalClaimed: Scalars['BigInt'];
  /**
   * Last updated timestamp of the User.
   *
   */
  lastUpdatedTimestamp: Scalars['BigInt'];
  /**
   * Last claimed timestamp.
   *
   */
  lastClaimedTimestamp: Scalars['BigInt'];
  /**
   * The last timestamp the user unstaked.
   *
   */
  lastUnstakedTimestamp: Scalars['BigInt'];
  /**
   * The number of channels the user is subscribed to.
   *
   */
  numberOfSubscriptions: Scalars['Int'];
  /**
   * Total number of channels the user is staked to.
   *
   */
  numberOfStakes: Scalars['Int'];
  /**
   * The current outflow rate from the user to all the channels (excludes external flows).
   *
   */
  totalSubscriptionOutflowRate: Scalars['BigInt'];
  /**
   * Total subscription outflows streamed to different channels.
   *
   */
  totalSubscriptionOutflowAmount: Scalars['BigInt'];
  /**
   * The estimated current cashback inflow rate to the user from all the channels.
   * This is estimated because it is based on the flowrate from the pool to the user at the
   * lastUpdatedTimestamp. This value changes when other users join the pool.
   *
   */
  estimatedTotalCashbackFlowRate: Scalars['BigInt'];
  /**
   * The estimated total cashback amount to the user from all the channels.
   * This is estimated because it is based on the `estimatedTotalCashbackRate`.
   *
   */
  estimatedTotalCashbackAmount: Scalars['BigInt'];
  /**
   * The channels that this user is subscribed to.
   *
   */
  channels: Array<ChannelMember>;
};


export type UserchannelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChannelMember_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChannelMember_filter>;
};

export type User_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  userChannel?: InputMaybe<Scalars['String']>;
  userChannel_not?: InputMaybe<Scalars['String']>;
  userChannel_gt?: InputMaybe<Scalars['String']>;
  userChannel_lt?: InputMaybe<Scalars['String']>;
  userChannel_gte?: InputMaybe<Scalars['String']>;
  userChannel_lte?: InputMaybe<Scalars['String']>;
  userChannel_in?: InputMaybe<Array<Scalars['String']>>;
  userChannel_not_in?: InputMaybe<Array<Scalars['String']>>;
  userChannel_contains?: InputMaybe<Scalars['String']>;
  userChannel_contains_nocase?: InputMaybe<Scalars['String']>;
  userChannel_not_contains?: InputMaybe<Scalars['String']>;
  userChannel_not_contains_nocase?: InputMaybe<Scalars['String']>;
  userChannel_starts_with?: InputMaybe<Scalars['String']>;
  userChannel_starts_with_nocase?: InputMaybe<Scalars['String']>;
  userChannel_not_starts_with?: InputMaybe<Scalars['String']>;
  userChannel_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  userChannel_ends_with?: InputMaybe<Scalars['String']>;
  userChannel_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userChannel_not_ends_with?: InputMaybe<Scalars['String']>;
  userChannel_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userChannel_?: InputMaybe<Channel_filter>;
  currentStaked?: InputMaybe<Scalars['BigInt']>;
  currentStaked_not?: InputMaybe<Scalars['BigInt']>;
  currentStaked_gt?: InputMaybe<Scalars['BigInt']>;
  currentStaked_lt?: InputMaybe<Scalars['BigInt']>;
  currentStaked_gte?: InputMaybe<Scalars['BigInt']>;
  currentStaked_lte?: InputMaybe<Scalars['BigInt']>;
  currentStaked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentStaked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']>;
  totalClaimed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalClaimed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastClaimedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastClaimedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastClaimedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUnstakedTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUnstakedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUnstakedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUnstakedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUnstakedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUnstakedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUnstakedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUnstakedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numberOfSubscriptions?: InputMaybe<Scalars['Int']>;
  numberOfSubscriptions_not?: InputMaybe<Scalars['Int']>;
  numberOfSubscriptions_gt?: InputMaybe<Scalars['Int']>;
  numberOfSubscriptions_lt?: InputMaybe<Scalars['Int']>;
  numberOfSubscriptions_gte?: InputMaybe<Scalars['Int']>;
  numberOfSubscriptions_lte?: InputMaybe<Scalars['Int']>;
  numberOfSubscriptions_in?: InputMaybe<Array<Scalars['Int']>>;
  numberOfSubscriptions_not_in?: InputMaybe<Array<Scalars['Int']>>;
  numberOfStakes?: InputMaybe<Scalars['Int']>;
  numberOfStakes_not?: InputMaybe<Scalars['Int']>;
  numberOfStakes_gt?: InputMaybe<Scalars['Int']>;
  numberOfStakes_lt?: InputMaybe<Scalars['Int']>;
  numberOfStakes_gte?: InputMaybe<Scalars['Int']>;
  numberOfStakes_lte?: InputMaybe<Scalars['Int']>;
  numberOfStakes_in?: InputMaybe<Array<Scalars['Int']>>;
  numberOfStakes_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSubscriptionOutflowRate?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowAmount?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSubscriptionOutflowAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSubscriptionOutflowAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackFlowRate?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_not?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_gt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_lt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_gte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_lte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackFlowRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackFlowRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackAmount?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_not?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_gt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_lt?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_gte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_lte?: InputMaybe<Scalars['BigInt']>;
  estimatedTotalCashbackAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  estimatedTotalCashbackAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  channels_?: InputMaybe<ChannelMember_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'userChannel'
  | 'userChannel__id'
  | 'userChannel__lastUpdatedTimestamp'
  | 'userChannel__creator'
  | 'userChannel__owner'
  | 'userChannel__subscriptionFlowRatePrice'
  | 'userChannel__creatorSubscriptionPercentage'
  | 'userChannel__poolAddress'
  | 'userChannel__numberOfSubscribers'
  | 'userChannel__numberOfStakers'
  | 'userChannel__currentStaked'
  | 'userChannel__totalClaimed'
  | 'userChannel__estimatedEarningsPerSecond'
  | 'userChannel__incomeToStakeRatio'
  | 'userChannel__stakeToIncomeRatio'
  | 'userChannel__totalSubscriptionCashbackFlowRate'
  | 'userChannel__totalSubscriptionCashbackFlowAmount'
  | 'userChannel__totalSubscriptionFlowRate'
  | 'userChannel__totalSubscriptionInflowAmount'
  | 'currentStaked'
  | 'totalClaimed'
  | 'lastUpdatedTimestamp'
  | 'lastClaimedTimestamp'
  | 'lastUnstakedTimestamp'
  | 'numberOfSubscriptions'
  | 'numberOfStakes'
  | 'totalSubscriptionOutflowRate'
  | 'totalSubscriptionOutflowAmount'
  | 'estimatedTotalCashbackFlowRate'
  | 'estimatedTotalCashbackAmount'
  | 'channels';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  channel: InContextSdkMethod<Query['channel'], QuerychannelArgs, MeshContext>,
  /** null **/
  channels: InContextSdkMethod<Query['channels'], QuerychannelsArgs, MeshContext>,
  /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  channelMember: InContextSdkMethod<Query['channelMember'], QuerychannelMemberArgs, MeshContext>,
  /** null **/
  channelMembers: InContextSdkMethod<Query['channelMembers'], QuerychannelMembersArgs, MeshContext>,
  /** null **/
  globalData: InContextSdkMethod<Query['globalData'], QueryglobalDataArgs, MeshContext>,
  /** null **/
  globalDatas: InContextSdkMethod<Query['globalDatas'], QueryglobalDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  channel: InContextSdkMethod<Subscription['channel'], SubscriptionchannelArgs, MeshContext>,
  /** null **/
  channels: InContextSdkMethod<Subscription['channels'], SubscriptionchannelsArgs, MeshContext>,
  /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  channelMember: InContextSdkMethod<Subscription['channelMember'], SubscriptionchannelMemberArgs, MeshContext>,
  /** null **/
  channelMembers: InContextSdkMethod<Subscription['channelMembers'], SubscriptionchannelMembersArgs, MeshContext>,
  /** null **/
  globalData: InContextSdkMethod<Subscription['globalData'], SubscriptionglobalDataArgs, MeshContext>,
  /** null **/
  globalDatas: InContextSdkMethod<Subscription['globalDatas'], SubscriptionglobalDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["alfafrens"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
