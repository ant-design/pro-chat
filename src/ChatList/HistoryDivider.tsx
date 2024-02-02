import { Divider } from 'antd';
import { Timer } from 'lucide-react';
import { memo } from 'react';

import Icon from '@/Icon';
import Tag from '@/components/Tag';

/**
 * 历史记录分割线组件的属性。
 */
interface HistoryDividerProps {
  /**
   * 是否启用分割线。
   */
  enable?: boolean;
  /**
   * 分割线文本。
   */
  text?: string;
}

/**
 * 历史记录分割线组件。
 */
const HistoryDivider = memo<HistoryDividerProps>(({ enable, text }) => {
  if (!enable) return null;

  return (
    <div style={{ padding: '0 20px' }}>
      <Divider>
        <Tag icon={<Icon icon={Timer} />}>{text || 'History Message'}</Tag>
      </Divider>
    </div>
  );
});

export default HistoryDivider;
