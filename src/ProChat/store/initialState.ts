import { DEFAULT_AVATAR, DEFAULT_USER_AVATAR } from '@/ProChat/const/meta';
import { ModelConfig } from '@/ProChat/types/config';
import { MetaData } from '@/ProChat/types/meta';
import { ChatMessage, ChatMessageMap } from '@/types/message';

export type ChatRequest = (messages: ChatMessage[], config: ModelConfig) => Promise<Response>;

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
  request?: string | ChatRequest;

  /**
   * 重置消息
   * @returns
   */
  onResetMessage?: () => Promise<void>;

  /**
   * 获取自动完成列表的  request
   * @param value
   * @returns
   */
  autocompleteRequest?: (value: string) => Promise<
    {
      value: string;
      label?: string;
    }[]
  >;

  /**
   * 输入框的 placeholder
   */
  placeholder?: string;

  /**
   * 信息框额外渲染
   */
  messageItemExtraRender?: (message: ChatMessage, type: 'assistant' | 'user') => React.ReactNode;

  /** */
  // /**
  //  * 控制是否流式输出
  //  * @default true
  //  */
  // stream: boolean;
}

export interface ChatState extends ChatPropsState {
  init?: boolean;
  abortController?: AbortController;
  chatLoadingId?: string;
}

export const initialModelConfig: ModelConfig = {
  historyCount: 1,
  model: 'gpt-3.5-turbo',
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
  config: initialModelConfig,
  // stream: true,
};
