import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

export interface CreationProps extends ButtonProps {
  /**
   * @desc 会话名称
   * @descEN Conversation name
   */
  label?: React.ReactNode | (() => React.ReactNode);
}

export function Creation(props: CreationProps, ref: React.Ref<HTMLButtonElement>) {
  const { className, label, disabled, onClick, prefixCls, ...restProps } = props;
  const labelNode = typeof label === 'function' ? label() : label;
  return (
    <Button
      {...restProps}
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
      {labelNode}
    </Button>
  );
}

export default React.forwardRef(Creation);
