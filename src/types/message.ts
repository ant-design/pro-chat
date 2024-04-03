import { ProChatMetaData } from '@/hooks/useChatList';
import { ModelRoleType } from '@/types/config';
import React from 'react';

/**
 * 聊天消息错误对象
 */
export interface ChatMessageError {
  body?: any;
  message: string;
  type: string | number;
}

export interface ChatMessage<T extends Record<string, any> = Record<string, any>> {
  /**
   * @title 内容
   * @description 消息内容
   */
  content: React.ReactNode;
  originContent?: string;
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
  extra?: T;
  messageItemExtraRender?: (props: ChatMessage) => React.ReactNode;
  meta?: ProChatMetaData;
}

export interface OpenAIFunctionCall {
  arguments?: string;
  name: string;
}
