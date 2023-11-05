export const CHAINS: Array<string> = [
  'ethereum',
  'tron',
  'cosmos',
  'solana',
  'aptos',
  'sui',
  'bitcoin',
  'starknet',
  'stacks',
];

const baseImageUrl = (name: string): string =>
  `https://static.coinall.ltd/cdn/wallet/logo/${name}.png`;

export const CHAIN_LOGOS: Record<string, string> = {
  ethereum: baseImageUrl('ETH'),
  tron: baseImageUrl('TRX'),
  cosmos: baseImageUrl('ATOM'),
  solana: baseImageUrl('SOL-20220525'),
  aptos: baseImageUrl('APTOS'),
  sui: baseImageUrl('sui_17700'),
  bitcoin: baseImageUrl('BTC'),
  starknet: baseImageUrl('starknet_21000'),
  stacks: baseImageUrl('stx_19400'),
};
