import { Input, MentionProps, Mentions } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useState } from 'react';

type MentionsTextAreaProps = TextAreaProps & {
  mentionProps?: MentionProps;
  mentionRequest?: (value: string) => Promise<{ value: string; label?: string }[]>;
};

export const MentionsTextArea: React.FC<MentionsTextAreaProps> = (props) => {
  const { disabled, mentionProps = {}, mentionRequest, ...rest } = props;

  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const baseStyle = {
    backgroundColor: 'transparent',
    flex: 1,
    outline: 'none',
    boxShadow: 'none',
    padding: '0 12px',
    margin: 0,
    border: 'none',
    ...rest.style,
  };
  return (
    <>
      <Mentions
        className={props.className}
        options={options}
        disabled={disabled}
        onSelect={(value) => {
          props.onChange?.({ target: { value } } as any);
          setOptions([]);
        }}
        prefix="/"
        autoSize
        style={baseStyle}
        onSearch={async (value) => {
          const result = await mentionRequest?.(value);
          setOptions((result as any[]) || []);
        }}
        {...mentionProps}
      >
        <Input.TextArea
          size="large"
          rows={3}
          {...rest}
          style={baseStyle}
          disabled={disabled}
          className={`${props.className}-textarea`}
          onFocus={(e) => {
            props.onFocus?.(e);
          }}
          onPressEnter={(e) => {
            if (open && options.length > 0) return;
            props.onPressEnter?.(e);
          }}
        />
      </Mentions>
    </>
  );
};
