import Tag from '@/components/Tag';
import { RenderMessageExtra } from '@/index';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStore } from '@/ProChat/store';

export const AssistantMessageExtra: RenderMessageExtra = memo(({ extra, ...rest }) => {
  const [model, messageItemExtraRender] = useStore((s) => [
    s.config.model,
    s.messageItemExtraRender,
  ]);

  const showModelTag = extra?.fromModel && model !== extra?.fromModel;
  const hasTranslate = !!extra?.translate;

  const showExtra = showModelTag || hasTranslate;

  const dom = messageItemExtraRender?.(rest, 'assistant');
  if (!showExtra && !dom) return;

  return (
    <Flexbox gap={8} style={{ marginTop: 8 }}>
      {showModelTag && (
        <div>
          {/*TODO: need a model icons */}
          <Tag>{extra?.fromModel as string}</Tag>
        </div>
      )}
      {dom}
    </Flexbox>
  );
});
