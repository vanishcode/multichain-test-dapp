import { Image, Layout, Menu, theme, Typography } from 'antd';
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minWidth: '320px' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colorBgContainer,
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
        }}
      >
        <Title style={{ margin: '0 16px 0 0', minWidth: '180px' }} level={5}>
          Multichain Test DApp
        </Title>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[route || 'ethereum']}
          items={items}
          onClick={(item) => {
            history.push(`/${item.key}`);
          }}
          style={{ minWidth: 0, flex: 'auto' }}
        />
      </Header>
      <Content
        style={{
          background: 'white',
          padding: '16px',
          minWidth: '320px',
          minHeight: '800px',
        }}
      >
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Multichain Test DApp ©2023 Created by OKFE
      </Footer>
    </Layout>
  );
};

export default Layouts;
