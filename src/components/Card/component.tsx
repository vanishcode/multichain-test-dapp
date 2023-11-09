import { Card as Cards, Col } from 'antd';
import React from 'react';

const columnConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const cardStyle = {
  margin: '16px 0',
  minWidth: '320px',
};

export default function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Col {...columnConfig}>
      <Cards title={title} style={cardStyle}>
        {children}
      </Cards>
    </Col>
  );
}
