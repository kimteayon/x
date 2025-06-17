import { RightOutlined } from '@ant-design/icons';
import type { ConfigProviderProps, GetProp } from 'antd';
import classnames from 'classnames';
import CSSMotion from 'rc-motion';
import type { CSSMotionProps } from 'rc-motion';
import React from 'react';
import { GroupType } from './hooks/useGroupable';

export interface GroupTitleProps {
  children?: React.ReactNode;
  enableGroup?: boolean;
}
interface GroupNodeContextType {
  prefixCls?: GetProp<ConfigProviderProps, 'prefixCls'>;
  enableCollapse: boolean;
  expandedKeys: string[];
  onItemExpand: ((curKey: string) => void) | undefined;
  collapseMotion: CSSMotionProps;

  groupInfo: Omit<GroupType, 'collapsible'> & { collapsible: boolean };
}
export const GroupNodeContext = React.createContext<GroupNodeContextType>(null!);

const GroupTitle: React.FC<GroupTitleProps> = ({ children }) => {
  const { prefixCls, groupInfo, enableCollapse, expandedKeys, onItemExpand, collapseMotion } =
    React.useContext(GroupNodeContext) || {};
  const { label, name, collapsible } = groupInfo || {};

  const labelNode =
    typeof label === 'function'
      ? label(name, {
          groupInfo,
        })
      : label || name;

  const mergeCollapsible = collapsible && enableCollapse;
  const expandFun = () => {
    if (mergeCollapsible) {
      onItemExpand?.(groupInfo.name);
    }
  };

  const groupOpen = mergeCollapsible && !!expandedKeys?.includes?.(name);

  const arrowRender = () => {
    return (
      <>
        <div
          className={classnames(
            `${prefixCls}-group-collapse-trigger `,
            `${prefixCls}-group-collapse-trigger-${groupOpen ? 'open' : 'close'}`,
          )}
        >
          <RightOutlined />
        </div>
      </>
    );
  };

  return (
    <>
      <li>
        <div
          className={classnames(`${prefixCls}-group-title`, {
            [`${prefixCls}-group-title-collapsible`]: mergeCollapsible,
          })}
          onClick={expandFun}
        >
          {labelNode && labelNode}
          {mergeCollapsible && arrowRender()}
        </div>
      </li>
      <CSSMotion {...collapseMotion} visible={mergeCollapsible ? groupOpen : true}>
        {({ className: motionClassName, style }, motionRef) => (
          <div className={classnames(motionClassName)} ref={motionRef} style={style}>
            {children}
          </div>
        )}
      </CSSMotion>
    </>
  );
};

export default GroupTitle;
