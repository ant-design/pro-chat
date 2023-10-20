import { ChatListProps } from '@lobehub/ui';

import { AssistantMessage } from './Assistant';
import { DefaultMessage } from './Default';

export const renderMessages: ChatListProps['renderMessages'] = {
  assistant: AssistantMessage,
  default: DefaultMessage,
};
