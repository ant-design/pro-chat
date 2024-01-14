import { AutoComplete, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useState } from 'react';
import { useStore } from '../../store';

export const AutoCompleteTextArea: React.FC<TextAreaProps> = (props) => {
  const [autocompleteRequest] = useStore((s) => [s.autocompleteRequest]);

  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [open, setOpen] = useState(false);
  return (
    <AutoComplete
      className={props.className}
      options={options}
      style={{
        height: 'max-content',
      }}
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
    >
      <Input.TextArea
        size="large"
        {...props}
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
