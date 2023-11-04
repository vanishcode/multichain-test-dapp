import 'umi/typings';

declare global {
  interface Window {
    ethereum: any;
    tronWeb: any;
    keplr: any;
    aptos: any;
    sui: any;
    solana: any;
    bitcoin: any;
    stacks: any;
    starknet: any;
    agentX: any;
  }
}
