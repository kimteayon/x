import { notification } from '@ant-design/x';
import { Button, Flex } from 'antd';
import React from 'react';

const describeInfo: Record<NotificationPermission, string> = {
  denied:
    'Notification permission has been denied, You need to manually reset the notification permissions in the website settings to trigger the permission request pop-up.',
  granted:
    'Notification permission has been granted, you can click the "Open a notification" button to push a  notification.',
  default: 'Please Request Permission,After the request is approved, you can push notifications.',
};
const App = () => {
  const [{ permission }, { open, requestPermission, close }] = notification.useNotification();
  const info = () => {
    requestPermission();
  };

  const openClick = () => {
    open({
      title: '任务已完成',
      body: '已于13:12完成路线规划任务',
      // key: 'key_123',
      icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original',
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
    <Flex vertical gap="middle">
      {describeInfo[permission]}
      <Flex gap="middle">
        <Button disabled={permission !== 'default'} type="primary" onClick={info}>
          {permission === 'default'
            ? 'Please Request Permission'
            : `Notification permission has been ${permission}`}
        </Button>
        <Button disabled={permission !== 'granted'} type="primary" onClick={openClick}>
          Open a notification
        </Button>
        <Button
          disabled={permission !== 'granted'}
          onClick={() => {
            close();
          }}
        >
          Destroy All
        </Button>
      </Flex>
    </Flex>
  );
};

export default App;
