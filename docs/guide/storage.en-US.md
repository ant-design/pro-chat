---
title: Utilizing Browser Caching
group:
  title: Use Cases
  order: 10
nav:
  title: Documents
  order: 0
---

# Cooperating with Browser Storage

## Introduction

When using the ProChat component, you can initialize chat data through the `initialChats` property. This article explains how to use common browser caching strategies for initialization and populate that data into the `initialChats` attribute.

> In actual business scenarios, data should typically reside on the backend and be distributed by it; however, this document provides examples of logic that only uses the frontend.

The examples shown here utilize localStorage. The same principles apply if you choose to use sessionStorage or IndexedDB.

## localStorage

localStorage is a persistent storage solution provided by browsers that allows data to be saved in the user's local browser.。

- During component loading, first check whether there exists cached chat data.
- If cached data exists, retrieve it from localStorage
- Fill it into the initialChats property.
- Update new content into the browser cache as needed

### Retrieving Cache Information

Step one involves fetching data from the cache and inserting it into ProChat's `initialChats`

> I've simulated some cached data here; in reality, these cached data will persist unless manually cleared by the browser, carrying over whatever content was previously stored.

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useEffect, useState } from 'react';

import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  const [cachedChats, setCachedChats] = useState(null);
  // Simulate adding some data to localStorage initially
  useEffect(() => {
    const cachedData = localStorage.getItem('chats');
    if (!cachedData) {
      localStorage.setItem(
        'chats',
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
    const cachedData = localStorage.getItem('chats');
    if (cachedData) {
      setCachedChats(JSON.parse(cachedData));
    }
  }, []);

  return (
    <div style={{ background: theme.colorBgLayout }}>
      {cachedChats ? <ProChat initialChats={cachedChats} /> : <></>}
    </div>
  );
};
```

### Updating Cache with Data from Request

You simply need to listen to all data changes via onChatsChange; we'll handle arranging the order and content properly, updating everything comprehensively.

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useEffect, useState } from 'react';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  const [cachedChats, setCachedChats] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem('chats');
    if (cachedData) {
      setCachedChats(JSON.parse(cachedData));
    }
  }, []);

  return (
    <div style={{ background: theme.colorBgLayout }}>
      {cachedChats ? (
        <ProChat
          initialChats={cachedChats}
          onChatsChange={(chats) => {
            localStorage.setItem(
              'chats',
              JSON.stringify({
                ...chats,
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

## Note

### What's the difference between initialChats and chats？

From a logical perspective, initialChats is used only during initialization; the ProChat component will not update based on changes to initialChats.

On the other hand, chats is a controlled API, where any subsequent changes to chats will cause ProChat to update. If you can ensure that chats will trigger updates only once, then you could also use chats for initialization.

> That's why if initialChats is empty initially, and later updated through a method like setState, ProChat won't update because initialization has already completed. Therefore, please ensure that the current value of initialChats is non-null when passed to ProChat.
