/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

import { Button } from 'antd';
import { example } from '../mocks/fullFeature';

export default () => {
  const theme = useTheme();
  return (
    <>
      <div style={{ background: theme.colorBgLayout, height: '800px' }}>
        <ProChat
          displayMode={'docs'}
          style={{ height: '100%' }}
          chats={Object.values(example.chats)}
          config={example.config}
          backToBottomConfig={{
            render: (_, scrollToBottom) => {
              return (
                <Button
                  type="primary"
                  onClick={scrollToBottom}
                  style={{
                    alignSelf: 'flex-end',
                    width: '200px',
                    marginRight: '18px',
                  }}
                >
                  Scroll To Bottom
                </Button>
              );
            },
          }}
        />
      </div>
    </>
  );
};
