import { memo } from 'react';

import { useStore } from '@/ProChat/store';
import { Flex } from 'antd';
import { RenderMessageExtra } from '../ChatListItem';

export const AssistantMessageExtra: RenderMessageExtra = memo(({ extra, ...rest }) => {
  const [model, messageItemExtraRender] = useStore((s) => [
    s.config.model,
    s.messageItemExtraRender,
  ]);

  const showModelTag = extra?.fromModel && model !== extra?.fromModel;
  const hasTranslate = !!extra?.translate;

  const showExtra = showModelTag || hasTranslate;

  const dom = messageItemExtraRender?.({ extra, ...rest }, 'assistant');
  if (!showExtra && !dom) return;

  return (
    <Flex gap={8} style={{ marginTop: 8 }}>
      {showModelTag && <div>{extra?.fromModel as string}</div>}
      {dom}
    </Flex>
  );
});
