import classNames from 'classnames';
import * as React from 'react';
import { useLocale } from '../../locale';
import enUS from '../../locale/en_US';
type LabelObject = {
  text: string;
  align?: 'start' | 'center' | 'end';
};

type Label = LabelObject | React.ReactNode | (() => React.ReactNode);
export interface CreationProps {
  label?: Label;
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode | (() => React.ReactNode);
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const isLabelObject = (label: Label): label is LabelObject => {
  return typeof label === 'object' && label !== null && 'text' in label;
};

export function Creation(props: CreationProps, ref: React.Ref<HTMLButtonElement>) {
  const { className, icon, label, disabled, onClick, prefixCls } = props;
  const [contextLocale] = useLocale('Conversations', enUS.Conversations);

  let labelNode: React.ReactNode = contextLocale.create;
  let mergeAlign = 'start';

  if (isLabelObject(label)) {
    labelNode = label.text;
    mergeAlign = label?.align || mergeAlign;
  }
  if (typeof label === 'function') {
    labelNode = label();
  }
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
