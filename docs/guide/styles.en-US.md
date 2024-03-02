---
title: Custom Style
order: 20
group:
  title: Use Cases
nav:
  title: Documents
  order: 0
---

## Custom Style

Overall, for ProChat, due to the use of AntDesign components and design, the style remains consistent

At the same time, we also support different degrees of custom styles

### Input box area style

InputAreaProps allows you to pass Props (i.e. Props supported by antd Input. Area) through the input box, where ClassName or Style can be inserted to modify the style.

Below, I have changed the border color and font color of the input box

<code src="./demos/styles-inputarea.tsx" ></code>

### Conversation Record Style

We have a chatitemRenderConfiguration method that allows you to customize all the content of a conversation. This API is very powerful, and rendering of conversation content will come to this point. Avatar, content area, and operation area can all be modified by magic

I have individually wrapped a blue border for the content area below

<code src="./demos/styles-chatitem.tsx" ></code>

### Overwrite with ClassName style

This is the simplest and most convenient style overlay method. We have added ClassNames to many places, and you only need to open devtools to see some names

> Note: If you find that this ClassName does not look like a normal class name, it indicates that this class is using Hash's ClassName, which will dynamically change. Please do not overwrite this class name

In the following case, I used ant styles (an ant css in js enterprise solution) to style overlay the background of the content area

<code src="./demos/styles-className.tsx" ></code>

### Theme customization

If you want global style customization, such as leveraging antd's custom themes and algorithmic capabilities, we provide a set of code below in conjunction with antd styles. For more details, please refer to [antd styles](https://ant-design.github.io/antd-style/zh-CN/guide)

<code src="./demos/styles-darkmode.tsx" ></code>
