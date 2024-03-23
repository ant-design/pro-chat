import { memo } from 'react';

import { RenderMessage } from '../ChatListItem';
import { DefaultMessage } from './Default';

export const AssistantMessage: RenderMessage = memo(({ id, content, ...props }) => {
  // todo: need a custom render
  return <DefaultMessage content={content} id={id} {...props} />;
});
