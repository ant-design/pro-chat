import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();

  const openai = new OpenAI({
    apiKey: 'OpenAI Key', // your openai key
    baseURL: 'base url', // if u dont need change baseUrl，you can delete this line
  });

  const PickMessages = messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    };
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...PickMessages],
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
