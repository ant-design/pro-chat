import { RenderMessageExtra } from '@/index';
import { Divider } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStore } from '@/ProChat/store';

export const UserMessageExtra: RenderMessageExtra = memo(({ extra, ...rest }) => {
  const hasTranslate = !!extra?.translate;

  const [messageItemExtraRender] = useStore((s) => [s.messageItemExtraRender]);
  return (
    <Flexbox gap={8} style={{ marginTop: hasTranslate ? 8 : 0 }}>
      {extra?.translate && (
        <div>
          <Divider style={{ margin: '12px 0' }} />
        </div>
      )}
      {messageItemExtraRender?.({ extra, ...rest }, 'user')}
    </Flexbox>
  );
});
