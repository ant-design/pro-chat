import { produce } from 'immer';

import { LLMRoleType } from '@/types/llm';
import { ChatMessage } from '@/types/message';
import { MetaData } from '@/types/meta';
import { nanoid } from '../../utils/uuid';

interface AddMessage {
  id?: string;
  message: string;
  meta?: MetaData;
  parentId?: string;
  quotaId?: string;
  role: LLMRoleType;
  type: 'addMessage';
}

interface DeleteMessage {
  id: string;
  type: 'deleteMessage';
}

interface ResetMessages {
  topicId?: string;
  type: 'resetMessages';
}

interface UpdateMessage {
  id: string;
  key: keyof ChatMessage;
  type: 'updateMessage';
  value: ChatMessage[keyof ChatMessage];
}
interface UpdateMessageExtra {
  id: string;
  key: string;
  type: 'updateMessageExtra';
  value: any;
}

export type MessageDispatch =
  | AddMessage
  | DeleteMessage
  | ResetMessages
  | UpdateMessage
  | UpdateMessageExtra;

export const messagesReducer = (
  state: ChatMessage<any>[],
  payload: MessageDispatch,
): ChatMessage<any>[] => {
  switch (payload.type) {
    case 'addMessage': {
      return produce(state, (draftState) => {
        const mid = payload.id || nanoid();

        draftState.push({
          content: payload.message,
          createAt: Date.now(),
          id: mid,
          parentId: payload.parentId,
          role: payload.role,
          updateAt: Date.now(),
        });
      });
    }

    case 'deleteMessage': {
      return produce(state, (draftState) => {
        const index = draftState.findIndex((m) => m.id === payload.id);
        delete draftState[index];
      });
    }

    case 'updateMessage': {
      return produce(state, (draftState) => {
        const { id, key, value } = payload;
        const message = draftState.find((m) => m.id === id);
        if (!message) return;

        // @ts-ignore
        message[key] = value;
        message.updateAt = Date.now();
      });
    }

    case 'updateMessageExtra': {
      return produce(state, (draftState) => {
        const { id, key, value } = payload;
        const message = draftState.find((m) => m.id === id);
        if (!message) return;

        if (!message.extra) {
          message.extra = { [key]: value } as any;
        } else {
          message.extra[key] = value;
        }

        message.updateAt = Date.now();
      });
    }

    case 'resetMessages': {
      return produce(state, (draftState) => {
        const messages = Object.values(draftState);

        // 删除上述找到的消息
        for (const message of messages) {
          const index = draftState.findIndex((m) => m.id === message.id);
          delete draftState[index];
        }
      });
    }

    default: {
      throw new Error('暂未实现的 type，请检查 reducer');
    }
  }
};
