import { ChatMessageError } from '../../types/message';

export const getMessageError = async (response: Response) => {
  let chatMessageError: ChatMessageError;

  chatMessageError = {
    message: `response error, status: ${response.statusText}`,
    type: response.status as any,
  };

  return chatMessageError;
};

export interface FetchSSEOptions {
  onAbort?: (text: string) => Promise<void>;
  onErrorHandle?: (error: ChatMessageError) => void;
  onMessageHandle?: (text: string, response: Response) => void;
  onFinish?: (text: string, type: SSEFinishType) => Promise<void>;
}

/**
 * SSE finish type
 */
type SSEFinishType = 'done' | 'error' | 'abort';

/**
 * 使用流式方法获取数据
 * @param fetchFn
 * @param options
 */
export const fetchSSE = async (fetchFn: () => Promise<Response>, options: FetchSSEOptions = {}) => {
  const response = await fetchFn();

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
  let output = '';

  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;

  let finishedType: SSEFinishType = 'done';

  while (!done) {
    try {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value, { stream: true });

      output += chunkValue;
      options.onMessageHandle?.(chunkValue, returnRes);
    } catch (error) {
      done = true;

      if ((error as TypeError).name === 'AbortError') {
        finishedType = 'abort';
        options?.onAbort?.(output);
      } else {
        finishedType = 'error';
        console.error(error);
      }
    }
  }

  await options?.onFinish?.(output, finishedType);

  return returnRes;
};
