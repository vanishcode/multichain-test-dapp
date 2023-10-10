import SendTx from './methods/SendTx';
import SignAmino from './methods/SignAmino';
import SignArbitrary from './methods/SignArbitrary';
import SignDirect from './methods/SignDirect';
import VerifyArbitrary from './methods/VerifyArbitrary';

export default function Cosmos() {
  return (
    <div>
      <h1>Cosmos</h1>
      <SignAmino />
      <SignDirect />
      <SignArbitrary />
      <VerifyArbitrary />
      <SendTx />
    </div>
  );
}
