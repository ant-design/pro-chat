import { memo, ReactNode } from 'react';
import { DevtoolsOptions } from 'zustand/middleware';
import { ChatProps, createStore, Provider, useStoreApi } from '../store';

interface ProChatProviderProps extends ChatProps {
  children: ReactNode;
  devtoolOptions?: boolean | DevtoolsOptions;
}

export const ProChatProvider = memo<ProChatProviderProps>(
  ({ children, devtoolOptions, ...props }) => {
    let isWrapped = true;

    const Content = <>{children}</>;

    try {
      useStoreApi();
    } catch (e) {
      isWrapped = false;
    }

    if (isWrapped) {
      return Content;
    }

    return <Provider createStore={() => createStore(props, devtoolOptions)}>{Content}</Provider>;
  },
);
