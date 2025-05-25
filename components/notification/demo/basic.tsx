import { notification } from '@ant-design/x';
import { Button, Flex } from 'antd';
import React from 'react';

const App = () => {
  const info = () => {
    notification.requestPermission();
  };
  const [{ permission }] = notification.useNotification();

  const open = () => {
    notification.open({
      title: '你好',
      body: '11',
      key: 'key_123',
      icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original',
      duration: 2,
      onClick: (event, close) => {
        console.log('onClick', event, close);
        close?.();
      },
      onClose: (event) => {
        console.log('onClose', event);
      },
      onError: (event) => {
        console.log('onError', event);
      },
      onShow: (event) => {
        console.log('onShow', event);
      },
    });
  };
  return (
    <Flex gap="middle">
      <Button type="primary" onClick={info}>
        Request Permission ({permission})
      </Button>
      <Button type="primary" onClick={open}>
        Open a notification
      </Button>
    </Flex>
  );
};

export default App;
