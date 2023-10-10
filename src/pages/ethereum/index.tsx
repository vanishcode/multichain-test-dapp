import { Row } from 'antd';

import AddEthereumChain from './methods/AddEthereumChain';
import BlockNumber from './methods/BlockNumber';
import ChainId from './methods/ChainId';
import SendTransaction from './methods/SendTransaction';
import SwitchEthereumChain from './methods/SwitchEthereumChain';
import WatchAsset from './methods/WatchAsset';

export default function Ethereum() {
  return (
    <Row gutter={16}>
      <AddEthereumChain />
      <SwitchEthereumChain />
      <SendTransaction />
      <WatchAsset />
      <ChainId />
      <BlockNumber />
    </Row>
  );
}
