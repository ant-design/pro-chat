import { type InputRef } from 'antd';
import { forwardRef } from 'react';

import Desktop, { ChatInputAreaDesktop } from './Desktop';

export type ChatInputAreaProps = ChatInputAreaDesktop;

const ChatInputArea = forwardRef<InputRef, ChatInputAreaProps>((props, ref) => (
  <Desktop ref={ref} {...props} />
));

export default ChatInputArea;
