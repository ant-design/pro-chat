import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { type TextAreaRef } from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useStore } from '../../store';

type AutoCompleteTextAreaProps = TextAreaProps & {
  autoCompleteProps?: AutoCompleteProps;
  reference?: React.Ref<TextAreaRef>;
};

export const AutoCompleteTextArea: React.FC<AutoCompleteTextAreaProps> = (props) => {
  const [autocompleteRequest] = useStore((s) => [s.autocompleteRequest]);

  const { disabled, reference, autoCompleteProps = {}, ...rest } = props;

  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [open, setOpen] = useState(false);
  return (
    <AutoComplete
      className={props.className}
      options={options}
      style={{
        height: 'max-content',
      }}
      disabled={disabled}
      open={open}
      onDropdownVisibleChange={(open) => {
        setOpen(open);
      }}
      value={props.value}
      onSelect={(value) => {
        props.onChange?.({ target: { value } } as any);
        setOptions([]);
      }}
      onSearch={async (value) => {
        const result = await autocompleteRequest?.(value);
        setOptions((result as any[]) || []);
      }}
      {...autoCompleteProps}
    >
      <Input.TextArea
        size="large"
        {...rest}
        ref={reference}
        disabled={disabled}
        className={`${props.className}-textarea`}
        onFocus={(e) => {
          setOpen(false);
          props.onFocus?.(e);
        }}
        onPressEnter={(e) => {
          if (open && options.length > 0) return;
          props.onPressEnter?.(e);
        }}
      />
    </AutoComplete>
  );
};
