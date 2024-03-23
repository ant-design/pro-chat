import { Flex } from 'antd';
import { RenderMessageExtra } from '../ChatListItem';

export const AssistantMessageExtra: RenderMessageExtra = ({ extra, ...rest }) => {
  const showModelTag = extra?.fromModel && model !== extra?.fromModel;
  const hasTranslate = !!extra?.translate;

  const showExtra = showModelTag || hasTranslate;

  const dom = messageItemExtraRender?.({ extra, ...rest }, 'assistant');
  if (!showExtra && !dom) return;

  return (
    <Flex gap={8} style={{ marginTop: 8 }}>
      {dom}
    </Flex>
  );
};
