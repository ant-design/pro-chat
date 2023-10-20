import { TokenTag, TokenTagProps } from '@ant-design/pro-chat';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';

export default () => {
  const store = useCreateStore();
  const control: TokenTagProps | any = useControls(
    {
      maxValue: {
        step: 1,
        value: 5000,
      },
      value: {
        step: 1,
        value: 1000,
      },
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <TokenTag {...control} />
    </StoryBook>
  );
};
