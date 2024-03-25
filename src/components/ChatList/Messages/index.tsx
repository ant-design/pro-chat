import { memo } from 'react';

import { LOADING_FLAT } from '@/const/message';
import Markdown from 'react-markdown';
import BubblesLoading from '../Loading';

export const MessageComponent: React.FC<{
  content: string | React.ReactNode;
}> = memo(({ content }) => {
  if (content === LOADING_FLAT) return <BubblesLoading />;
  if (typeof content !== 'string') return content;
  return <Markdown>{content}</Markdown>;
});
