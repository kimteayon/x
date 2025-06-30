import { ThoughtChain } from '@ant-design/x';
import type { ThoughtChainProps } from '@ant-design/x';
import React from 'react';

import { MoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const items: ThoughtChainProps['items'] = [
  {
    title: 'Thought Chain Item Title',
    description: 'description',
    extra: <Button type="text" icon={<MoreOutlined />} />,
  },
  {
    title: 'Thought Chain Item Title',
    description: 'description',
    extra: <Button type="text" icon={<MoreOutlined />} />,
  },
  {
    title: 'Thought Chain Item Title',
    description: 'description',
    extra: <Button type="text" icon={<MoreOutlined />} />,
  },

  {
    title: 'Thought Chain Item Title',
    description: 'description',
    extra: <Button type="text" icon={<MoreOutlined />} />,
  },
];

export default () => (
  <>
    <ThoughtChain.Item variant="solid" status="loading" title={<div>工具调用中</div>} />
    <ThoughtChain.Item variant="outlined" status="loading" title={<div>工具调用中</div>} />
  </>
);
