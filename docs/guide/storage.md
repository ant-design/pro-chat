---
title: 使用浏览器缓存
group:
  title: 使用案例
  order: 10
nav:
  title: 文档
  order: 0
---

# 配合浏览器缓存进行存储

## 介绍

在使用 ProChat 组件时，可以通过 `initialChatsList` 属性来初始化聊天数据。本文将介绍如何使用常用的浏览器缓存方案来进行初始化，并填充到 `initialChatsList` 中。

> 当然在真实的业务场景下，其实数据都应该存在后台，然后统一由后台进行派发，这里还是提供一些只使用前端的逻辑。

下面的示范例子都采用 localStorage ，如果你想使用 sessionStorage 或 IndexedDB 整体逻辑是一致的。

## localStorage

localStorage 是一种浏览器提供的持久化存储解决方案，可以将数据保存在用户的本地浏览器中。

- 在组件加载时，首先检查是否存在已经缓存的聊天数据。
- 如果存在缓存数据，则从 `localStorage` 中获取该数据。
- 将获取到的数据填充到 `initialChatsList` 属性中。
- 更新新的内容到浏览器缓存中。

### 拿到缓存信息

第一步，从缓存中拿到数据并塞入到 ProChat 的 initialChatsList 中去。

> 我在这里 mock 了缓存数据，真实情况下，这些缓存数据如果不手动清理，浏览器会带上上次你存好的内容。

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useEffect, useState } from 'react';

import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  const [cachedChats, setCachedChats] = useState(null);
  // 模拟先让 localStorage 有一些数据
  useEffect(() => {
    const cachedData = localStorage.getItem('chatList');
    if (!cachedData) {
      localStorage.setItem(
        'chatList',
        JSON.stringify({
          ZGxiX2p4: {
            content: '昨天的当天是明天的什么？',
            createAt: 1697862242452,
            id: 'ZGxiX2p4',
            role: 'user',
            updateAt: 1697862243540,
          },
          Sb5pAzLL: {
            content: '昨天的当天是明天的昨天。',
            createAt: 1697862247302,
            id: 'Sb5pAzLL',
            parentId: 'ZGxiX2p4',
            role: 'assistant',
            updateAt: 1697862249387,
            model: 'gpt-3.5-turbo',
          },
        }),
      );
    }
  }, []);

  useEffect(() => {
    const cachedData = localStorage.getItem('chatList');
    if (cachedData) {
      setCachedChats(JSON.parse(cachedData));
    }
  }, []);

  return (
    <div style={{ background: theme.colorBgLayout }}>
      {cachedChats ? <ProChat initialChatsList={cachedChats} /> : <></>}
    </div>
  );
};
```

### 从 Request 拿到返回并更新到缓存中

你只需要从 onChatsChange 监听当前所有数据的变更，我们会帮你排版好所有的顺序和内容，全量更新即可。

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useEffect, useState } from 'react';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  const [cachedChats, setCachedChats] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem('chatList');
    if (cachedData) {
      setCachedChats(JSON.parse(cachedData));
    }
  }, []);

  return (
    <div style={{ background: theme.colorBgLayout }}>
      {cachedChats ? (
        <ProChat
          initialChatsList={cachedChats}
          onChatsChange={(chatList) => {
            localStorage.setItem(
              'chatList',
              JSON.stringify({
                ...chatList,
              }),
            );
          }}
          request={async () => {
            const mockedData: string = `这是一段模拟的消息`;
            return new Response(mockedData);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
```

## 注意点

### initialChatsList 和 chatList 有什么不同？

从语言逻辑上说 initialChatsList 只会作用于初始化的时候，ProChat 并不会随着 initialChatsList 的变化从而导致更新。

而 chatList 是一个受控的 api，所有后续 chatList 的变化都会导致 ProChat 进行更新，如果你可以保证 chatList 只会触发一次，那么当然你也可以使用 chatList 进行初始化。

> 这也是为什么如果一开始 initialChatsList 为空，下次通过 SetState 等数据方法进行变化后，ProChat 不会更新的原因，因为初始化已经结束了，所以请保证给到当前的 initialChatsList 是有值的。
