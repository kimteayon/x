import React from 'react';

import { AttachmentsProps } from '../attachments';
import type { AnyObject, ShortcutKeys } from '../_util/type';
import type { BubbleProps } from '../bubble';
import type { ConversationsProps } from '../conversations';
import type { PromptsProps } from '../prompts';
import type { SenderProps } from '../sender';
import type { SuggestionProps } from '../suggestion';
import type { ThoughtChainProps } from '../thought-chain';
import type { WelcomeProps } from '../welcome';

export interface XComponentConfig {
  classNames: Record<string, string>;
  styles: Record<string, React.CSSProperties>;
  className: string;
  style: React.CSSProperties;
  shortcutKeys: Record<string,ShortcutKeys>,
}

type DefaultPickType = keyof XComponentConfig;

type ComponentConfig<
  CompProps extends AnyObject,
  PickType extends keyof CompProps = DefaultPickType,
> = Pick<CompProps, PickType | DefaultPickType>;

export interface XComponentsConfig {
  bubble?: ComponentConfig<BubbleProps>;
  conversations?: ComponentConfig<ConversationsProps>;
  prompts?: ComponentConfig<PromptsProps>;
  sender?: ComponentConfig<SenderProps>;
  suggestion?: ComponentConfig<SuggestionProps>;
  thoughtChain?: ComponentConfig<ThoughtChainProps>;
  attachments?: ComponentConfig<AttachmentsProps>;
  welcome?: ComponentConfig<WelcomeProps>;
}

export interface XProviderProps extends XComponentsConfig {
  // Non-component config props

}

const XProviderContext = React.createContext<XProviderProps>({});

export default XProviderContext;
