import { TextArea, TextAreaProps } from '@ant-design/pro-chat';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';

export default () => {
  const store = useCreateStore();
  const controls: TextAreaProps | any = useControls(
    {
      placeholder: 'Type keywords...',
      type: {
        options: ['ghost', 'block', 'pure'],
        value: 'ghost',
      },
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <TextArea {...controls} />
    </StoryBook>
  );
};
