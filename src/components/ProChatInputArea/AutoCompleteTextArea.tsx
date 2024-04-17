import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

/**
 * Props for the MentionsTextArea component.
 */
export type MentionsTextAreaProps = TextAreaProps & {
  /**
   * A function that is called when a mention is requested.
   * @param value - The value of the mention.
   * @returns A promise that resolves to an array of mention objects.
   */
  mentionRequest?: (value: string) => Promise<{ value: string; label?: string }[]>;
};

/**
 * A component that provides a textarea with mention functionality.
 * It allows users to mention other users by typing "@" followed by their name.
 *
 * @component
 * @example
 * ```tsx
 * <MentionsTextArea
 *   disabled={false}
 *   mentionRequest={fetchMentions}
 *   className="mentions-textarea"
 *   onChange={handleInputChange}
 *   onPressEnter={handleEnterPress}
 *   style={{ width: '100%' }}
 * />
 * ```
 */
export const MentionsTextArea: React.FC<MentionsTextAreaProps> = (props) => {
  const { disabled, mentionRequest, ...rest } = props;

  // const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  return (
    <Input.TextArea
      className={props.className}
      disabled={disabled}
      autoSize={{
        minRows: rest.rows || 5,
      }}
      rows={rest.rows || 5}
      {...rest}
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        outline: 'none',
        boxShadow: 'none',
        padding: '0 8px',
        margin: 0,
        border: 'none',
        height: 'auto',
        ...rest.style,
      }}
      // options={options}
      // onSelect={(value) => {
      //   props.onChange?.({ target: { value } } as any);
      //   setOptions([]);
      // }}
      // prefix="/"
      // onSearch={async (value, prefix) => {
      //   const result = await mentionRequest?.(value);
      //   setOptions((result as any[]) || []);
      //   rest?.onSearch?.(value, prefix);
      // }}
      onPressEnter={(e) => {
        // if (open && options.length > 0) return;
        props.onPressEnter?.(e);
      }}
    />
  );
};
