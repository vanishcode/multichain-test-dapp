import Wrapper from '@/components/Wrapper';
import AddEthereumChain from './methods/AddEthereumChain';
import BlockNumber from './methods/BlockNumber';
import ChainId from './methods/ChainId';
import SendTransaction from './methods/SendTransaction';
import PersonalSign from './methods/SignMessage/personal-sign';
import SwitchEthereumChain from './methods/SwitchEthereumChain';
import WatchAsset from './methods/WatchAsset';

export default function Ethereum() {
  return (
    <Wrapper>
      <SendTransaction />
      <PersonalSign />
      <SwitchEthereumChain />
      <AddEthereumChain />
      <WatchAsset />
      <ChainId />
      <BlockNumber />
    </Wrapper>
  );
}
