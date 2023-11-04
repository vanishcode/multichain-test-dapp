import { Row } from 'antd';

import { noWalletError } from '@/utils/errors';
import SignMessage from './methods/SignMessage';
import ApproveByMessage from './methods/SignMessage/approve';
import Approve from './methods/SignTransaction/approve';
import GetUSDTName from './methods/SignTransaction/get-usdt-name';
import SignTransaction from './methods/SignTransaction/index';
import SendUSDT from './methods/SignTransaction/send-usdt';

export default function Page() {
  if (!window.tronWeb) {
    noWalletError();
    return null;
  }

  window.tronWeb.request({ method: 'tron_requestAccounts' });

  return (
    <Row gutter={16}>
      <SignMessage />
      <SignTransaction />
      <SendUSDT />
      <GetUSDTName />
      <Approve />
      <ApproveByMessage />
    </Row>
  );
}
