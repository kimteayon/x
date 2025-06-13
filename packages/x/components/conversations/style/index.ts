import { unit } from '@ant-design/cssinjs';
import { mergeToken } from '@ant-design/cssinjs-utils';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/cssinjs-utils';
import { genStyleHooks } from '../../theme/genStyleUtils';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

export interface ConversationsToken extends FullToken<'Conversations'> {}

const genConversationsStyle: GenerateStyle<ConversationsToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      gap: token.paddingXXS,
      overflowY: 'auto',
      padding: token.paddingSM,
      margin: 0,
      listStyle: 'none',
      'ul, ol': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
      [`${componentCls}-creation`]: {
        backgroundColor: token.colorPrimaryBg,
        color: token.colorPrimary,
        border: `${unit(token.lineWidth)} ${token.lineType}, ${token.colorPrimaryBorder}`,
        fontWeight: 500,
        paddingBlock: token.paddingXS,
        paddingInline: token.paddingSM,
        fontSize: token.fontSize,
        cursor: 'pointer',
        display: 'flex',
        lineHeight: token.lineHeight,
        borderRadius: token.borderRadiusLG,
        transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
        '&:hover': {
          color: token.colorPrimaryActive,
          background: token.colorPrimaryBgHover,
        },
        '> span': {
          gap: token.marginXS,
          display: 'flex',
        },
        [`&${componentCls}-creation-start`]: {
          justifyContent: 'flex-start',
        },
        [`&${componentCls}-creation-center`]: {
          justifyContent: 'center',
        },
        [`&${componentCls}-creation-end`]: {
          justifyContent: 'flex-end',
        },
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
      [`& ${componentCls}-list`]: {
        display: 'flex',
        gap: token.paddingXXS,
        flexDirection: 'column',

        [`& ${componentCls}-item`]: {
          paddingInlineStart: token.paddingXL,
        },
        [`& ${componentCls}-label`]: {
          color: token.colorTextDescription,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      [`& ${componentCls}-item`]: {
        display: 'flex',
        height: token.controlHeightLG,
        minHeight: token.controlHeightLG,
        gap: token.paddingXS,
        padding: `0 ${unit(token.paddingXS)}`,
        alignItems: 'center',
        borderRadius: token.borderRadiusLG,
        cursor: 'pointer',
        transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
        '&:hover': {
          backgroundColor: token.colorBgTextHover,
        },
        '&-active': {
          backgroundColor: token.colorBgTextHover,
          [`& ${componentCls}-label, ${componentCls}-menu-icon`]: {
            color: token.colorText,
          },
        },
        '&-disabled': {
          cursor: 'not-allowed',
          [`& ${componentCls}-label`]: {
            color: token.colorTextDisabled,
          },
        },
        '&:hover, &-active': {
          [`& ${componentCls}-menu-icon`]: {
            opacity: 0.6,
          },
        },

        [`${componentCls}-menu-icon:hover`]: {
          opacity: 1,
        },
      },
      [`& ${componentCls}-label`]: {
        flex: 1,
        color: token.colorText,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      [`& ${componentCls}-menu-icon`]: {
        opacity: 0,
        fontSize: token.fontSizeXL,
      },
      [`& ${componentCls}-group-title`]: {
        display: 'flex',
        alignItems: 'center',
        height: token.controlHeightLG,
        minHeight: token.controlHeightLG,
        padding: `0 ${unit(token.paddingXS)}`,
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Conversations'> = () => ({});

export default genStyleHooks(
  'Conversations',
  (token) => {
    const compToken = mergeToken<ConversationsToken>(token, {});
    return genConversationsStyle(compToken);
  },
  prepareComponentToken,
);
