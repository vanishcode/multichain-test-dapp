import { WalletKitProvider } from '@mysten/wallet-kit';
import { Row } from 'antd';

import Connect from './methods/Connect';
import SignMessage from './methods/SignMessage';

export default function Sui() {
  return (
    <WalletKitProvider>
      <Row gutter={16}>
        <Connect />
        <SignMessage />
      </Row>
    </WalletKitProvider>
  );
}
