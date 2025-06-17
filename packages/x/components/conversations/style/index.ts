import { unit } from '@ant-design/cssinjs';
import { mergeToken } from '@ant-design/cssinjs-utils';
import { FastColor } from '@ant-design/fast-color';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/cssinjs-utils';
import { genStyleHooks } from '../../theme/genStyleUtils';

export interface ComponentToken {
  /**
   * @desc 新会话按钮背景颜色
   * @descEN New conversation button background color
   */
  creationBgColor: string;
  creationBorderColor: string;
  creationHoverColor: string;
}
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
        backgroundColor: token.creationBgColor,
        color: token.colorPrimary,
        border: `${unit(token.lineWidth)} ${token.lineType}, ${token.creationBorderColor}`,
        fontWeight: 500,
        paddingBlock: token.paddingXS,
        paddingInline: token.paddingSM,
        fontSize: token.fontSize,
        cursor: 'pointer',
        display: 'flex',
        marginBlockEnd: token.marginSM,
        lineHeight: token.lineHeight,
        borderRadius: token.borderRadiusLG,
        transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
        '&:hover': {
          color: token.colorPrimary,
          background: token.creationHoverColor,
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
      [`& ${componentCls}-rtl`]: {
        direction: 'rtl',
      },
      [`& ${componentCls}-divider`]: {
        marginBlock: token.marginXXS,
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
          [`& ${componentCls}-label, ${componentCls}-icon, ${componentCls}-menu-icon`]: {
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
      [`& ${componentCls}-list`]: {
        display: 'flex',
        gap: token.paddingXXS,
        flexDirection: 'column',
      },
      [`& ${componentCls}-group-collapsible-list`]: {
        [`& ${componentCls}-item`]: {
          paddingInlineStart: token.paddingXL,
        },
      },
      [`& ${componentCls}-group-title`]: {
        display: 'flex',
        alignItems: 'center',
        color: token.colorTextDescription,
        height: token.controlHeightLG,
        minHeight: token.controlHeightLG,
        padding: `0 ${unit(token.paddingXS)}`,
      },

      [`& ${componentCls}-group-title-collapsible`]: {
        justifyContent: 'space-between',
        cursor: 'pointer',
        color: token.colorText,
        borderRadius: token.borderRadiusLG,
        transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
        '&:hover': {
          backgroundColor: token.colorBgTextHover,
        },
      },
      [`& ${componentCls}-group-collapse-trigger`]: {
        transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
        transform: 'rotate(0deg)',
        transformOrigin: 'center center',
      },
      [`& ${componentCls}-group-collapse-trigger-open`]: {
        transform: 'rotate(90deg)',
      },
      [`& ${componentCls}-group-collapse-trigger-close`]: {
        transform: 'rotate(0deg)',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Conversations'> = (token) => {
  const creationBgColor = new FastColor(token.colorPrimary).setA(0.15);
  const creationBorderColor = new FastColor(token.colorPrimary).setA(0.22);
  const creationHoverColor = new FastColor(token.colorPrimary).setA(0.25);
  return {
    creationBgColor: creationBgColor.toRgbString(),
    creationBorderColor: creationBorderColor.toRgbString(),
    creationHoverColor: creationHoverColor.toRgbString(),
  };
};

export default genStyleHooks(
  'Conversations',
  (token) => {
    const compToken = mergeToken<ConversationsToken>(token, {});
    return genConversationsStyle(compToken);
  },
  prepareComponentToken,
);
