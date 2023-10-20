import { RenderMessageExtra } from '@/index';
import { Divider } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

export const UserMessageExtra: RenderMessageExtra = memo(({ extra }) => {
  const hasTranslate = !!extra?.translate;

  return (
    <Flexbox gap={8} style={{ marginTop: hasTranslate ? 8 : 0 }}>
      {extra?.translate && (
        <div>
          <Divider style={{ margin: '12px 0' }} />
        </div>
      )}
    </Flexbox>
  );
});
