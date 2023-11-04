import { notification } from 'antd';

export function noWalletError() {
  notification.error({
    message: 'Wallet not found',
    description: 'Please install Wallet',
  });
  return null;
}
