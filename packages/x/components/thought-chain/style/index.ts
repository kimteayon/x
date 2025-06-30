import { mergeToken } from '@ant-design/cssinjs-utils';
import { FastColor } from '@ant-design/fast-color';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/cssinjs-utils';
import { genStyleHooks } from '../../theme/genStyleUtils';
import genThoughtChainItemStyle from './item';

export interface ComponentToken {
  /**
   * @desc ThoughtChain.Item `solid` 背景颜色
   * @descEN ThoughtChain.Item `solid`'s background color
   */
  itemSolidBg: string;
}

export interface ThoughtChainToken extends FullToken<'ThoughtChain'> {}

const genThoughtChainStyle: GenerateStyle<ThoughtChainToken> = (token) => {
  const { componentCls } = token;
  console.log(token.itemSolidBg, 1113);
  return {
    [componentCls]: {
      display: 'flex',
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'ThoughtChain'> = (token) => {
  return {
    itemSolidBg: token.colorFillTertiary,
  };
};

export default genStyleHooks<'ThoughtChain'>(
  'ThoughtChain',
  (token) => {
    const compToken = mergeToken<ThoughtChainToken>(token, {});
    return [genThoughtChainStyle(compToken), genThoughtChainItemStyle(compToken)];
  },
  prepareComponentToken,
);
