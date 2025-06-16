import React, { useMemo } from 'react';
import type { ConversationsProps } from '..';
import { CollapsibleOptions } from '../../_util/hooks/use-collapsible';
import type { Collapsible, Conversation, GroupSorter, Groupable } from '../interface';

interface GroupConfig {
  sort: GroupSorter | undefined;
  label: Groupable['label'];
  collapsibleOptionsHandle: Collapsible;
}
export interface GroupType {
  data: Conversation[];
  name: string;
  label: Groupable['label'];
  enableGroup: boolean;
  collapsibleOptions: false | CollapsibleOptions;
}
type GroupList = GroupType[];

const useGroupable = (
  groupable?: ConversationsProps['groupable'],
  items: Conversation[] = [],
): [groupList: GroupList] => {
  const [sort, label, collapsibleOptionsHandle] = useMemo<
    [GroupConfig['sort'], GroupConfig['label'], GroupConfig['collapsibleOptions']]
  >(() => {
    let baseConfig: GroupConfig = {
      sort: undefined,
      label: '',
      collapsibleOptionsHandle: false,
    };
    if (!groupable) {
      return [undefined, '', baseConfig.collapsibleOptionsHandle];
    }

    if (typeof groupable === 'object') {
      const { collapsible, ...other } = groupable;
      baseConfig = {
        ...baseConfig,
        ...other,
        collapsibleOptionsHandle: collapsible!,
      };
    }

    return [baseConfig.sort, baseConfig.label, baseConfig.collapsibleOptionsHandle];
  }, [groupable]);

  return React.useMemo(() => {
    const groupList = items.reduce<GroupList>((currentGroupList, item) => {
      if (!item.group) {
        currentGroupList.push({
          data: [item],
          name: '',
          label: '',
          enableGroup: false,
          collapsibleOptions: false,
        });
        return currentGroupList;
      }

      const isSome = currentGroupList.some((group, index) => {
        if (group.name === item.group) {
          currentGroupList[index].data.push(item);
          currentGroupList[index].data = sort
            ? currentGroupList[index].data.sort(sort)
            : currentGroupList[index].data;
          return true;
        }
        return false;
      });
      const collapsibleOptions =
        typeof collapsibleOptionsHandle === 'function'
          ? collapsibleOptionsHandle?.(item.group)
          : collapsibleOptionsHandle;

      if (!isSome) {
        currentGroupList.push({
          data: [item],
          enableGroup: true,
          name: item.group,
          label,
          collapsibleOptions,
        });
      }
      return currentGroupList;
    }, []);
    return [groupList];
  }, [items]);
};

export default useGroupable;
