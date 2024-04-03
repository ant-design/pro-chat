import { ChatMessageError } from '@/types';

export const getMessageError = async (response: Response) => {
  let chatMessageError: ChatMessageError;

  chatMessageError = {
    message: `response error, status: ${response.statusText}`,
    type: response.status as any,
  };

  return chatMessageError;
};

type SSEFinishType = 'done' | 'error' | 'abort' | 'progress';

export interface FetchSSEOptions {
  onErrorHandle?: (error: ChatMessageError) => void;
  onMessageHandle?: (text: string, response: Response, type: SSEFinishType) => void;
  onAbort?: (text: string) => Promise<void>;
  onFinish?: (text: string, type: SSEFinishType) => Promise<void>;
  signal?: AbortSignal;
}

/**
 * 使用流式方法获取数据
 * @param fetchFn
 * @param options
 */
export const processSSE = async (response: Response, options: FetchSSEOptions = {}) => {
  // 如果不 ok 说明有请求错误
  if (!response.ok) {
    // TODO: need a message error custom parser
    const chatMessageError = await getMessageError(response);

    options.onErrorHandle?.(chatMessageError);
    return;
  }

  const returnRes = response.clone();

  const data = response.body;

  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let finishText = '';
  let done = false;

  options?.signal?.addEventListener('abort', async () => {
    reader.cancel();
  });

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, { stream: !doneReading });
    finishText += chunkValue;
    options.onMessageHandle?.(chunkValue, returnRes, done ? 'done' : 'progress');
  }

  if (done) {
    options.onFinish?.(finishText, 'done');
  }

  return returnRes;
};
