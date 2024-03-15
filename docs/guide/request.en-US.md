---
title: Core API Request Design Ideas
group:
  title: Get Started
order: 6
---

# Core API Request Design Ideas

## Design idea

### A Request is the Core

Anyone who has used the `ProTable` component of the `ProComponents` package (https://github.com/ant-design/pro-components) knows that the core API of the `ProTable` component is the `Request` component. This component initiates a request and returns data to render the entire `Table`. By writing the Request component in the `ProTable` component, you are halfway done rendering the table.

In `ProChat`, it's similar. In a large model scenario, for a front-end developer, we only care about "what is the model returning to me". We don't want to deal with so many strange data structures

## Design of output parameters

> This is an example of the return content of the general meaning of Q&A

```json
{
  "requestId": "7a21407f-9f16-9ba0-a91b-df0bdd1cc5bb",
  "usage": { "input_tokens": 25, "output_tokens": 321 },
  "output": {
"Text": "OK, here is a simple and easy recipe for Fried Rice with vegetables:  n  nMaterials:  n -2 white radishes, peeled and diced  n -1 potato, peeled and diced  n -2 eggplants, peeled and diced  n -1 cup of rice  n -2 green peppers, diced  n -1 red pepper, diced  n -2 tablespoons of soy sauce  n -1 tablespoon of oil  n - moderate salt and black pepper  n  nProcesses:  n1 Add 2 tablespoons of oil to the pot and heat to medium high temperature. \N2. Add diced white radish and diced potatoes, stir fry until softened and slightly burnt yellow. \Add diced eggplants and continue to stir fry until softened. \N4. Add rice, stir fry evenly, and let the rice grains disperse. \Add diced green and red peppers, continue to stir fry for about 2-3 minutes until the vegetables become soft and slightly brown. \N6. Add soy sauce, salt, and black pepper, stir fry evenly until all ingredients are evenly coated with soy sauce and seasoning. \N7. Put the Fried Rice in a bowl and add a bowl of clear soup or fish soup to it. ",",
    "finish_reason": "stop"
  }
}
```

For us, or in other words, for businesses with similar dialogue-based requirements, we should only care about the returned sentence. (Except for special circumstances)

Therefore, we designed Request to return one and only one String

So you only need to take out the current String in the returned Response.

```js
<ProChat
  request={async (messages) => {
    const response = await QwChat(messages);
    return new Response(response?.output?.text);
  }}
/>
```

> In both streaming and non-streaming, we only care about String, but the processing methods are different. For details, see the component case

## Input parameter design

So what about the input parameters?

This is the input parameter of the Tongyi Qianwen large model. You can see that there are many parameters, and different models have different input parameters. When making components, it is necessary to consider balance.

After weighing, we finally designed the structure of the input parameter as follows

```typescript
/**
 * ChatRequest is a function type representing a request for the chat API.
 * It accepts an array of ChatMessage objects and a ModelConfig object as parameters, and returns a Promise that returns a Response object upon parsing.
 */
export type ChatRequest = (messages: ChatMessage[], config: ModelConfig) => Promise<Response>;

/**
 * Indicates a chat message object with optional generic extra data.
 */
export interface ChatMessage<T extends Record<string, any> = Record<string, any>> {
  role: ModelRoleType | string; // The role of the sender.
  content: ReactNode; // Message content, which can be rendered as a ReactNode.
  error?: any; // Optional error information related to the message.
  model?: string; // The model associated with the message.
  name?: string; // The name of the sender who sent the message.
  parentId?: string; // If this is a reply to another message, the ID of the parent message.
  createAt: number; // Message creation timestamp.
  id: string; // Unique identifier of the message.
  updateAt: number; // The last update timestamp of the message.
  extra?: T; // Optional generic extra data associated with the message.
}

/**
 * indicates the model configuration options used in the chat function.
 */
export interface ModelConfig {
  compressThreshold?: number; // The threshold for compressing messages when enabled.
  enableCompressThreshold?: boolean; // Whether to enable the compression threshold flag.
  enableHistoryCount?: boolean; //Whether to enable the history count flag.
  enableMaxTokens?: boolean; // Whether to enable the maximum token limit flag.
  fewShots?: LLMFewShots; // Language model learning with few samples configuration
  historyCount?: number; // maximum history count of chat messages.
  inputTemplate?: string; // The input template for generating messages based on user input
  model?: string; // The model name or identifier used in the chat function
  params?: ModelParams; // additional parameters specific to the model used in the chat function
  SystemRole?: String; // System assignment role
}
```

The first parameter messages is the most critical, which is the context of the current conversation. The role and content are the most critical ones, as they are the most basic content required by almost all large models. The remaining parameters are also likely to be used by most models.

The second parameter is some model-related parameters that you sometimes need to configure and send to the model.
