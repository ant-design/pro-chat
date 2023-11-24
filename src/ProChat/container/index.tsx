import { App as Container } from 'antd';
import { CSSProperties, ReactNode, memo } from 'react';

import App from './App';

import { DevtoolsOptions } from 'zustand/middleware';
import { ChatProps } from '../store';
import { ProChatProvider } from './Provider';
import { ProChatChatReference } from './StoreUpdater';

export interface ProChatProps extends ChatProps {
  renderInput?: ReactNode;
  __PRO_CHAT_STORE_DEVTOOLS__?: boolean | DevtoolsOptions;
  showTitle?: boolean;
  style?: CSSProperties;
  className?: string;
  chatRef?: ProChatChatReference;
}

export const ProChat = memo<ProChatProps>(
  ({ renderInput, __PRO_CHAT_STORE_DEVTOOLS__, showTitle, style, className, ...props }) => {
    return (
      <ProChatProvider {...props} devtoolOptions={__PRO_CHAT_STORE_DEVTOOLS__}>
        <Container>
          <App chatInput={renderInput} showTitle={showTitle} style={style} className={className} />
        </Container>
      </ProChatProvider>
    );
  },
);
