---
title: Deep customization of conversation content
order: 21
group:
  title: Use Cases
nav:
  title: Documents
  order: 0
---

## Deep Customization of Conversation Content

Many times in business scenarios, the interaction is not always ideal and doesn't just involve returning some data.

One might want to display a chart, even a form, or any arbitrary React component with business attributes. What should be done in this case?

We provide an API named `chatItemRenderConfig` to help you address such issues.

## Parameters of chatItemRenderConfig

This API includes 5 parameters:

- `titleRender`: Title rendering function
- `contentRender`: Content rendering function
- `actionsRender`: Actions rendering function
- `avatarRender`: Avatar rendering function
- `render`: Custom rendering function

## Usage Examples

Here are examples of how to use `chatItemRenderConfig` in the ProChat component:

### Special Notifications

<code src="./demos/controled-servers-push.tsx" ></code>

In the code above, we customize the display of notification-type messages by setting the `render` function. When it is detected that the message source role is `notification`, the default display is replaced with an `Alert` component featuring a warning icon and information prompt.

### Form Submission

<code src="./demos/render-form-chats.tsx" ></code>

In this code example, we manage to implement logic for AI to fill out forms by setting up the `contentRender` function along with special metadata parameters.

### In-depth Interaction Logic

<code src="./demos/render-chats-nextGen.tsx" ></code>

This code demonstrates a very special interactive scenario where you can dynamically adjust your required content based on context.

## Scope of Impact in Source Code

The source code details how each chat item (i.e., each message) is constructed using respective render methods provided by the configuration object `chatItemRenderConfig`. Here are key points explained:

1. Independent useMemo hooks handle parts like avatar (`avatar`), title (`title`), content (`content`) and action buttons (`actions`), which can be customized through corresponding parameters.
2. If an overall custom render method (`render`) is provided and it returns a non-null result, this method will be prioritized and directly return the final DOM structure.
3. All useMemo hooks and the final returned structure depend on external input parameter: `chatItemRenderConfig`.

Note: To use this API correctly, ensure that you have an understanding of React as well as Ant Design library to some extent, and that you're capable of writing custom functions that meet expected types requirements and match logical business scenarios.
