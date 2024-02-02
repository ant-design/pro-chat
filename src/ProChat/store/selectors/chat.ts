import { ChatMessage } from '@/types/message';

import { MetaData } from '@/ProChat/types/meta';
import { getSlicedMessagesWithConfig } from '../../utils/message';
import type { ChatStore } from '../store';

// 当前激活的消息列表
export const currentChats = (s: ChatStore): ChatMessage[] => {
  if (Object.keys(s.chats).length === 0) return [];

  const getMeta = (message: ChatMessage): MetaData => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, title, backgroundColor, ...rest } = s.userMeta;
    const assistant = s.assistantMeta;
    switch (message.role) {
      case 'user': {
        return {
          avatar,
          title,
          ...rest,
        };
      }

      case 'system': {
        return assistant;
      }

      case 'assistant': {
        return {
          avatar: assistant?.avatar,
          backgroundColor: assistant?.backgroundColor,
          title: assistant?.title,
        };
      }
    }

    return {};
  };

  const basic = s.chats
    // 映射头像关系
    .map((m) => {
      return {
        ...m,
        meta: getMeta(m),
      };
    });

  const finalList: ChatMessage[] = [];

  const addItem = (item: ChatMessage) => {
    const isExist = finalList.findIndex((i) => item.id === i.id) > -1;
    if (!isExist) {
      finalList.push(item);
    }
  };

  // 基于添加逻辑进行重排序
  for (const item of basic) {
    // 先判存在与否，不存在就加入
    addItem(item);

    for (const another of basic) {
      if (another.parentId === item.id) {
        addItem(another);
      }
    }
  }

  return finalList;
};

// 针对新助手添加初始化时的自定义消息
export const currentChatsWithGuideMessage = (s: ChatStore): ChatMessage[] => {
  const data = currentChats(s);
  // TODO: need topic inject

  const isBrandNewChat = data.length === 0;

  if (!isBrandNewChat) return data;

  const emptyInboxGuideMessage = {
    content: s.helloMessage ?? '让我们开始对话吧',
    createAt: Date.now(),
    extra: {},
    id: 'default',
    meta: s.assistantMeta,
    role: 'hello',
    updateAt: Date.now(),
  } as ChatMessage;

  return [emptyInboxGuideMessage];
};

export const currentChatsWithHistoryConfig = (s: ChatStore): ChatMessage[] => {
  const chats = currentChats(s);

  return getSlicedMessagesWithConfig(chats, s.config);
};

export const chatsMessageString = (s: ChatStore): string => {
  const chats = currentChatsWithHistoryConfig(s);
  return chats.map((m) => m.content).join('');
};
