import { ChatMessage } from '@/types/message';

import { MessageDispatch, messagesReducer } from './message';

describe('messagesReducer', () => {
  let initialState: ChatMessage[];

  beforeEach(() => {
    initialState = [
      {
        id: 'message1',
        content: 'Hello World',
        createAt: 1629264000000,
        updateAt: 1629264000000,
        role: 'user',
      },
      {
        id: 'message2',
        content: 'How are you?',
        createAt: 1629264000000,
        updateAt: 1629264000000,
        role: 'system',
      },
    ];
  });

  describe('addMessage', () => {
    it('should add a new message to the state', () => {
      const payload: MessageDispatch = {
        type: 'addMessage',
        message: 'New Message',
        role: 'user',
        id: 'message3',
      };

      const newState = messagesReducer(initialState, payload);

      expect(Object.keys(newState)).toHaveLength(3);
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'message1'));
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'message2'));
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'message3'));
      expect(newState.find((m) => m.id === 'message3')).toEqual({
        id: 'message3',
        content: 'New Message',
        createAt: expect.any(Number),
        updateAt: expect.any(Number),
        role: 'user',
      });
    });

    it('should use the provided id when adding a new message', () => {
      const payload: MessageDispatch = {
        type: 'addMessage',
        id: 'customId',
        message: 'New Message',
        role: 'user',
      };

      const newState = messagesReducer(initialState, payload);

      expect(Object.keys(newState)).toHaveLength(3);
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'message1'));
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'message2'));
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'customId'));
      expect(newState.find((m) => m.id === 'customId')).toEqual({
        id: 'customId',
        content: 'New Message',
        createAt: expect.any(Number),
        updateAt: expect.any(Number),
        role: 'user',
      });
    });

    it('should use the provided parentId when adding a new message', () => {
      const payload: MessageDispatch = {
        type: 'addMessage',
        message: 'New Message',
        id: 'message3',
        role: 'user',
        parentId: 'message1',
      };

      const newState = messagesReducer(initialState, payload);

      expect(newState.find((m) => m.id === 'message3')).toEqual({
        id: 'message3',
        content: 'New Message',
        createAt: expect.any(Number),
        updateAt: expect.any(Number),
        role: 'user',
        parentId: 'message1',
      });
    });

    it('should use the provided parentId and quotaId when adding a new message', () => {
      const payload: MessageDispatch = {
        type: 'addMessage',
        message: 'New Message',
        id: 'message3',
        role: 'user',
        parentId: 'message1',
      };

      const newState = messagesReducer(initialState, payload);

      expect(newState.find((m) => m.id === 'message3')).toEqual({
        id: 'message3',
        content: 'New Message',
        createAt: expect.any(Number),
        updateAt: expect.any(Number),
        role: 'user',
        parentId: 'message1',
      });
    });
  });

  describe('deleteMessage', () => {
    it('should remove the specified message from the state', () => {
      const payload: MessageDispatch = {
        type: 'deleteMessage',
        id: 'message1',
      };

      const newState = messagesReducer(initialState, payload);

      expect(Object.keys(newState)).toHaveLength(1);
      // eslint-disable-next-line jest/valid-expect
      expect(!newState.some((m) => m.id === 'message1'));
      // eslint-disable-next-line jest/valid-expect
      expect(newState.some((m) => m.id === 'message2'));
    });

    it('should not modify the state if the specified message does not exist', () => {
      const payload: MessageDispatch = {
        type: 'deleteMessage',
        id: 'nonexistentMessage',
      };

      const newState = messagesReducer(initialState, payload);

      expect(newState).toEqual(initialState);
    });
  });

  describe('updateMessage', () => {
    it('should update the specified message with the provided value', () => {
      const payload: MessageDispatch = {
        type: 'updateMessage',
        id: 'message1',
        key: 'content',
        value: 'Updated Message',
      };

      const newState = messagesReducer(initialState, payload);

      const message1 = newState.find((m) => m.id === 'message1');
      expect(message1?.content).toBe('Updated Message');
    });

    it('should not modify the state if the specified message does not exist', () => {
      const payload: MessageDispatch = {
        type: 'updateMessage',
        id: 'nonexistentMessage',
        key: 'content',
        value: 'Updated Message',
      };

      const newState = messagesReducer(initialState, payload);

      expect(newState).toEqual(initialState);
    });
  });

  describe('updateMessageExtra', () => {
    it('should update the specified message extra property with the provided value', () => {
      const payload: MessageDispatch = {
        type: 'updateMessageExtra',
        id: 'message1',
        key: 'translate',
        value: { target: 'en', to: 'zh' },
      };

      const newState = messagesReducer(initialState, payload);
      const message1 = newState.find((m) => m.id === 'message1');
      expect(message1?.extra!.translate).toEqual({ target: 'en', to: 'zh' });
    });

    it('should not modify the state if the specified message does not exist', () => {
      const payload: MessageDispatch = {
        type: 'updateMessageExtra',
        id: 'nonexistentMessage',
        key: 'translate',
        value: { target: 'en', to: 'zh' },
      };

      const newState = messagesReducer(initialState, payload);

      expect(newState).toEqual(initialState);
    });
  });

  describe('resetMessages', () => {
    it('should reset the state to an empty object', () => {
      const payload: MessageDispatch = {
        type: 'resetMessages',
      };

      const newState = messagesReducer(initialState, payload);

      expect(newState).toEqual([]);
    });
  });

  describe('unimplemented type', () => {
    it('should throw an error when an unimplemented type is provided', () => {
      // @ts-ignore
      const payload: MessageDispatch = { type: 'unimplementedType' };

      expect(() => messagesReducer(initialState, payload)).toThrowError(
        '暂未实现的 type，请检查 reducer',
      );
    });
  });
});
