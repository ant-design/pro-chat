import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { TextAreaRef } from 'antd/es/input/TextArea';
import React from 'react';

export const ProTextArea: React.FC<TextAreaProps> = React.forwardRef<TextAreaRef, TextAreaProps>(
  (props, ref) => {
    const { disabled, ...rest } = props;

    return (
      <Input.TextArea
        size="large"
        {...rest}
        ref={ref}
        disabled={disabled}
        className={`${props.className}-textarea`}
        onFocus={(e) => {
          props.onFocus?.(e);
        }}
        onPressEnter={(e) => {
          props.onPressEnter?.(e);
        }}
      />
    );
  },
);
