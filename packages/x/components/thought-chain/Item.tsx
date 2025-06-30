import classnames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';
import React from 'react';
import { useXProviderContext } from '../x-provider';
import Status, { THOUGHT_CHAIN_ITEM_STATUS } from './Status';

enum VARIANT {
  SOLID = 'solid',
  OUTLINED = 'outlined',
  TEXT = 'text',
}
export interface ThoughtChainItemProp {
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
  onClick?: (key: string) => void;
}

const Item: React.FC<ThoughtChainItemProp> = (props) => {
  const {
    key,
    variant = 'solid',
    prefixCls: customizePrefixCls,
    title,
    status,
    onClick,
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

  // ============================ Style ============================
  const itemCls = `${prefixCls}-item`;

  // ============================ Render ============================
  return (
    <div
      key={key || id}
      {...domProps}
      className={classnames(itemCls, {
        [`${itemCls}-${variant}`]: variant,
      })}
    >
      <Status prefixCls={itemCls} status={status} />
      {title}
    </div>
  );
};

export default Item;
