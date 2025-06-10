import {
  CodeOutlined,
  FileImageOutlined,
  FileSearchOutlined,
  PlusOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import type { ConversationsProps } from '@ant-design/x';
import { type GetProp, theme } from 'antd';
import React from 'react';

const items: GetProp<ConversationsProps, 'items'> = [
  {
    key: 'write',
    label: 'Help Me Write',
    icon: <SignatureOutlined />,
  },
  {
    key: 'coding',
    label: 'AI Coding',
    icon: <CodeOutlined />,
  },
  {
    key: 'createImage',
    label: 'Create Image',
    icon: <FileImageOutlined />,
  },
  {
    key: 'deepSearch',
    label: 'Deep Search',
    icon: <FileSearchOutlined />,
  },
];

const App: React.FC = () => {
  const { token } = theme.useToken();

  // Customize the style of the container
  const style = {
    width: 256,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };

  return (
    <Conversations
      creation={{
        icon: <PlusOutlined />,
        label: '新对话',
        onClick: () => {},
      }}
      items={items}
      defaultActiveKey="item1"
      style={style}
    />
  );
};

export default App;
