import { RightOutlined } from '@ant-design/icons';
import type { ConfigProviderProps, GetProp } from 'antd';
import classnames from 'classnames';
import CSSMotion from 'rc-motion';
import React from 'react';
import useCollapsible, { CollapsibleOptions } from '../_util/hooks/use-collapsible';
import { GroupType } from './hooks/useGroupable';

export interface GroupTitleProps {
  children?: React.ReactNode;
  enableGroup?: boolean;
}

export const GroupNodeContext = React.createContext<{
  prefixCls?: GetProp<ConfigProviderProps, 'prefixCls'>;
  groupInfo: Omit<GroupType, 'collapsible'> & { collapsibleOptions: CollapsibleOptions };
}>(null!);

const GroupTitle: React.FC<GroupTitleProps> = ({ children }) => {
  const { prefixCls, groupInfo } = React.useContext(GroupNodeContext) || {};
  const { label, name } = groupInfo || {};

  const labelNode =
    typeof label === 'function'
      ? label(name, {
          data: groupInfo,
        })
      : label || name;

  const [enableCollapse, expandedKeys, onItemExpand, collapseMotion] = useCollapsible(
    groupInfo?.collapsibleOptions,
    prefixCls,
  );

  const groupOpen = !!expandedKeys.includes(name);
  const arrowRender = () => {
    return (
      <>
        <div
          className={classnames(
            `${prefixCls}-group-collapse-trigger `,
            `${prefixCls}-group-collapse-trigger-${groupOpen ? 'open' : 'close'}`,
          )}
          onClick={() => onItemExpand?.(groupInfo.name)}
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
            [`${prefixCls}-group-title-collapsible`]: enableCollapse,
          })}
        >
          {labelNode && labelNode}
          {enableCollapse && arrowRender()}
        </div>
      </li>
      <CSSMotion {...collapseMotion} visible={enableCollapse ? groupOpen : true}>
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
