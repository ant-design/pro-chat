/**
 * compact: true
 */
import { ActionIcon, ChatInputArea, DraggablePanel, TokenTag } from '@ant-design/pro-chat';
import { Eraser, Languages } from 'lucide-react';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

export default () => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <Flexbox height={400}>
      <div style={{ flex: 1 }}></div>
      <DraggablePanel fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInputArea
          actions={
            <>
              <ActionIcon icon={Languages} />
              <ActionIcon icon={Eraser} />
              <TokenTag maxValue={5000} value={1000} />
            </>
          }
          expand={expand}
          minHeight={200}
          onExpandChange={setExpand}
        />
      </DraggablePanel>
    </Flexbox>
  );
};
