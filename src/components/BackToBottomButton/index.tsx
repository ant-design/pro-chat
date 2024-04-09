import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { FloatButton, FloatButtonProps, FloatButtonRef } from 'antd';
import React, { useEffect, useState } from 'react';
import getScroll from './utils/getScroll';
import throttleByAnimationFrame from './utils/throttleByAnimationFrame';

type BackToBottmButtonProps = Omit<FloatButtonProps, 'target'> & {
  target?: () => HTMLElement | Window | Document;
  visibilityHeight?: number;
};

const BackToBottmButton: React.FC<BackToBottmButtonProps> = (props) => {
  const { target, visibilityHeight = 50, ...rest } = props;
  const [visible, setVisible] = useState<boolean>(visibilityHeight === 0);

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement, UIEvent> | { target: any }) => {
      const scrollTop = getScroll(e.target, true);
      const scrollHeight = e.target?.scrollHeight;
      const targetHeight = e.target?.clientHeight;
      setVisible(scrollHeight - scrollTop - targetHeight >= visibilityHeight);
    },
  );

  const internalRef = React.useRef<FloatButtonRef['nativeElement']>(null);

  const getDefaultTarget = (): HTMLElement | Document | Window =>
    internalRef.current && internalRef.current.ownerDocument
      ? internalRef.current.ownerDocument
      : window;

  useEffect(() => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    handleScroll({ target: container });
    container?.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [target]);

  return (
    <FloatButton
      ref={internalRef}
      style={{
        bottom: 168,
        position: 'absolute',
        display: visible ? 'block' : 'none',
      }}
      icon={<VerticalAlignBottomOutlined />}
      {...rest}
    ></FloatButton>
  );
};

export { BackToBottmButton };

export type { BackToBottmButtonProps };
