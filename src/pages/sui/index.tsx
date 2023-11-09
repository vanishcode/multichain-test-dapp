import { WalletKitProvider } from '@mysten/wallet-kit';

import Wrapper from '@/components/Wrapper';
import Connect from './methods/Connect';
import SignMessage from './methods/SignMessage';

export default function Sui() {
  return (
    <WalletKitProvider>
      <Wrapper>
        <Connect />
        <SignMessage />
      </Wrapper>
    </WalletKitProvider>
  );
}
