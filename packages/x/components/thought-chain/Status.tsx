import { CheckOutlined, CloseOutlined, LoadingOutlined, MinusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import React from 'react';

export enum THOUGHT_CHAIN_ITEM_STATUS {
  /**
   * @desc 等待状态
   */
  LOADING = 'loading',
  /**
   * @desc 成功状态
   */
  SUCCESS = 'success',
  /**
   * @desc 错误状态
   */
  ERROR = 'error',
  /**
   * @desc 中止状态
   */
  ABORT = 'abort',
}

export interface StatusProps {
  /**
   * @desc 唯一标识符
   * @descEN Unique identifier
   */
  key?: string;

  /**
   * @desc 图标
   * @descEN Thought chain item icon
   */
  icon?: React.ReactNode;

  /**
   * @desc 状态
   * @descEN Thought chain item status
   */
  status?: `${THOUGHT_CHAIN_ITEM_STATUS}`;
  /**
   * @desc 自定义前缀
   * @descEN Prefix
   */
  prefixCls?: string;
}

const StatusIcon = {
  [THOUGHT_CHAIN_ITEM_STATUS.LOADING]: <LoadingOutlined />,
  [THOUGHT_CHAIN_ITEM_STATUS.ERROR]: <CloseOutlined />,
  [THOUGHT_CHAIN_ITEM_STATUS.SUCCESS]: <CheckOutlined />,
  [THOUGHT_CHAIN_ITEM_STATUS.ABORT]: <MinusOutlined />,
};

const Status: React.FC<StatusProps> = (props) => {
  const { prefixCls, icon, status = THOUGHT_CHAIN_ITEM_STATUS.SUCCESS } = props;

  // ============================ Style ============================
  const statusCls = `${prefixCls}-status`;

  const IconNode = icon ? icon : StatusIcon[status];

  // ============================ Render ============================
  return (
    <div
      className={classnames(statusCls, {
        [`${statusCls}-${status}`]: status,
      })}
    >
      {IconNode}
    </div>
  );
};

export default Status;
