import { RenderMessage } from '@/ChatList';
import { memo } from 'react';

import { DefaultMessage } from './Default';

export const AssistantMessage: RenderMessage = memo(({ id, content, ...props }) => {
  // todo: need a custom render
  return <DefaultMessage content={content} id={id} {...props} />;
});
