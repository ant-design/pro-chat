import { MentionProps, Mentions } from 'antd';
import { useState } from 'react';

export type MentionsTextAreaProps = MentionProps & {
  mentionRequest?: (value: string) => Promise<{ value: string; label?: string }[]>;
};

export const MentionsTextArea: React.FC<MentionsTextAreaProps> = (props) => {
  const { disabled, mentionRequest, ...rest } = props;

  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  return (
    <Mentions
      className={props.className}
      options={options}
      disabled={disabled}
      onSelect={(value) => {
        props.onChange?.({ target: { value } } as any);
        setOptions([]);
      }}
      prefix="/"
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        outline: 'none',
        boxShadow: 'none',
        padding: '0 8px',
        margin: 0,
        border: 'none',
        ...rest.style,
      }}
      {...rest}
      autoSize={{
        minRows: 3,
      }}
      onSearch={async (value, prefix) => {
        const result = await mentionRequest?.(value);
        setOptions((result as any[]) || []);
        rest?.onSearch?.(value, prefix);
      }}
      onPressEnter={(e) => {
        if (open && options.length > 0) return;
        props.onPressEnter?.(e);
      }}
    />
  );
};
