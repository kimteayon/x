import classnames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';
import React from 'react';
import ThoughtChainItem from './Item';

import useCollapsible, { Collapsible } from '../_util/hooks/use-collapsible';
import { useXProviderContext } from '../x-provider';
import useStyle from './style';

import useXComponentConfig from '../_util/hooks/use-x-component-config';

import type { ConfigProviderProps } from 'antd';
import ThoughtChainNode, { ThoughtChainNodeContext } from './Node';

export type SemanticType = 'item' | 'itemHeader' | 'itemContent' | 'itemFooter';
export interface ThoughtChainProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * @desc 思维节点集合
   * @descEN chain items
   */
  items?: any[];

  /**
   * @desc 是否可折叠
   * @descEN Whether collapsible
   */
  collapsible?: Collapsible;

  /**
   * @desc 语义化结构 style
   * @descEN Semantic structure styles
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;

  /**
   * @desc 语义化结构 className
   * @descEN Semantic structure class names
   */
  classNames?: Partial<Record<SemanticType, string>>;

  /**
   * @desc 自定义前缀
   * @descEN Prefix
   */
  prefixCls?: string;

  /**
   * @desc 自定义根类名
   * @descEN Custom class name
   */
  rootClassName?: string;
}

type CompoundedComponent = {
  Item: typeof ThoughtChainItem;
};

const ThoughtChain: React.FC<ThoughtChainProps> & CompoundedComponent = (props) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    items,
    collapsible,
    styles = {},
    style,
    classNames = {},
    ...restProps
  } = props;

  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true,
  });

  // ============================ Prefix ============================
  const { getPrefixCls, direction } = useXProviderContext();

  const prefixCls = getPrefixCls('thought-chain', customizePrefixCls);

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('thoughtChain');

  // ============================ Style ============================
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedCls = classnames(
    className,
    rootClassName,
    prefixCls,
    contextConfig.className,
    hashId,
    cssVarCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  // ============================ Render ============================
  return wrapCSSVar(
    <div {...domProps} className={mergedCls} style={{ ...contextConfig.style, ...style }}>
      <ThoughtChainNodeContext.Provider
        value={{
          prefixCls,
          direction,
          classNames: {
            itemHeader: classnames(contextConfig.classNames.itemHeader, classNames.itemHeader),
            itemContent: classnames(contextConfig.classNames.itemContent, classNames.itemContent),
            itemFooter: classnames(contextConfig.classNames.itemFooter, classNames.itemFooter),
          },
          styles: {
            itemHeader: { ...contextConfig.styles.itemHeader, ...styles.itemHeader },
            itemContent: { ...contextConfig.styles.itemContent, ...styles.itemContent },
            itemFooter: { ...contextConfig.styles.itemFooter, ...styles.itemFooter },
          },
        }}
      >
        {items?.map((item, index) => (
          <ThoughtChainNode
            key={item.key || `key_${index}`}
            className={classnames(contextConfig.classNames.item, classNames.item)}
            style={{ ...contextConfig.styles.item, ...styles.item }}
            info={{
              ...item,
              icon: item.icon || index + 1,
            }}
            nextStatus={items[index + 1]?.status || item.status}
          />
        ))}
      </ThoughtChainNodeContext.Provider>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ThoughtChain.displayName = 'ThoughtChain';
}
ThoughtChain.Item = ThoughtChainItem;
export type { ThoughtChainItem };

export default ThoughtChain;
