import { unit } from '@ant-design/cssinjs/lib/util';
import type { ThoughtChainToken } from '.';
import type { GenerateStyle } from '../../theme/cssinjs-utils';

const genThoughtChainItemStyle: GenerateStyle<ThoughtChainToken> = (token) => {
  const { componentCls, calc } = token;
  const itemCls = `${componentCls}-item`;
  return {
    [itemCls]: {
      display: 'inline-flex',
      gap: token.marginXS,
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      fontSize: token.fontSize,
      color: token.colorText,
      paddingBlock: unit(calc(token.paddingXXS).add(1).equal()),
      paddingInline: token.paddingSM,
      boxSizing: 'border-box',
      lineHeight: token.lineHeight,
      borderRadius: token.borderRadius,
      [`&${itemCls}-solid`]: {
        background: token.itemSolidBg,
        [`&${itemCls}-click:hover`]: {
          background: token.itemSolidHoverBg,
          color: token.itemHoverTextColor,
          [`&${itemCls}-error:hover`]: {
            color: token.colorError,
            background: token.colorErrorBgFilledHover,
          },
        },
        [`&${itemCls}-error`]: {
          color: token.colorError,
          background: token.colorErrorBg,
        },
      },
      [`&${itemCls}-outlined`]: {
        paddingBlock: token.paddingXXS,
        backgroundColor: token.itemOutlinedBg,
        border: `${unit(token.lineWidth)} ${token.lineType}, ${token.colorBorder}`,

        [`&${itemCls}-click:hover`]: {
          color: token.itemHoverTextColor,
          background: token.itemOutlinedHoverBg,
          [`&${itemCls}-error:hover`]: {
            color: token.colorError,
            background: token.colorErrorBgFilledHover,
          },
        },
        [`&${itemCls}-error`]: {
          color: token.colorError,
          border: `${unit(token.lineWidth)} ${token.lineType}, ${token.colorErrorBorder}`,
          background: token.colorErrorBg,
        },
      },
      [`&${itemCls}-text`]: {
        [`&${itemCls}-click:hover`]: {
          color: token.itemHoverTextColor,
          background: token.itemSolidHoverBg,
          [`&${itemCls}-error:hover`]: {
            color: token.colorError,
            background: token.colorErrorBgFilledHover,
          },
        },
        [`&${itemCls}-error`]: {
          color: token.colorError,
        },
      },

      [`& ${itemCls}-status`]: {
        color: token.colorText,
      },
      [`& ${itemCls}-status-error`]: {
        color: token.colorError,
      },
      [`& ${itemCls}-status-loading`]: {
        color: token.colorText,
      },

      [`&${itemCls}-click`]: {
        cursor: 'pointer',
        '&-solid:hover': {
          background: token.itemSolidHoverBg,
        },
      },
      [`&${itemCls}-click`]: {
        cursor: 'pointer',
        transition: `all ${token.motionDurationMid}  ${token.motionEaseInOut}`,
      },
      [`& ${itemCls}-content`]: {},
      [`& ${itemCls}-title`]: {
        display: 'inline-block',
      },
      [`& ${itemCls}-description`]: {
        paddingInlineStart: token.paddingXS,
        color: token.colorTextDescription,
        display: 'inline-block',
      },
    },
  };
};

export default genThoughtChainItemStyle;
