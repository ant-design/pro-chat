import { ChatMessageError } from '../../types/message';

export const getMessageError = async (response: Response) => {
  let chatMessageError: ChatMessageError;

  chatMessageError = {
    message: `response error, status: ${response.statusText}`,
    type: response.status as any,
  };

  return chatMessageError;
};

export type SSEFinishType = 'done' | 'error' | 'abort';

export type MixRequestResponse = Response | { content?: Response; [key: string]: any };

export interface FetchSSEOptions {
  onErrorHandle?: (error: ChatMessageError) => void;
  onMessageHandle?: (text: string, response: MixRequestResponse) => void;
  onAbort?: (text: string) => Promise<void>;
  onFinish?: (type: SSEFinishType) => Promise<void>;
  onCancel?: () => void;
  signal?: AbortSignal;
}

/**
 * 使用流式方法获取数据
 * @param fetchFn
 * @param options
 */
export const fetchSSE = async (
  fetchFn: () => Promise<MixRequestResponse>,
  options: FetchSSEOptions = {},
) => {
  const response = await fetchFn();

  if (!response) {
    options.onCancel?.();
    return;
  }

  let returnRes = null;

  let realResponse = null;

  if (typeof response === 'object' && 'content' in response) {
    returnRes = response?.content.clone();
    realResponse = response?.content;
  } else {
    returnRes = response?.clone();
    realResponse = response;
  }

  // 如果不 ok 说明有请求错误
  if (!realResponse.ok) {
    // TODO: need a message error custom parser
    const chatMessageError = await getMessageError(realResponse);
    options.onErrorHandle?.(chatMessageError);
    return;
  }

  const data = realResponse.body;

  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;

  try {
    while (!done) {
      if (options.signal?.aborted) {
        options.onFinish?.('abort');
        break;
      }

      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunkValue = decoder.decode(value, { stream: !doneReading });
        options.onMessageHandle?.(chunkValue, response);
      }

      if (done) {
        options.onFinish?.('done'); // Call onFinish when all data is read.
      }
    }
  } catch (error) {
    options.onErrorHandle?.(error); // Handle errors that occur during the reading process.
  }

  return returnRes;
};
