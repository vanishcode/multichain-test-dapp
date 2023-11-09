import { noWalletError } from './errors';

export const ethereumConnect = async () => {
  if (!window.ethereum) {
    noWalletError();
    return null;
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
};

export const keplrConnect = async () => {
  if (!window.keplr) {
    noWalletError();
    return null;
  }

  window.keplr.defaultOptions = {
    sign: {
      preferNoSetFee: true,
      preferNoSetMemo: true,
    },
  };

  await window.keplr.connect();
};

export const tronConnect = async () => {
  if (!window.tronWeb) {
    noWalletError();
    return null;
  }

  await window.tronWeb.request({ method: 'tron_requestAccounts' });
  await window.tronWeb.ready;
};
