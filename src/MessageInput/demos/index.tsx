import { content } from '@/EditableMessage/demos';
import { MessageInput } from '@ant-design/pro-chat';

export default () => {
  return <MessageInput defaultValue={content} height={200} style={{ width: '100%' }} />;
};
