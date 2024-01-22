import BackBottom from '@/BackBottom';
import { createStyles } from 'antd-style';
import RcResizeObserver from 'rc-resize-observer';
import { CSSProperties, ReactNode, memo, useContext, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ConfigProvider } from 'antd';
import ChatList from '../components/ChatList';
import ChatInputArea from '../components/InputArea';
import ChatScrollAnchor from '../components/ScrollAnchor';
import { useOverrideStyles } from './OverrideStyle';
import { ProChatChatReference } from './StoreUpdater';
import { ProChatProps } from './index';

const useStyles = createStyles(
  ({ css, responsive, stylish }) => css`
    overflow: hidden scroll;
    height: 100%;
    ${responsive.mobile} {
      ${stylish.noScrollbar}
      width: 100%;
    }
  `,
);

interface ConversationProps extends ProChatProps<any> {
  chatInput?: ReactNode;
  showTitle?: boolean;
  style?: CSSProperties;
  className?: string;
  chatRef?: ProChatChatReference;
}

const App = memo<ConversationProps>(
  ({ chatInput, className, style, showTitle, chatRef, itemShouldUpdate, chatItemRenderConfig }) => {
    const ref = useRef<HTMLDivElement>(null);
    const areaHtml = useRef<HTMLDivElement>(null);
    const { styles, cx } = useStyles();
    const { styles: override } = useOverrideStyles();
    const [isRender, setIsRender] = useState(false);
    const [height, setHeight] = useState('100%' as string | number);
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    useEffect(() => {
      // 保证 ref 永远存在
      setIsRender(true);
      if (chatRef?.current) {
        chatRef.current.scrollToBottom = () => {
          (ref as any)?.current?.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: ref.current?.scrollHeight || 99999,
          });
        };
      }
    }, []);

    const prefixClass = getPrefixCls('pro-chat');
    return (
      <RcResizeObserver
        onResize={(e) => {
          if (e.height !== height) {
            setHeight(e.height);
          }
        }}
      >
        <Flexbox
          className={cx(override.container, className, `${prefixClass}-container`)}
          style={{
            maxHeight: '100vh',
            height: '100%',
            ...style,
          }}
        >
          <>
            <div
              ref={ref}
              className={cx(`${prefixClass}-chat-list-container`, styles)}
              style={{
                height: (height as number) - (areaHtml.current?.clientHeight || 120) || '100%',
              }}
            >
              <ChatList
                showTitle={showTitle}
                itemShouldUpdate={itemShouldUpdate}
                chatItemRenderConfig={chatItemRenderConfig}
              />
              <ChatScrollAnchor />
            </div>
            {isRender ? <BackBottom target={ref} text={'返回底部'} /> : null}
          </>
          <div ref={areaHtml}>{chatInput ?? <ChatInputArea />}</div>
        </Flexbox>
      </RcResizeObserver>
    );
  },
);

export default App;
