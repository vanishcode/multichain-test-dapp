import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Alert, Form, notification, Space } from 'antd';
import { useEffect, useState } from 'react';
import Card from '../Card';

const spaceStyle = {
  width: '100%',
  paddingTop: '16px',
};

export default function Item({
  name = '',
  value = {},
  onClick = (): any => {},
}: {
  name: string;
  value?: Record<string, any>;
  onClick?: (
    values: Record<string, any>,
  ) => Promise<string | Record<string, any>>;
}) {
  type ObjKeys = keyof typeof value;
  type ObjType = {
    [key in ObjKeys]: any;
  };
  const columns: ProFormColumnsType<ObjType>[] = Object.entries(value).map(
    ([key, value]) => {
      return {
        title: key,
        key,
        dataIndex: key,
        initialValue: value,
      };
    },
  );

  const [form] = Form.useForm();
  const [result, setResult] = useState<any>('');

  const onFinish = async (values: Record<string, any>) => {
    try {
      const defaultText = 'no returns value, but ok';
      console.info('values', values);
      const signature = await onClick(values);
      console.info('signature', signature);
      let resultText;
      try {
        resultText = JSON.stringify(signature);
      } catch (error) {
        resultText = signature || defaultText;
      }
      setResult(resultText || 'no returns value, but ok');
    } catch (error: Error | string | any) {
      console.error(error.message || error);
      notification.error({
        message: error.message || error,
      });
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [columns]);

  return (
    <Card title={name}>
      <BetaSchemaForm
        layoutType="Form"
        onReset={() => setResult('')}
        onFinish={onFinish}
        columns={columns}
        form={form}
      />

      {result && (
        <Space direction="vertical" style={spaceStyle}>
          <Alert message={result} type="info" />
        </Space>
      )}
    </Card>
  );
}
