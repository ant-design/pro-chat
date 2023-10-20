import { MessageInput } from '@ant-design/pro-chat';

import { content } from '@/Markdown/demos/data';

export default () => {
  return <MessageInput defaultValue={content} height={200} style={{ width: '100%' }} />;
};
