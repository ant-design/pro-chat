import { ProChatLocale, gLocaleObject } from '@/locale';
import { DeleteFilled } from '@ant-design/icons';
import { Flex, Popconfirm } from 'antd';
import cx from 'classnames';

export const ActionBar = ({
  className,
  clearMessage,
  actionsRender,
  locale,
  style,
}: {
  className?: string;
  clearMessage: () => void;
  locale: ProChatLocale;
  style?: React.CSSProperties;
  actionsRender: (defaultDoms: React.ReactNode[]) => React.ReactNode;
}) => {
  const defaultDoms = [
    <Popconfirm
      title={gLocaleObject(locale).clearModalTitle}
      okButtonProps={{ danger: true }}
      okText={gLocaleObject(locale).clearDialogue}
      key={'clear'}
      onConfirm={() => {
        clearMessage();
      }}
    >
      <DeleteFilled
        title={gLocaleObject(locale).clearCurrentDialogue}
        style={{
          cursor: 'pointer',
        }}
      />
    </Popconfirm>,
  ];

  return (
    <Flex
      align={'center'}
      style={{
        flexDirection: 'row-reverse',
        ...style,
      }}
      className={cx(className)}
      gap={8}
    >
      {actionsRender?.(defaultDoms) ?? defaultDoms}
    </Flex>
  );
};

export default ActionBar;
