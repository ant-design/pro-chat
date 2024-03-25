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

export interface TitleProps {
  title: ChatItemProps['avatar']['title'];
  placement?: ChatItemProps['placement'];
  time?: ChatItemProps['time'];
  className?: string;
  prefixClass?: string;
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
        lineHeight: 1,
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
      gap={4}
    >
      {title}
      {time && <time className={cx(`${prefixClass}-time`, hashId)}>{formatTime(time)}</time>}
    </Flex>,
  );
};
