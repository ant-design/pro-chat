import { memo } from 'react';
import { RenderMessage } from '../ChatListItem';
import { DefaultMessage } from './Default';

export const HelloMessage: RenderMessage = memo((props) => {
  const { content } = props;
  if (typeof content === 'string') return <DefaultMessage {...props} />;
  return content;
});
