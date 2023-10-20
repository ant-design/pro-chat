import { FUNCTION_MESSAGE_FLAG } from '@/ProChat/const/message';

export const isFunctionMessage = (content: string) => {
  return content.startsWith(FUNCTION_MESSAGE_FLAG);
};
