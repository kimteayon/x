import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import classnames from 'classnames';
import CSSMotion from 'rc-motion';
import pickAttrs from 'rc-util/lib/pickAttrs';
import React from 'react';

import type { ConfigProviderProps, GetProp } from 'antd';
import type { CSSMotionProps } from 'rc-motion';
import type { ThoughtChainProps } from './';

export enum THOUGHT_CHAIN_ITEM_STATUS {
  /**
   * @desc 等待状态
   */
  PENDING = 'pending',
  /**
   * @desc 成功状态
   */
  SUCCESS = 'success',
  /**
   * @desc 错误状态
   */
  ERROR = 'error',
}

export interface ThoughtChainItem {
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
}

export const ThoughtChainNodeContext = React.createContext<{
  prefixCls?: string;
  collapseMotion?: CSSMotionProps;
  enableCollapse?: boolean;
  expandedKeys?: string[];
  direction?: GetProp<ConfigProviderProps, 'direction'>;
  styles?: ThoughtChainProps['styles'];
  classNames?: ThoughtChainProps['classNames'];
}>(null!);

interface ThoughtChainNodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  info?: ThoughtChainItem;
  nextStatus?: ThoughtChainItem['status'];
  onClick?: (key: string) => void;
}

const ThoughtChainNode: React.FC<ThoughtChainNodeProps> = (props) => {
  const { info = {}, nextStatus, onClick, ...restProps } = props;

  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true,
  });

  // ================= ThoughtChainNodeContext ====================
  const {
    prefixCls,
    collapseMotion,
    enableCollapse,
    expandedKeys,
    direction,
    classNames = {},
    styles = {},
  } = React.useContext(ThoughtChainNodeContext);

  // ============================ Info ============================
  const id = React.useId();

  const { key = id, icon, title, extra, content, footer, status, description } = info;

  // ============================ Style ============================
  const nodeCls = `${prefixCls}-node`;

  // ============================ Event ============================
  const onThoughtChainNodeClick = () => onClick?.(key);

  // ============================ Content Open ============================
  const contentOpen = expandedKeys?.includes(key);

  // ============================ Render ============================
  return (
    <div {...domProps} className={classnames(nodeCls, props.className)} style={props.style}>
      {/* Header */}
      <div
        className={classnames(`${nodeCls}-header`, classNames.itemHeader)}
        style={styles.itemHeader}
        onClick={onThoughtChainNodeClick}
      >
        {/* Header */}
        <div
          className={classnames(`${nodeCls}-header-box`, {
            [`${nodeCls}-collapsible`]: enableCollapse && content,
          })}
        >
          {/* Title */}
          <Typography.Text
            strong
            ellipsis={{
              tooltip: { placement: direction === 'rtl' ? 'topRight' : 'topLeft', title },
            }}
            className={`${nodeCls}-title`}
          >
            {enableCollapse &&
              content &&
              (direction === 'rtl' ? (
                <LeftOutlined
                  className={`${nodeCls}-collapse-icon`}
                  rotate={contentOpen ? -90 : 0}
                />
              ) : (
                <RightOutlined
                  className={`${nodeCls}-collapse-icon`}
                  rotate={contentOpen ? 90 : 0}
                />
              ))}
            {title}
          </Typography.Text>
          {/* Description */}
          {description && (
            <Typography.Text
              className={`${nodeCls}-desc`}
              ellipsis={{
                tooltip: {
                  placement: direction === 'rtl' ? 'topRight' : 'topLeft',
                  title: description,
                },
              }}
              type="secondary"
            >
              {description}
            </Typography.Text>
          )}
        </div>
        {/* Extra */}
        {extra && <div className={`${nodeCls}-extra`}>{extra}</div>}
      </div>
      {/* Content */}
      {content && (
        <CSSMotion {...collapseMotion} visible={enableCollapse ? contentOpen : true}>
          {({ className: motionClassName, style }, motionRef) => (
            <div
              className={classnames(`${nodeCls}-content`, motionClassName)}
              ref={motionRef}
              style={style}
            >
              <div
                className={classnames(`${nodeCls}-content-box`, classNames.itemContent)}
                style={styles.itemContent}
              >
                {content}
              </div>
            </div>
          )}
        </CSSMotion>
      )}
      {/* Footer */}
      {footer && (
        <div
          className={classnames(`${nodeCls}-footer`, classNames.itemFooter)}
          style={styles.itemFooter}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default ThoughtChainNode;
