import { Divider, Flex } from 'antd';
import { memo } from 'react';

import { useStore } from '@/ProChat/store';
import { RenderMessageExtra } from '../ChatListItem';

export const UserMessageExtra: RenderMessageExtra = memo(({ extra, ...rest }) => {
  const hasTranslate = !!extra?.translate;

  const [messageItemExtraRender] = useStore((s) => [s.messageItemExtraRender]);

  const dom = messageItemExtraRender?.({ extra, ...rest }, 'user');

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
});
