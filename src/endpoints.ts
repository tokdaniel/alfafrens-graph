import * as chains from "viem/chains"
import metadata from '@superfluid-finance/metadata'

export const supportedChains = {
    // arbitrum: chains.arbitrum,
    // arbitrumGoerli: chains.arbitrumGoerli,
    // avalanche: chains.avalanche,
    // avalancheFuji: chains.avalancheFuji,
    base: chains.base,
    // baseGoerli: chains.baseGoerli,
    // bsc: chains.bsc,
    // celo: chains.celo
    // gnosis: chains.gnosis,
    // goerli: chains.goerli,
    // mainnet: chains.mainnet,
    // optimism: chains.optimism,
    // optimismGoerli: chains.optimismGoerli,
    // polygon: chains.polygon,
    // polygonMumbai: chains.polygonMumbai
  } as const

  export type SupportedNetworkName = keyof typeof supportedChains
  export type SupportedChain = typeof supportedChains[SupportedNetworkName]
  export type ChainId = SupportedChain['id']


  export const supportedChainEntries = Object.entries(supportedChains) as [
    SupportedNetworkName,
    SupportedChain
  ][]

  
  export const subgraphUrls = supportedChainEntries.reduce<Record<ChainId, { url: string; fallback: string }>>((acc, [_, chain]) => {
    const canonicalName = metadata.networks.find(
      ({ chainId }) => chainId === chain.id
    )?.name
    return Object.assign(
      acc,
      canonicalName
        ? {
            [chain.id]: {
              url: `https://${canonicalName}.subgraph.x.superfluid.dev`,
              fallback: `https://https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-${canonicalName}`
            }
          }
        : {}
    )
  }, {} as Record<ChainId, { url: string; fallback: string }>)