import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

export default async (req: Request) => {
  const openai = new OpenAI();
  const payload = (await req.json()) as any;
  const { messages, ...params } = payload;

  const formatMessages = messages.map((m) => ({
    content: m.content,
    name: m.name,
    role: m.role,
  }));
  const response = await openai.chat.completions.create(
    {
      messages: formatMessages,
      ...params,
      stream: true,
    },
    { headers: { Accept: '*/*' } },
  );
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
