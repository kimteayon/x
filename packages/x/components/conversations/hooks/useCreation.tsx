import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useLocale } from '../../locale';
import enUS from '../../locale/en_US';
import type { CreationProps } from '../components/Creation';

interface BaseConfig {
  label: React.ReactNode;
  icon: React.ReactNode;
  align: CreationProps['align'];
}

const useCreation = ({
  icon,
  label,
  align,
}: Pick<CreationProps, 'label' | 'icon' | 'align'>): [
  React.ReactNode,
  React.ReactNode,
  CreationProps['align'],
] => {
  const [contextLocale] = useLocale('Conversations', enUS.Conversations);
  const creationConfig: BaseConfig = {
    label: <span>{contextLocale.create}</span>,
    icon: <PlusOutlined />,
    align: 'center',
  };
  if (label) {
    creationConfig.label = typeof label === 'function' ? label() : label;
  }
  if (icon) {
    creationConfig.icon = typeof icon === 'function' ? icon() : icon;
  }

  return [creationConfig.icon, creationConfig.label, align || creationConfig.align];
};

export default useCreation;
