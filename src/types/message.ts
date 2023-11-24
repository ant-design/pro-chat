import { ModelRoleType } from '@/ProChat/types/config';

/**
 * 聊天消息错误对象
 */
export interface ChatMessageError {
  body?: any;
  message: string;
  type: string | number;
}

export interface ChatMessage {
  /**
   * @title 内容
   * @description 消息内容
   */
  content: string;
  error?: any;
  model?: string;
  name?: string;
  parentId?: string;
  /**
   * 角色
   * @description 消息发送者的角色
   */
  role: ModelRoleType | string;
  createAt: number;
  id: string;
  updateAt: number;
  extra?: Record<string, any>;
}

export type ChatMessageMap = Record<string, ChatMessage>;

export interface OpenAIFunctionCall {
  arguments?: string;
  name: string;
}
