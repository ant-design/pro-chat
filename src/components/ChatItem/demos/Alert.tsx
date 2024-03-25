import { ChatItem } from '@ant-design/pro-chat';

import { avatar } from './data';

export default () => <ChatItem avatar={avatar} error={{ type: 'error', message: 'Error' }} />;
