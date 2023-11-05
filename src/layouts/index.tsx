import { Image, Layout, Menu, Typography } from 'antd';
import React from 'react';
import 'reset-css';
import { history, Outlet, useLocation } from 'umi';

import { CHAINS, CHAIN_LOGOS } from './const';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const items = CHAINS.map((v) => {
  return {
    key: v,
    label: v,
    icon: (
      <Image
        src={CHAIN_LOGOS[v]}
        width={24}
        preview={false}
        wrapperStyle={{
          marginRight: 6,
        }}
        style={{
          verticalAlign: -6,
        }}
      />
    ),
  };
});

const Layouts: React.FC = () => {
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
