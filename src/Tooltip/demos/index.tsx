import { Tooltip } from '@ant-design/pro-chat';
import { Button } from 'antd';

export default () => {
  return (
    <Tooltip arrow={false} title="Example tooltip">
      <Button type="primary">Tooltip</Button>
    </Tooltip>
  );
};
