import Wrapper from '@/components/Wrapper';
import SendTx from './methods/SendTx';
import SignAmino from './methods/SignAmino';
import SignArbitrary from './methods/SignArbitrary';
import SignDirect from './methods/SignDirect';
import VerifyArbitrary from './methods/VerifyArbitrary';

export default function Cosmos() {
  return (
    <Wrapper>
      <SignAmino />
      <SignArbitrary />
      <SignDirect />
      <VerifyArbitrary />
      <SendTx />
    </Wrapper>
  );
}
