import copy from 'copy-to-clipboard';
import { memo } from 'react';

import { useCopied } from '@/hooks/useCopied';
import { CopyOutlined } from '@ant-design/icons';
import { Tooltip, type TooltipProps } from 'antd';

export type CopyButtonProps = {
  /**
   * @description Additional class name
   */
  className?: string;
  /**
   * @description The text content to be copied
   */
  content: string;
} & TooltipProps;

export const CopyButton = memo<CopyButtonProps>(
  ({ content, className, placement = 'right', ...props }) => {
    const { copied, setCopied } = useCopied();

    return (
      <Tooltip {...props} title={copied ? '✅ Success' : 'Copy'} placement={placement}>
        <CopyOutlined
          className={className}
          onClick={() => {
            copy(content);
            setCopied();
          }}
        />
      </Tooltip>
    );
  },
);
