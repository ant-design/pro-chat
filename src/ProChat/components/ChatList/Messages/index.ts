import { ChatListProps } from '..';
import { AssistantMessage } from './Assistant';
import { DefaultMessage } from './Default';
import { HelloMessage } from './Hello';

export const renderMessages: ChatListProps['renderMessages'] = {
  hello: HelloMessage,
  assistant: AssistantMessage,
  default: DefaultMessage,
};
