import BackBottom from '@/BackBottom';
import { createStyles } from 'antd-style';
import { CSSProperties, ReactNode, memo, useRef } from 'react';
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
      width: 100vw;
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
  return (
    <Flexbox className={cx(override.container, className)} style={style}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className={styles} ref={ref}>
          <ChatList showTitle={showTitle} />
          <ChatScrollAnchor />
        </div>
        <BackBottom target={ref} text={'返回底部'} />
      </div>
      {chatInput ?? <InputArea />}
    </Flexbox>
  );
});

export default App;
