---
category: Components
group:
  title: Tools
  order: 5
title: useXChat
description: Work with agent hook for data management.
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*pJrtTaf-bWAAAAAAAAAAAAAADgCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*6ySvTqb7XhkAAAAAAAAAAAAADgCCAQ/original
demo:
  cols: 1
---

## When To Use

Use Agent to manage conversation data and produce data for page rendering.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/stream.tsx">Streaming</code>
<code src="./demo/suggestions.tsx">Multiple Suggestion</code>
<code src="./demo/model.tsx">Model Access</code>

## API

```tsx | pure
type useXChat<
  AgentMessage,
  ParsedMessage = AgentMessage,
  Input = RequestParams<AgentMessage>,
  Output = SSEOutput,
> = (config: XChatConfig<AgentMessage, ParsedMessage>) => XChatConfigReturnType;
```

### XChatConfig

<!-- prettier-ignore -->
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| agent | `agent` parameter is required when using the `onRequest` method in an agent generated by `useXAgent`. | XAgent | - | - |
| defaultMessages | default messages | { status, message }[] | - | - |
| parser | Convert AgentMessage to ParsedMessage for consumption. If not set, AgentMessage will be consumed directly. Supports converting one AgentMessage to multiple ParsedMessages | (message: AgentMessage) => BubbleMessage \| BubbleMessage[] | - | - |
| requestFallback | Fallback when request fails, not provided will not be displayed | AgentMessage \| () => AgentMessage | - | - |
| requestPlaceholder | Show the placeholder information when requesting, not provided will not be displayed | AgentMessage \| () => AgentMessage | - | - |
| transformMessage | The `messages` can be converted when updating data, and will also be updated to `messages` |  (info: {originMessage?: AgentMessage,chunk: Output,chunks: Output[],status: MessageStatus}) => AgentMessage|-|-| | transformStream | Optional transform function for processing stream data | `XStreamOptions<Output>['transformStream']` | - | - | - | resolveAbortController | `AbortController`,used to control the stream state | (abortController: AbortController) => void | - | - |

### XChatConfigReturnType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| messages | Current managed messages content | AgentMessages[] | - | - |
| parsedMessages | Parsed messages by `parser` api | ParsedMessages[] | - | - |
| onRequest | Create a message and trigger a request, If there is no data with `key` as` message`, the entire data will be processed as a message | (requestParams: AgentMessage \| RequestParams) => void | - | - |
| setMessages | Modify messages directly without triggering requests | (messages: { message, status }[]) => void | - | - |

### RequestParams

Extends [XRequestParams](/components/x-request#xrequestparams).

| Property | Description             | Type         | Default | Version |
| -------- | ----------------------- | ------------ | ------- | ------- |
| message  | Current message content | AgentMessage | -       | -       |
