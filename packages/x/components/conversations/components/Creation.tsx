import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

export interface CreationProps {
  /**
   * @desc 会话名称
   * @descEN Conversation name
   */
  label?: React.ReactNode | (() => React.ReactNode);
  icon?: React.ReactNode | (() => React.ReactNode);
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  prefixCls?: string;
  className?: string;
}

export function Creation(props: CreationProps, ref: React.Ref<HTMLButtonElement>) {
  const { label, disabled, onClick, className, prefixCls, icon } = props;
  const labelNode = typeof label === 'function' ? label() : label;
  const iconNode = typeof icon === 'function' ? icon() : icon;
  return (
    <button
      type="button"
      ref={ref}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick?.(e);
      }}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
      })}
    >
      <span>{iconNode}</span>
      <span>{labelNode}</span>
    </button>
  );
}

export default React.forwardRef(Creation);
