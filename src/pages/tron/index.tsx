import Wrapper from '@/components/Wrapper';
import SignMessage from './methods/SignMessage';
import SignTransaction from './methods/SignTransaction';
import GetUsdtName from './methods/SignTransaction/get-usdt-name';
import SendUsdt from './methods/SignTransaction/send-usdt';

export default function Tron() {
  return (
    <Wrapper>
      <SignMessage />
      <SignTransaction />
      <SendUsdt />
      <GetUsdtName />
    </Wrapper>
  );
}
