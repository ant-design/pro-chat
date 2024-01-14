import BackBottom from '@/BackBottom';
import { createStyles } from 'antd-style';
import RcResizeObserver from 'rc-resize-observer';
import { CSSProperties, ReactNode, memo, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatList from '../components/ChatList';
import InputArea from '../components/InputArea';
import ChatScrollAnchor from '../components/ScrollAnchor';
import { useOverrideStyles } from './OverrideStyle';

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

interface ConversationProps {
  chatInput?: ReactNode;
  showTitle?: boolean;
  style?: CSSProperties;
  className?: string;
}

const App = memo<ConversationProps>(({ chatInput, className, style, showTitle }) => {
  const ref = useRef(null);
  const { styles, cx } = useStyles();
  const { styles: override } = useOverrideStyles();
  const [isRender, setIsRender] = useState(false);
  const [height, setHeight] = useState('100%' as string | number);
  useEffect(() => {
    setIsRender(true);
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
          height: height,
          ...style,
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            className={styles}
            ref={ref}
            style={{
              height: (height as number) - 112 || '100%',
            }}
          >
            <ChatList showTitle={showTitle} />
            <ChatScrollAnchor />
          </div>
          {isRender ? <BackBottom target={ref} text={'返回底部'} /> : null}
        </div>
        {chatInput ?? <InputArea />}
      </Flexbox>
    </RcResizeObserver>
  );
});

export default App;
