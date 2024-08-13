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
  /**
   * 创建时间
   */
  createAt: number;
  /**
   * 唯一id
   */
  id: string;
  /**
   * 修改时间
   */
  updateAt: number;
  /**
   * 附加数据
   * @description 如果不传则为空
   */
  extra?: T;

  /**
   * 模型元数据
   */
  meta?: ProChatMetaData;

  /**
   * 是否完成
   */
  isFinished?: boolean;
}

export interface OpenAIFunctionCall {
  arguments?: string;
  name: string;
}
