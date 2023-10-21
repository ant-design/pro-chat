import { App as Container } from 'antd';
import { ReactNode, memo } from 'react';

import App from './App';

import { DevtoolsOptions } from 'zustand/middleware';
import { ChatProps } from '../store';
import { ProChatProvider } from './Provider';
import StoreUpdater from './StoreUpdater';

export interface ProChatProps extends ChatProps {
  renderInput?: ReactNode;
  __PRO_CHAT_STORE_DEVTOOLS__?: boolean | DevtoolsOptions;
  showTitle?: boolean;
}

export const ProChat = memo<ProChatProps>(
  ({
    renderInput,
    __PRO_CHAT_STORE_DEVTOOLS__,
    chats,
    onChatsChange,
    initialChats,
    loading,
    helloMessage,
    userMeta,
    assistantMeta,
    showTitle,
    request,
    ...props
  }) => {
    return (
      <ProChatProvider
        initialChats={initialChats}
        chats={chats}
        loading={loading}
        helloMessage={helloMessage}
        userMeta={userMeta}
        assistantMeta={assistantMeta}
        request={request}
        {...props}
        devtoolOptions={__PRO_CHAT_STORE_DEVTOOLS__}
      >
        <Container>
          <App chatInput={renderInput} showTitle={showTitle} />
        </Container>
        <StoreUpdater
          init={!loading}
          helloMessage={helloMessage}
          chats={chats}
          userMeta={userMeta}
          request={request}
          assistantMeta={assistantMeta}
          onChatsChange={onChatsChange}
        />
      </ProChatProvider>
    );
  },
);
