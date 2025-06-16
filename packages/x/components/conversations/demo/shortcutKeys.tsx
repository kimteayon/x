import {
  CodeOutlined,
  FileImageOutlined,
  FileSearchOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Conversations, ConversationsProps } from '@ant-design/x';
import { Card, GetProp, Tag } from 'antd';
import KeyCode from 'rc-util/lib/KeyCode';
import React from 'react';

const agentItems: GetProp<ConversationsProps, 'items'> = [
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

const historicalItems: GetProp<ConversationsProps, 'items'> = [
  {
    type: 'divider',
  },
  {
    key: `item1`,
    label: 'Conversation Item 1',
    group: 'Today',
  },
];

const items = [...agentItems, ...historicalItems];

const conversationsText = (
  <div style={{ marginBottom: 16 }}>
    You can switch sessions using the shortcut key: <Tag>Alt/⌥</Tag> + <Tag>number</Tag>, and create
    new chat using the shortcut key: <Tag>Win/⌘</Tag> + <Tag>K</Tag>.
  </div>
);

const App: React.FC = () => {
  return (
    <>
      {conversationsText}
      <Card>
        <Conversations
          creation={{
            onClick: () => {
              console.log('New Chat click');
            },
          }}
          style={{ width: 200 }}
          defaultActiveKey="write"
          shortcutKeys={{
            creation: ['Meta', KeyCode.K],
            items: ['Alt', 'number'],
          }}
          items={items}
        />
      </Card>
    </>
  );
};

export default App;
