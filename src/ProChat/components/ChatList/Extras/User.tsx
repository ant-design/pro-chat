import { Divider, Flex } from 'antd';
import { memo } from 'react';

import { RenderMessage } from '../ChatListItem';

export const UserMessageExtra: RenderMessage = memo(
  ({ messageItemExtraRender, extra, ...rest }) => {
    const hasTranslate = !!extra?.translate;
    const dom = messageItemExtraRender?.({ extra, ...rest });
    if (!dom) return;
    return (
      <Flex gap={8} style={{ marginTop: hasTranslate ? 8 : 0 }}>
        {extra?.translate && (
          <div>
            <Divider style={{ margin: '12px 0' }} />
          </div>
        )}
        {dom}
      </Flex>
    );
  },
);
