import BackBottom from '@/BackBottom';
import { createStyles } from 'antd-style';
import { ReactNode, memo, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useOverrideStyles } from '@/ProChat/container/OverrideStyle';
import ChatList from '../components/ChatList';
import ChatScrollAnchor from '../components/ScrollAnchor';

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
}

const App = memo<ConversationProps>(({ chatInput, showTitle }) => {
  const ref = useRef(null);
  const { styles } = useStyles();
  const { styles: override } = useOverrideStyles();
  return (
    <Flexbox className={override.container} flex={1} style={{ position: 'relative' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className={styles} ref={ref}>
          <ChatList showTitle={showTitle} />
          <ChatScrollAnchor />
        </div>
        <BackBottom target={ref} text={'返回底部'} />
      </div>
      {chatInput}
    </Flexbox>
  );
});

export default App;
