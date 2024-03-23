---
title: Initialize correctly
order: 12
group:
  title: Use Cases
nav:
  title: Documents
  order: 0
---

# Initialize correctly

Before using the ProChat component, we need to understand some APIs related to initialization

These APIs may differ slightly in details, so attention should be paid to the details

## Hello message

`helloMessage` is a customizable greeting message that will disappear after the next message is sent. It supports passing in content of ReactNode type, which can be text, links, or other custom formats. For example:

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        helloMessage={
          'This is a custom message that supports Markdown messages, such as：[ProChat](https://github.com/ant-design/pro-chat)'
        }
      />
    </div>
  );
};
```

In the above example, we passed in a custom message with a Markdown formatted link as a greeting. Of course, you can pass in ReactNode to customize the greeting message, but remember that the greeting message will disappear after the next request is sent.

## Initialize data

`initialChatsList` is a property used to initialize chat data. By setting `initialChatsList`，We can load the previously saved chat records and display them in the ProChat component. The example code is as follows:

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { example } from './demos/mocks/fullFeature';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat initialChatsList={example.initialChatsList} />
    </div>
  );
};
```

In the above code, we pass `example.chatList` as the initial chat data to the ProChat component. Note that when using this attribute, it is necessary to provide the initial chat data in the correct format.

## Using a skeleton screen

When the data is not ready yet, the `loading` attribute can be used to display the skeleton screen as a placeholder. The example code is as follows:

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { Button, Flex, Divider } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';
import { example } from './demos/mocks/fullFeature';

export default () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const [chatList, setChatList] = useState(example.initialChatsList);

  return (
    <Flex style={{ background: theme.colorBgLayout }}>
      <Flex padding={16} gap={16} horizontal>
        <Button
          type={'primary'}
          onClick={() => {
            setLoading(false);
          }}
        >
          Loading completed
        </Button>
        <Button
          onClick={() => {
            setLoading(true);
          }}
        >
          Start loading
        </Button>
      </Flex>
      <Divider />
      <ProChat loading={loading} chatList={chatList} />
    </Flex>
  );
};
```

In the above code, we pass the `loading` variable to the `loading` attribute to control whether the skeleton screen is displayed. After the data is ready, you can set `loading` to 'false' and the skeleton screen will disappear.
