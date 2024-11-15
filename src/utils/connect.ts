import { notification } from 'antd';
import { noWalletError } from './errors';

export const ethereumConnect = async () => {
  if (!window.ethereum && !window.okxwallet) {
    noWalletError();
    return null;
  }

  if (!window.ethereum) {
    notification.error({
      message: 'window.ethereum not found',
      description: 'Use window.okxwallet to replace window.ethereum',
    });
    window.ethereum = window.okxwallet;
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
};

export const keplrConnect = async () => {
  if (!window.keplr && !window.okxwallet) {
    noWalletError();
    return null;
  }

  try {
    await window.keplr.enable();
    await window.keplr.connect();
  } catch (error) {
    noWalletError();
    return null;
  }
};

export const tronConnect = async () => {
  if (!window.tronWeb && !window.okxwallet) {
    noWalletError();
    return null;
  }

  await window.tronWeb.request({ method: 'tron_requestAccounts' });
  await window.tronWeb.ready;
};

export const solanaConnect = async () => {
  if ((!window.phantom && !window.solana) || !window.okxwallet) {
    noWalletError();
    return null;
  }
  await window.phantom.solana.connect();
};

export const aptosConnect = async () => {
  if ((!window.petra && !window.aptos) || !window.okxwallet) {
    noWalletError();
    return null;
  }
  await window.aptos.connect();
};

export const stacksConnect = async () => {
  if (!window.stacks && !window.okxwallet) {
    noWalletError();
    return null;
  }
  await window.stacks.connect();
};

export const starknetConnect = async () => {
  if ((!window.argentX && !window.starknet_okxwallet) || !window.okxwallet) {
    noWalletError();
    return null;
  }
  await window.starknet_okxwallet.enable();
};
