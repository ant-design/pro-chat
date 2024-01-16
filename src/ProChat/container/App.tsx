import BackBottom from '@/BackBottom';
import { createStyles } from 'antd-style';
import RcResizeObserver from 'rc-resize-observer';
import { CSSProperties, ReactNode, memo, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatList from '../components/ChatList';
import InputArea from '../components/InputArea';
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
    return (
      <RcResizeObserver
        onResize={(e) => {
          if (e.height !== height) {
            setHeight(e.height);
          }
        }}
      >
        <Flexbox
          className={cx(override.container, className)}
          style={{
            maxHeight: '100vh',
            height: '100%',
            ...style,
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              className={styles}
              ref={ref}
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
          </div>
          <div ref={areaHtml}>{chatInput ?? <InputArea />}</div>
        </Flexbox>
      </RcResizeObserver>
    );
  },
);

export default App;
