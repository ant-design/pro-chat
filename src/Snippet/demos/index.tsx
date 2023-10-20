import { Snippet } from '@ant-design/pro-chat';
import { SnippetProps, StoryBook, useControls, useCreateStore } from '@lobehub/ui';

export default () => {
  const store = useCreateStore();
  const control: SnippetProps | any = useControls(
    {
      children: 'pnpm install @ant-design/pro-chat',
      copyable: true,
      language: 'sh',
      spotlight: false,
      symbol: '$',
      type: {
        options: ['ghost', 'block'],
        value: 'ghost',
      },
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <Snippet {...control} />
    </StoryBook>
  );
};
