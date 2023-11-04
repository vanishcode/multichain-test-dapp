import Wrapper from '@/components/Wrapper';
import { ConnectButton, WalletProvider } from '@suiet/wallet-kit';

export default function VerifyArbitrary() {
  return (
    <Wrapper name="ConnectButton">
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>
    </Wrapper>
  );
}
