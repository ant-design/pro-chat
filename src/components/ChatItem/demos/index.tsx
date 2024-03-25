import { ChatItem, ChatItemProps } from '@ant-design/pro-chat';
import { useState } from 'react';

import { avatar } from './data';

export default () => {
  const [edit, setEdit] = useState(false);
  const control: ChatItemProps | any = {
    loading: false,
    message: {
      rows: true,
      value:
        "要使用 dayjs 的 fromNow 函数，需要先安装 dayjs 库并在代码中引入它。然后，可以使用以下语法来获取当前时间与给定时间之间的相对时间：\n\n```javascript\ndayjs().fromNow();\ndayjs('2021-05-01').fromNow();\n```",
    },
    placement: {
      options: ['left', 'right'],
      value: 'left',
    },
    primary: false,
    time: 1_686_538_950_084,
    type: {
      options: ['block', 'pure'],
      value: 'block',
    },
  };

  return <ChatItem {...control} avatar={avatar} editing={edit} onEditingChange={setEdit} />;
};
