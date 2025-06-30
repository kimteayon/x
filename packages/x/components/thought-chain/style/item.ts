import { unit } from '@ant-design/cssinjs/lib/util';
import type { ThoughtChainToken } from '.';
import type { GenerateStyle } from '../../theme/cssinjs-utils';

const genThoughtChainItemStyle: GenerateStyle<ThoughtChainToken> = (token) => {
  const { componentCls } = token;
  console.log(token.itemSolidBg, 'token');
  const itemCls = `${componentCls}-item`;
  return {
    [itemCls]: {
      display: 'inline-flex',
      gap: token.marginXS,
      color: token.colorText,
      [`&${itemCls}-solid`]: {
        background: token.itemSolidBg,
        borderRadius: token.borderRadius,
        paddingBlock: token.paddingXXS,
        paddingInline: token.paddingSM,
        lineHeight: token.lineHeight,
      },
      [`&${itemCls}-outlined`]: {
        borderRadius: token.borderRadius,
        paddingBlock: token.paddingXXS,
        paddingInline: token.paddingSM,
        lineHeight: token.lineHeight,
        border: `${unit(token.lineWidth)} ${token.lineType}, ${token.colorBorder}`,
      },
      [`& ${itemCls}-status`]: {
        color: token.colorText,
      },
      [`& ${itemCls}-status-loading`]: {
        color: token.colorText,
      },
    },
  };
};

export default genThoughtChainItemStyle;
