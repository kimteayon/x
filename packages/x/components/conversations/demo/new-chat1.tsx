import {
  CodeOutlined,
  FileImageOutlined,
  FileSearchOutlined,
  PlusOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import type { ConversationsProps } from '@ant-design/x';
import type { GetProp } from 'antd';
import { theme } from 'antd';
import React from 'react';

const items: GetProp<ConversationsProps, 'items'> = [
  {
    key: 'write',
    label: 'Help Me Write,Conversations 1Conversations 1',
    icon: <SignatureOutlined />,
  },
  {
    key: 'coding',
    label: 'AI Coding,Conversations 1Conversations 1',
    icon: <CodeOutlined />,
  },
  {
    key: 'createImage',
    label: 'Create Image,Conversations 1Conversations 1',
    icon: <FileImageOutlined />,
  },
  {
    key: 'deepSearch',
    label: 'Deep Search',
    icon: <FileSearchOutlined />,
  },
  {
    key: 'historical',
    label: 'Conversations 1Conversations 1Conversations 1',
    group: 'Historical Conversations',
  },
  {
    key: 'deepSearch1',
    label: 'Deep Search',
    group: 'Today',
    icon: <FileSearchOutlined />,
  },
  {
    key: 'deepSearch12',
    label: 'Deep Search2',
    group: 'Today',
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

  const newConversationClick = () => {
    console.log('New conversation click');
  };

  return (
    <Conversations
      creation={{
        icon: <PlusOutlined />,
        label: '',
        align: 'center',
        onClick: newConversationClick,
      }}
      items={items}
      defaultActiveKey="item1"
      style={style}
      groupable={{
        label: (value) => {
          return <>{value}</>;
        },
        collapsible: (group) => {
          if (group === 'Today') {
            return false;
          }
          return {
            defaultExpandedKeys: ['Historical Conversations'],
          };
        },
      }}
    />
  );
};

export default App;
