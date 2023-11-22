import Wrapper from '@/components/Wrapper';
import SignMessage from './methods/SignMessage';
import SignTransaction from './methods/SignTransaction';

export default function Solana() {
  return (
    <Wrapper>
      <SignMessage />
      <SignTransaction />
    </Wrapper>
  );
}
