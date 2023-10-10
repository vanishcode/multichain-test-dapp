import { Layout, Menu, Typography } from 'antd';
import React from 'react';
import 'reset-css';
import { history, Outlet, useLocation } from 'umi';

import useConnect from '@/hooks/useConnect';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const items = [
  'ethereum',
  'tron',
  'bitcoin',
  'cosmos',
  'solana',
  'aptos',
  'sui',
  'starknet',
  'stacks',
].map((v) => {
  return {
    key: v,
    label: v,
  };
});

const Layouts: React.FC = () => {
  useConnect();
  const location = useLocation();
  const route = location.pathname.split('/')[1];

  return (
    <Layout style={{ minWidth: '360px' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title
          style={{ color: 'white', margin: '0 16px', minWidth: '180px' }}
          level={5}
        >
          Multichain Test DApp
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[route || 'ethereum']}
          items={items}
          onClick={(item) => {
            history.push(`/${item.key}`);
          }}
        />
      </Header>
      <Content style={{ background: 'white', padding: '16px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Multichain Test DApp ©2023 Created by OKFE
      </Footer>
    </Layout>
  );
};

export default Layouts;
