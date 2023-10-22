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
  onErrorHandle?: (error: ChatMessageError) => void;
  onMessageHandle?: (text: string) => void;
}

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

  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    options.onMessageHandle?.(chunkValue);
  }

  return returnRes;
};
