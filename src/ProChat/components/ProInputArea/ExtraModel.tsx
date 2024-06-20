import ActionIcon from '@/ActionIcon';
import useProChatLocale from '@/ProChat/hooks/useProChatLocale';
import { ConfigProvider } from 'antd';
import { createStyles, cx } from 'antd-style';
import { isObject, isString } from 'lodash-es';
import { FileVideo, Image } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';
import AudioIcon from './AudioLines';

const useStyles = createStyles(({ css, token }) => ({
  extra: css`
    color: ${token.colorTextTertiary};
  `,
}));

export type ExtraType = 'image' | 'audio' | 'video';
export interface ExtraItem {
  type: ExtraType;
  onChange?: () => void;
  onFinish?: () => void;
  render: () => JSX.Element;
}
export type ExtraModelProps = {
  className?: string;
  extra?: Array<ExtraItem | ExtraType>;
};

export const ExtraModel = (props: ExtraModelProps) => {
  const { className, extra } = props;

  const { localeObject } = useProChatLocale();

  const defaultDoms = [
    {
      type: 'video',
      render: <ActionIcon key={'video'} title={localeObject.video} icon={FileVideo} />,
    },
    {
      type: 'audio',
      render: <ActionIcon key={'audio'} title={localeObject.audio} icon={AudioIcon} />,
    },
    {
      type: 'image',
      render: <ActionIcon key={'image'} title={localeObject.image} icon={Image} />,
    },
  ];

  const { styles, theme } = useStyles();

  const renderContent = () => {
    if (!extra || extra.length === 0) {
      return null;
    }

    const getDefaultRender = (type: ExtraType) => {
      const defaultComponent = defaultDoms.find((dom) => dom.type === type);
      return defaultComponent ? defaultComponent.render : null;
    };

    return extra.reverse().map((item) => {
      if (isString(item)) {
        return getDefaultRender(item as ExtraType);
      } else if (isObject(item) && 'type' in item && 'render' in item) {
        return item.render();
      } else {
        return null;
      }
    });
  };
  return (
    <ConfigProvider theme={{ token: { colorText: theme.colorTextSecondary } }}>
      <Flexbox
        align={'center'}
        direction={'horizontal-reverse'}
        paddingInline={12}
        className={cx(styles.extra, className)}
        gap={8}
      >
        {renderContent()}
      </Flexbox>
    </ConfigProvider>
  );
};

export default ExtraModel;
