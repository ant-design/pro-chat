export const example = {
  chats: [
    {
      content: '我想添加自定义类名',
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
    },
    {
      content: `  
如下

\`\`\`javascript
    userMeta={{
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        className: 'my-pro-chat-user',
    }}
\`\`\`

\`\`\`javascript
assistantMeta={{
    avatar: '🛸',
    title: '自定义类名',
    backgroundColor: '#67dedd',
    className: 'my-pro-chat-assistant',
}}
\`\`\`
    `,
      createAt: 1697862247302,
      id: 'Sb5pAzLL',
      parentId: 'ZGxiX2p4',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
  ],
  config: {
    model: 'gpt-3.5-turbo',
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: '',
  },
};
