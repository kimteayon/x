import classnames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';
import React from 'react';
import { useXProviderContext } from '../x-provider';
import Status, { THOUGHT_CHAIN_ITEM_STATUS } from './Status';
import useStyle from './style';

enum VARIANT {
  SOLID = 'solid',
  OUTLINED = 'outlined',
  TEXT = 'text',
}
export interface ThoughtChainItemProp
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /**
   * @desc 思维节点唯一标识符
   * @descEN Unique identifier
   */
  key?: string;

  /**
   * @desc 思维节点图标
   * @descEN Thought chain item icon
   */
  icon?: React.ReactNode;

  /**
   * @desc 思维节点标题
   * @descEN Thought chain item title
   */
  title?: React.ReactNode;

  /**
   * @desc 思维节点描述
   * @descEN Thought chain item description
   */
  description?: React.ReactNode;

  /**
   * @desc 思维节点额外内容
   * @descEN Thought chain item extra content
   */
  extra?: React.ReactNode;

  /**
   * @desc 思维节点内容
   * @descEN Thought chain item content
   */
  content?: React.ReactNode;

  /**
   * @desc 思维节点脚注
   * @descEN Thought chain item footer
   */
  footer?: React.ReactNode;

  /**
   * @desc 思维节点状态
   * @descEN Thought chain item status
   */
  status?: `${THOUGHT_CHAIN_ITEM_STATUS}`;
  /**
   * @desc 自定义前缀
   * @descEN Prefix
   */
  prefixCls?: string;
  variant?: `${VARIANT}`;
}

const Item: React.FC<ThoughtChainItemProp> = (props) => {
  const {
    key,
    variant = 'solid',
    prefixCls: customizePrefixCls,
    title,
    icon,
    status,
    onClick,
    description,
    ...restProps
  } = props;

  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true,
  });

  // ============================ Info ============================
  const id = React.useId();

  // ============================ Prefix ============================
  const { getPrefixCls, direction } = useXProviderContext();

  const prefixCls = getPrefixCls('thought-chain', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  // ============================ Style ============================
  const itemCls = `${prefixCls}-item`;
  // ============================ Render ============================
  return wrapCSSVar(
    <div
      key={key || id}
      onClick={onClick}
      {...domProps}
      className={classnames(prefixCls, hashId, cssVarCls, itemCls, {
        [`${itemCls}-${variant}`]: variant,
        [`${itemCls}-click`]: onClick,
        [`${itemCls}-error`]: status === THOUGHT_CHAIN_ITEM_STATUS.ERROR,
      })}
    >
      <Status prefixCls={itemCls} icon={icon} status={status} />
      <div className={classnames(`${itemCls}-content`)}>
        {title && <div className={classnames(`${itemCls}-title`)}>{title}</div>}
        {description && <div className={classnames(`${itemCls}-description`)}>{description}</div>}
      </div>
    </div>,
  );
};

export default Item;
