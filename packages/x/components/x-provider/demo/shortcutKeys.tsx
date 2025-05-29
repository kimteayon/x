import { CodeOutlined, FileImageOutlined, SignatureOutlined } from '@ant-design/icons';
import {
    Conversations,
    XProvider,
} from '@ant-design/x';
import { Card, Flex } from 'antd';
import React from 'react';

export default () => {
    return (
        <>
            <Card>
                <XProvider conversations={{
                    shortcutKeys: {
                        items: [['Meta', 89]],
                    },
                }}>
                    <Flex style={{ height: 500 }} gap={12}>
                        <Conversations
                            style={{ width: 200 }}
                            defaultActiveKey="write"
                            items={[
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
                            ]}
                        />
                    </Flex>
                </XProvider>
            </Card>
        </>
    );
};
