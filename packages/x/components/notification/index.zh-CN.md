---
category: Components
group:
  title: 确认
  order: 3
title: Notification
subtitle: 系统通知
description: 系统级别发送在页面外部显示的通知。
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*Oj-bTbVXtpQAAAAAAAAAAAAADgCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*qwdtSKWXeikAAAAAAAAAAAAADgCCAQ/original
demo:
  cols: 1
---

## 何时使用

- 在模型或智能体运行过程中，可推送系统级别通知，让用户随时掌握运行进展

## 代码演示

<code src="./demo/basic.tsx" background="grey">基本</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### ConversationsProps

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey | 当前选中的值 | string | - | - |
| defaultActiveKey | 默认选中值 | string | - | - |
| items | 会话列表数据源 | `Conversation`[] | - | - |
| onActiveChange | 选中变更回调 | (value: string) => void | - | - |
| menu | 会话操作菜单 | MenuProps \| ((value: `Conversation`) => MenuProps) | - | - |
| groupable | 是否支持分组, 开启后默认按 `Conversation.group` 字段分组 | boolean \| GroupableProps | - | - |
| styles | 语义化结构 style | Record<'item', React.CSSProperties> | - | - |
| classNames | 语义化结构 className | Record<'item', string> | - | - |

### Conversation

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 唯一标识 | string | - | - |
| label | 会话名称 | React.ReactNode | - | - |
| timestamp | 会话时间戳 | number | - | - |
| group | 会话分组类型，与 `ConversationsProps.groupable` 联动 | string | - | - |
| icon | 会话图标 | React.ReactNode | - | - |
| disabled | 是否禁用 | boolean | - | - |

### GroupableProps

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| `sort` | 分组排序函数 | (a: string, b: string) => number | - | - |
| `title` | 自定义渲染组件 | ((group: string, info: { components: { GroupTitle: React.ComponentType } }) => React.ReactNode) | - | - |

### MenuProps

继承 antd [MenuProps](https://ant.design/components/menu-cn#api) 属性。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| `trigger` | 自定义menu触发器 | React.ReactNode \| ((conversation: Conversation, info: { originNode: React.ReactNode }) => React.ReactNode) | - | - |

## 主题变量（Design Token）

<ComponentTokenTable component="Conversations"></ComponentTokenTable>
