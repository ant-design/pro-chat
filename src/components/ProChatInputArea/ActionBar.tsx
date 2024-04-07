import { ProChatLocale, gLocaleObject } from '@/locale';
import { DeleteFilled } from '@ant-design/icons';
import { Flex, Popconfirm, theme } from 'antd';
import cx from 'classnames';

export const ProChatActionBar: React.FC<{
  className?: string;
  prefixClass?: string;
  clearMessage: () => void;
  actionsRender: (defaultDoms: React.ReactNode[]) => React.ReactNode;
  locale?: ProChatLocale;
  style?: React.CSSProperties;
}> = ({ className, prefixClass, clearMessage, actionsRender, locale, style }) => {
  const { hashId } = theme.useToken();
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
        className={cx(`${prefixClass}-item`, `${prefixClass}-clear-icon`, hashId)}
        title={gLocaleObject(locale).clearCurrentDialogue}
        style={{
          cursor: 'pointer',
        }}
      />
    </Popconfirm>,
  ];

  const renderDoms = actionsRender?.(defaultDoms) ?? defaultDoms;

  if (!renderDoms) return null;
  return (
    <Flex
      align={'center'}
      style={{
        flexDirection: 'row-reverse',
        ...style,
      }}
      className={cx(className, prefixClass, hashId)}
      gap={8}
    >
      {renderDoms}
    </Flex>
  );
};
