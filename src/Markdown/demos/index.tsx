import { Markdown, MarkdownProps } from '@ant-design/pro-chat';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';

import { content } from './data';

export default () => {
  const store = useCreateStore();
  const options: MarkdownProps | any = useControls(
    {
      children: {
        rows: true,
        value: content,
      },
      fullFeaturedCodeBlock: false,
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <Markdown {...options} />
    </StoryBook>
  );
};
