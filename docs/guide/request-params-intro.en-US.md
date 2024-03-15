---
title: Introduction to Large Model Input Parameters
group:
  title: Get Started
order: 4
---

# Introduction to Large Model Input Parameters

## Overview of Large Model Input Parameters

When using large language models (LLMs), input parameters are crucial in determining how to process requests and generate responses. These parameters help define the user's query intent, the level of detail output, and the interaction method.

### Common input parameter types

Here are some common input parameter types:

- 'prompt': the text instruction or question provided by the user to the model.
- 'max_tokens': Specifies the maximum number of tokens returned by the model.
- 'temperature': a parameter that controls the diversity of output, with higher values resulting in more randomness.
- 'top_p': used in combination with temperature to further control creativity.
- 'frequency_penalty': Reduce the frequency of repeated content.
- `presence_penalty`: encourages the model to introduce new topics and concepts.

## ChatGPT input example

### Example Code Comparison

Here is a simple example of calling the ChatGPT API:

> Below is the NodeJS calling method. To view the curl and Python methods, you can directly access the OpenAI documentation [QuickStart](https://platform.openai.com/docs/quickstart?context=python)

```js
import OpenAI from 'openai';

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  });
}
```

### Parameter Description and Resolution

In this example:

- 'messages': This is an array containing message objects to be sent to the model. Each message object has the following two properties:

`role`: Indicates the role of the sender of the message. In this example, there is only one message, and its role is set to `"system"`. This indicates that the message comes from the system or context of the environment. `content`: A string containing the actual message content. In this example, the content is `"You are a helpful assistant."`.

- 'model': This specifies which AI model OpenAI uses to process requests and generate responses. The model used in this example is 'gpt-3.5-turbo'.

This is the simplest parameter and content. In fact, the model supports a very large number of parameters. Let's look at a complex request parameter, which includes:

```js
import OpenAI from "openai";
const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
    prompt="Write a story about a dragon who loves baking cookies:",
    max_tokens=150,
    temperature=0.7,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  });
}
```

In this example:

- 'model': Specifies the specific version of LLM used, for example, 'gpt-3.5-turbo'.
- 'prompt': Provides a prompt for starting a conversation or task requirement specification: 'Write a story about a dragon who loves baking cookies:'.
- 'max_tokens': defines the maximum length of the output text: '150' tokens.
- 'temperature': sets the diversity of the results: '0.7' indicates that it is neither completely random nor completely deterministic.
- 'top_p': Used in conjunction with temperature, where a setting of '1' indicates no additional restrictions unless used in conjunction with other values.
- Setting both `frequency_penalty` and `presence_penalty` to "0" means that the probability of repeated content or novel content appearing is not adjusted.

For more complex parameters, see: [OpenAI-ChatGPT:Request Body](https://platform.openai.com/docs/api-reference/chat)

## Flow API vs. Non-Flow API Input Differences

### Input characteristics of streaming interface

In the streaming interface, we can continuously send data segments as input, and usually have a field to indicate whether the connection state is maintained:

```json
{
  ...
  "stream": true,
}
```

By setting "stream" to true, we tell the API that we expect subsequent information to be sent.

### Non-streaming interface input characteristics

On the contrary, in non-streaming interfaces, a complete request is usually sent only once and a complete response is expected. Therefore, there is no need to specifically indicate the keep-alive state in non-streaming scenarios.
