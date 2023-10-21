import { DEFAULT_AVATAR, DEFAULT_USER_AVATAR } from '@/ProChat/const/meta';
import { ModelConfig } from '@/ProChat/types/config';
import { ChatMessageMap } from '@/ProChat/types/message';
import { MetaData } from '@/ProChat/types/meta';
import { LanguageModel } from '@/types';

export interface ChatPropsState {
  /**
   * 语言模型角色设定
   */
  config: ModelConfig;
  /**
   * 聊天记录
   */
  chats: ChatMessageMap;
  onChatsChange?: (chats: ChatMessageMap) => void;
  displayMode: 'chat' | 'docs';
  userMeta: MetaData;
  assistantMeta: MetaData;
  /**
   * 帮助消息
   */
  helloMessage?: string;
}

export interface ChatState extends ChatPropsState {
  init?: boolean;
  abortController?: AbortController;
  chatLoadingId?: string;
}

export const initialLobeAgentConfig: ModelConfig = {
  historyCount: 1,
  model: LanguageModel.GPT3_5,
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.6,
    top_p: 1,
  },
  systemRole: '',
};

export const initialState: ChatState = {
  chats: {},
  init: true,
  displayMode: 'chat',
  userMeta: {
    avatar: DEFAULT_USER_AVATAR,
  },
  assistantMeta: {
    avatar: DEFAULT_AVATAR,
  },
  config: initialLobeAgentConfig,
};
