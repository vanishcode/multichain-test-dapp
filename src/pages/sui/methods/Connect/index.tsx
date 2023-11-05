import Wrapper from '@/components/Wrapper';
import { ConnectButton } from '@mysten/wallet-kit';

export default function Connect() {
  return (
    <Wrapper name="Connect">
      <ConnectButton />
    </Wrapper>
  );
}
