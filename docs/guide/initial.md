---
title: 正确的初始化姿势
order: 12
group:
  title: 使用案例
nav:
  title: 文档
  order: 0
---

# 正确的初始化姿势

在使用 ProChat 组件之前，我们需要了解一些与初始化相关的 api

这些 api 会在细节上略有不同，需要注意细节

## 打招呼消息

`helloMessage` 是一个可自定义的打招呼消息，在下一次发送信息后会消失。它支持传入 ReactNode 类型的内容，可以是文本、链接或其他自定义格式。例如：

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        helloMessage={
          '这是一条自定义消息，支持 markdown 消息，例如：[ProChat](https://github.com/ant-design/pro-chat)'
        }
      />
    </div>
  );
};
```

上述示例中，我们传入了一个带有 Markdown 格式链接的自定义消息作为打招呼语。当然你可以传入 ReactNode 用来自定义打招呼的消息，但是记住打招呼消息会在下一次发送请求后消失。

## 初始化数据

`initialChats` 是用于初始化聊天数据的属性。通过设置 `initialChats`，我们可以加载之前保存的聊天记录，并在 ProChat 组件中展示出来。示例代码如下：

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { example } from './demos/mocks/fullFeature';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat initialChats={example.initialChats} />
    </div>
  );
};
```

上述代码中，我们将 `example.chats` 作为初始聊天数据传递给 ProChat 组件。注意，在使用该属性时需要提供正确格式的初始聊天数据。

## 使用骨架屏

当数据还未准备好时，可以使用 `loading` 属性展示骨架屏以作为占位符。示例代码如下：

```tsx
import { ProChat } from '@ant-design/pro-chat';
import { Button, Divider } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { example } from './demos/mocks/fullFeature';

export default () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const [chats, setChats] = useState(example.initialChats);

  return (
    <Flexbox style={{ background: theme.colorBgLayout }}>
      <Flexbox padding={16} gap={16} horizontal>
        <Button
          type={'primary'}
          onClick={() => {
            setLoading(false);
          }}
        >
          加载完成
        </Button>
        <Button
          onClick={() => {
            setLoading(true);
          }}
        >
          开始加载
        </Button>
      </Flexbox>
      <Divider />
      <ProChat loading={loading} chats={chats} />
    </Flexbox>
  );
};
```

上述代码中，我们将 `loading` 变量传递给 `loading` 属性，以控制是否展示骨架屏。当数据准备好后，可以将 `loading` 设置为 `false`，骨架屏会消失。
