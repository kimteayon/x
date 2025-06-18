import classnames from 'classnames';
import React from 'react';

import GroupNode, { GroupNodeContext } from './GroupNode';
import ConversationsItem, { type ConversationsItemProps } from './Item';

import useMergedState from 'rc-util/lib/hooks/useMergedState';
import useXComponentConfig from '../_util/hooks/use-x-component-config';
import { useXProviderContext } from '../x-provider';
import useGroupable from './hooks/useGroupable';

import useStyle from './style';

import pickAttrs from 'rc-util/lib/pickAttrs';
import type { ConversationItemType, DividerItemType, Groupable, ItemType } from './interface';

import useShortcutKeys, { ActionShortcutInfo } from '../_util/hooks/use-shortcut-keys';
import type { ShortcutKeys } from '../_util/type';

import { Divider } from 'antd';
import useCollapsible from '../_util/hooks/use-collapsible';
import Creation from './components/Creation';
import type { CreationProps } from './components/Creation';

/**
 * @desc 会话列表组件参数
 * @descEN Props for the conversation list component
 */
export interface ConversationsProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * @desc 会话列表数据源
   * @descEN Data source for the conversation list
   */
  items?: ItemType[];

  /**
   * @desc 当前选中的值
   * @descEN Currently selected value
   */
  activeKey?: string;

  /**
   * @desc 默认选中值
   * @descEN Default selected value
   */
  defaultActiveKey?: ConversationItemType['key'];

  /**
   * @desc 选中变更回调
   * @descEN Callback for selection change
   */
  onActiveChange?: (value: string) => void;

  /**
   * @desc 会话操作菜单
   * @descEN Operation menu for conversations
   */
  menu?:
    | ConversationsItemProps['menu']
    | ((value: ConversationItemType) => ConversationsItemProps['menu']);

  /**
   * @desc 是否支持分组, 开启后默认按 {@link Conversation.group} 字段分组
   * @descEN If grouping is supported, it defaults to the {@link Conversation.group} field
   */
  groupable?: boolean | Groupable;

  /**
   * @desc 语义化结构 style
   * @descEN Semantic structure styles
   */
  styles?: Partial<Record<'item', React.CSSProperties>>;

  /**
   * @desc 语义化结构 className
   * @descEN Semantic structure class names
   */
  classNames?: Partial<Record<'item', string>>;

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
  /**
   * @desc 自定义快捷键
   * @descEN Custom Shortcut Keys
   */
  shortcutKeys?: {
    creation?: ShortcutKeys<number>;
    items?: ShortcutKeys<'number'> | ShortcutKeys<number>[];
  };
  /**
   * @desc 是否展示新建对话按钮
   * @descEN  Display of the new conversation button
   */
  creation?: CreationProps;
}

type CompoundedComponent = {
  Creation: typeof Creation;
};

const Conversations: React.FC<ConversationsProps> & CompoundedComponent = (props) => {
  const {
    prefixCls: customizePrefixCls,
    shortcutKeys: customizeShortcutKeys,
    rootClassName,
    items,
    activeKey,
    defaultActiveKey,
    onActiveChange,
    menu,
    styles = {},
    classNames = {},
    groupable,
    className,
    style,
    creation,
    ...restProps
  } = props;

  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true,
  });

  // ============================ ActiveKey ============================

  const [mergedActiveKey, setMergedActiveKey] = useMergedState<ConversationsProps['activeKey']>(
    defaultActiveKey,
    {
      value: activeKey,
      onChange: (key) => {
        if (key) {
          onActiveChange?.(key);
        }
      },
    },
  );

  // ============================ Groupable ============================
  const [groupList, collapsibleOptions, keyList] = useGroupable(groupable, items);

  // ============================ Prefix ============================
  const { getPrefixCls, direction } = useXProviderContext();

  const prefixCls = getPrefixCls('conversations', customizePrefixCls);

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('conversations');

  // ============================ Style ============================
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedCls = classnames(
    prefixCls,
    contextConfig.className,
    className,
    rootClassName,
    hashId,
    cssVarCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  // ============================ Events ============================
  const onConversationItemClick: ConversationsItemProps['onClick'] = (key) => {
    setMergedActiveKey(key);
  };

  // ============================ Short Key =========================
  const [_, subscribe] = useShortcutKeys('conversations', customizeShortcutKeys);

  const shortKeyAction = (actionShortcutInfo: ActionShortcutInfo) => {
    switch (actionShortcutInfo?.name) {
      case 'items':
        {
          const index = actionShortcutInfo?.actionKeyCodeNumber ?? actionShortcutInfo?.index;
          const itemKey = typeof index === 'number' ? keyList?.[index] : mergedActiveKey;
          itemKey && setMergedActiveKey(itemKey);
        }
        break;
      case 'creation':
        {
          if (typeof creation?.onClick === 'function') {
            creation.onClick();
          }
        }
        break;
    }
  };

  subscribe(shortKeyAction);

  // ============================ Item Node ============================
  const getItemNode = (itemData: ItemType[]) =>
    itemData.map((conversationInfo: ItemType, conversationIndex: number) => {
      if (conversationInfo.type === 'divider') {
        return (
          <Divider
            key={`key-divider-${conversationIndex}`}
            className={`${prefixCls}-divider`}
            dashed={conversationInfo.dashed}
          />
        );
      }
      const baseConversationInfo = conversationInfo as ConversationItemType;
      const { label: _, disabled: __, icon: ___, ...restInfo } = baseConversationInfo;
      return (
        <ConversationsItem
          {...restInfo}
          key={baseConversationInfo.key || `key-${conversationIndex}`}
          info={baseConversationInfo}
          prefixCls={prefixCls}
          direction={direction}
          className={classnames(
            classNames.item,
            contextConfig.classNames.item,
            baseConversationInfo.className,
          )}
          style={{
            ...contextConfig.styles.item,
            ...styles.item,
            ...baseConversationInfo.style,
          }}
          menu={typeof menu === 'function' ? menu(baseConversationInfo) : menu}
          active={mergedActiveKey === baseConversationInfo.key}
          onClick={onConversationItemClick}
        />
      );
    });

  //  ============================ Item Collapsible ============================

  const [enableCollapse, expandedKeys, onItemExpand, collapseMotion] = useCollapsible(
    collapsibleOptions,
    prefixCls,
  );

  // ============================ Render ============================
  return wrapCSSVar(
    <ul
      {...domProps}
      style={{
        ...contextConfig.style,
        ...style,
      }}
      className={mergedCls}
    >
      {!!creation && <Creation prefixCls={`${prefixCls}-creation`} {...creation} />}
      {groupList.map((groupInfo, groupIndex) => {
        const itemNode = getItemNode(groupInfo.data);
        return groupInfo.enableGroup ? (
          <GroupNodeContext.Provider
            key={groupInfo.name || `key-${groupIndex}`}
            value={{
              prefixCls,
              groupInfo,
              enableCollapse,
              expandedKeys,
              onItemExpand,
              collapseMotion,
            }}
          >
            <GroupNode>
              <ul
                className={classnames(`${prefixCls}-list`, {
                  [`${prefixCls}-group-collapsible-list`]: groupInfo.collapsible,
                })}
              >
                {itemNode}
              </ul>
            </GroupNode>
          </GroupNodeContext.Provider>
        ) : (
          itemNode
        );
      })}
    </ul>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Conversations.displayName = 'Conversations';
}

export type { ItemType, ConversationItemType, DividerItemType };
Conversations.Creation = Creation;
export default Conversations;
