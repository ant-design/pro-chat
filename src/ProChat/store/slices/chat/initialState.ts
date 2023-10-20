export interface ChatState {
  abortController?: AbortController;
  chatLoadingId?: string;
}

export const initialChatState: ChatState = {};
