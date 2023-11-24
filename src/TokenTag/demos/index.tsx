import { TokenTag, TokenTagProps } from '@ant-design/pro-chat';

export default () => {
  const control: TokenTagProps | any = {
    maxValue: {
      step: 1,
      value: 5000,
    },
    value: {
      step: 1,
      value: 1000,
    },
  };

  return <TokenTag {...control} />;
};
