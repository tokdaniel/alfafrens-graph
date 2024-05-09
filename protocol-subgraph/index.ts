import { getBuiltGraphSDK } from "./.graphclient";
import { type ChainId, subgraphUrls } from "../src/endpoints";

export const getBuiltGraphSdkFor = (chainId: ChainId) =>
  getBuiltGraphSDK({
    url: subgraphUrls[chainId].url,
  });
