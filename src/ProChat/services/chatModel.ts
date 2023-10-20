import { merge } from 'lodash-es';

import { initialLobeAgentConfig } from '../store/initialState';

import { ChatStreamPayload } from '@/ProChat/types/chat';

interface FetchChatModelOptions {
  signal?: AbortSignal | undefined;
}

/**
 * 专门用于对话的 fetch
 */
export const fetchChatModel = (
  params: Partial<ChatStreamPayload>,
  options?: FetchChatModelOptions,
) => {
  const payload = merge(
    {
      model: initialLobeAgentConfig.model,
      stream: true,
      ...initialLobeAgentConfig.params,
    },
    params,
  );

  return fetch('/api/openai/chat', {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    signal: options?.signal,
  });
};
