import { mergeToken } from '@ant-design/cssinjs-utils';
import { FastColor } from '@ant-design/fast-color';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/cssinjs-utils';
import { genStyleHooks } from '../../theme/genStyleUtils';
import genThoughtChainItemStyle from './item';

export interface ComponentToken {
  /**
   * @desc 实心的 ThoughtChain.Item 背景色
   * @descEN ThoughtChain.Item `solid`'s background color
   */
  itemSolidBg: string;
  /**
   * @desc 实心的 ThoughtChain.Item 悬浮态背景色
   * @descEN ThoughtChain.Item `solid`'s hover background color
   */
  itemSolidHoverBg: string;
  /**
   * @desc 边框模式的 ThoughtChain.Item 背景色
   * @descEN ThoughtChain.Item `outlined`'s background color
   */
  itemOutlinedBg: string;
  /**
   * @desc 边框模式的 ThoughtChain.Item 悬浮态背景色
   * @descEN ThoughtChain.Item `outlined`'s hover background color
   */
  itemOutlinedHoverBg: string;

  /**
   * @desc ThoughtChain.Item 悬浮态文字颜色
   * @descEN ThoughtChain.Item `outlined`'s hover text color
   */
  itemHoverTextColor: string;
}

export interface ThoughtChainToken extends FullToken<'ThoughtChain'> {}

const genThoughtChainStyle: GenerateStyle<ThoughtChainToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      display: 'flex',
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'ThoughtChain'> = (token) => {
  const colorBgContainer = new FastColor(token.colorBgContainer);
  const itemOutlinedHoverBg = colorBgContainer.isLight()
    ? colorBgContainer.darken(5)
    : colorBgContainer.lighten(10);
  const itemHoverTextColor = new FastColor(token.colorText);

  return {
    itemSolidBg: token.colorFillTertiary,
    itemSolidHoverBg: token.colorFillSecondary,
    itemOutlinedBg: token.colorBgContainer,
    itemOutlinedHoverBg: itemOutlinedHoverBg.toRgbString(),
    itemHoverTextColor: itemHoverTextColor.toRgbString(),
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
