import classNames from 'classnames';
import * as React from 'react';
import useCreation from '../hooks/useCreation';
export interface CreationProps {
  label?: React.ReactNode | (() => React.ReactNode);
  align?: 'start' | 'center' | 'end';
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode | (() => React.ReactNode);
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Creation(props: CreationProps, ref: React.Ref<HTMLButtonElement>) {
  const { className, icon, label, align, disabled, onClick, prefixCls } = props;

  const [iconNode, labelNode, mergeAlign] = useCreation({ label, icon, align });

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
      className={classNames(prefixCls, className, `${prefixCls}-${mergeAlign}`, {
        [`${prefixCls}-disabled`]: disabled,
      })}
    >
      <span>
        {iconNode}
        {labelNode}
      </span>
    </button>
  );
}

export default React.forwardRef(Creation);
