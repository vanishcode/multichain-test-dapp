import Wrapper from '@/components/Wrapper';
import SignMessageV1 from './methods/SignMessageV1';
import SignTransaction from './methods/SignTransaction';
import GetUsdtName from './methods/SignTransaction/get-usdt-name';
import SendUsdt from './methods/SignTransaction/send-usdt';
import VerifyMessageV1 from './methods/VerifyMessageV1';

export default function Tron() {
  return (
    <Wrapper>
      <SignMessageV1 />
      <VerifyMessageV1 />
      <SignTransaction />
      <SendUsdt />
      <GetUsdtName />
    </Wrapper>
  );
}
