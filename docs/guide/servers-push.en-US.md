---
title: The method of server push
order: 20
group:
  title: Use Cases
nav:
  title: Documents
  order: 0
---

## The method of server push

Many times, we need scenarios for server-side push, such as:

-The token limit has been reached, and users need to be prompted to recharge -Some of the calls behind FunctionCall will be executed for a long time, and a message will be pushed after the execution

In this case, it is somewhat different from a regular Request or SSE, and even the triggering time may not necessarily be related to the conversation request

This problem can be simplified as:

-How to send/receive a piece of content (timing uncertain)

ProChat is very flexible in this situation, and we offer several methods to help you

### Controlled mode

In this case, we waited for 3 seconds before actively pushing a notification, and then controlled it through chatList and placed it in the last piece of content

> In this case, we also used the render in chatitemRenderConfig to customize a special format of information. For more information about this API, please refer to [Deep Customization Conversation Content](./chatItemRenderConfig.md)

<code src="./demos/controled-servers-push.tsx" ></code>

### Hooks sendMessage

> Working on Progress
