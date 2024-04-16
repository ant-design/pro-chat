import { formatTime } from '@/utils/formatTime';
import {
  ChatTokenType,
  GenerateStyle,
  resetComponent,
  useProChatStyleRegister,
} from '@/utils/useStyle';
import { Flex } from 'antd';
import cx from 'classnames';
import { ChatItemProps } from './ChatItem/type';

/**
 * Props for the ProChatTitle component.
 */
export interface TitleProps {
  /**
   * The title of the chat item's avatar.
   */
  title: ChatItemProps['avatar']['title'];

  /**
   * The placement of the chat item.
   */
  placement?: ChatItemProps['placement'];

  /**
   * The time of the chat item.
   */
  time?: ChatItemProps['time'];

  /**
   * Additional class name for the component.
   */
  className?: string;

  /**
   * Prefix class name for the component.
   */
  prefixClass?: string;

  /**
   * Inline style for the component.
   */
  style?: React.CSSProperties;
}

const genStyle: GenerateStyle<ChatTokenType> = (token) => {
  return {
    [token.componentCls]: {
      fontSize: 12,
      color: token.colorTextDescription,
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      '&-time': {
        visibility: 'hidden',
        color: token.colorTextSecondary,
        opacity: 0,
        lineHeight: 1,
        transition: 'all 0.3s ' + token.motionEaseInOut,
      },
      '&:hover': {
        [`${token.componentCls}-time`]: {
          visibility: 'visible',
        },
      },
    },
  };
};

/**
 * ProChat 的标题组件
 * @param prefixCls
 * @returns
 */
function useStyle(prefixCls?: string) {
  return useProChatStyleRegister('Title', (token) => {
    const proChatToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genStyle(proChatToken), resetComponent(proChatToken)];
  });
}

/**
 * prochat 的标题组件
 * @param param0
 * @returns
 */
export const ProChatTitle: React.FC<TitleProps> = ({
  style,
  prefixClass,
  className,
  placement,
  time,
  title,
}) => {
  const { wrapSSR, hashId } = useStyle(prefixClass);

  return wrapSSR(
    <Flex
      className={cx(hashId, prefixClass, className)}
      style={{
        flexDirection: placement === 'left' ? 'row' : 'row-reverse',
        ...style,
      }}
      gap={8}
    >
      {title}
      {time && <time className={cx(`${prefixClass}-time`, hashId)}>{formatTime(time)}</time>}
    </Flex>,
  );
};
