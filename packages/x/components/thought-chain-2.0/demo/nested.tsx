import { ThoughtChain } from '@ant-design/x';
import type { ThoughtChainProps } from '@ant-design/x';
import React from 'react';

import { MoreOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

const items: ThoughtChainProps['items'] = [
  {
    title: '1 - Thought Chain Item',
    description: 'description',
    extra: <Button type="text" icon={<MoreOutlined />} />,
    footer: <Button>1 - Thought Chain Item Footer</Button>,
    content: (
      <ThoughtChain
        items={[
          {
            title: '1-1 Thought Chain Item',
            description: 'description',
            extra: <Button type="text" icon={<MoreOutlined />} />,
          },
          {
            title: '1-2 Thought Chain Item',
            description: 'description',
            extra: <Button type="text" icon={<MoreOutlined />} />,
          },
        ]}
      />
    ),
  },
  {
    title: '2 - Thought Chain Item',
    description: 'description',
    extra: <Button type="text" icon={<MoreOutlined />} />,
    footer: <Button>2 - Thought Chain Item Footer</Button>,
    content: (
      <ThoughtChain
        items={[
          {
            title: '2-1 Thought Chain Item',
            description: 'description',
            extra: <Button type="text" icon={<MoreOutlined />} />,
          },
          {
            title: '2-2 Thought Chain Item',
            description: 'description',
            extra: <Button type="text" icon={<MoreOutlined />} />,
          },
        ]}
      />
    ),
  },
];

export default () => (
  <Card style={{ width: 500 }}>
    <ThoughtChain items={items} collapsible />
  </Card>
);
