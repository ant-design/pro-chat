import { Button, type BackTopProps } from 'antd';
import { ListEnd } from 'lucide-react';
import { MouseEventHandler, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import Icon from '@/Icon';
import { useStyles } from './style';

export interface BackBottomProps {
  className?: string;
  /**
   * @description
   * 点击的回调
   */
  onClick?: BackTopProps['onClick'];
  style?: CSSProperties;
  target: React.RefObject<HTMLDivElement>;
  text?: string;
  visibilityHeight?: BackTopProps['visibilityHeight'];
  /**
   * @description 自定义渲染 dom
   * @param defaultDom
   * @param scrollToBottom
   * @param BackBottomConfig
   * @returns  React.ReactNode
   */
  render?: (
    defaultDom: React.ReactNode,
    scrollToBottom: MouseEventHandler<HTMLDivElement>,
    BackBottomConfig: BackBottomProps,
  ) => React.ReactNode;
  /**
   * @description
   * 是否一直显示
   */
  alwaysShow?: boolean;
}

const BackBottom = (props: BackBottomProps) => {
  const {
    visibilityHeight = 240,
    target,
    onClick,
    style,
    className,
    text,
    render,
    alwaysShow = false,
  } = props || {};
  const [visible, setVisible] = useState<boolean>(alwaysShow);
  const { styles, cx } = useStyles(visible);
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const [isWindowAvailable, setIsWindowAvailable] = useState(false);

  useEffect(() => {
    // 检查window对象是否已经可用
    if (typeof window !== 'undefined') {
      setIsWindowAvailable(true);
    }
  }, []);

  const current = useMemo(() => {
    if (target.current && target.current.scrollHeight > target.current.clientHeight) {
      return target.current;
    }
    return document.body;
  }, [isWindowAvailable]);

  const scrollHeight = current?.scrollHeight || 0;
  const clientHeight = current?.clientHeight || 0;
  const [scroll, setScroll] = useState({ top: 0, left: 0 });

  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof current === 'undefined') return;
    const scroll = () => {
      timeRef.current = window.setTimeout(() => {
        if (!alwaysShow) {
          setVisible(current?.scrollTop + clientHeight + visibilityHeight < scrollHeight);
        }
        setScroll({
          top: current?.scrollTop,
          left: current?.scrollLeft,
        });
      }, 60);
    };
    current?.addEventListener?.('scroll', scroll, {
      passive: true,
    });
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      current?.removeEventListener?.('scroll', scroll);
    };
  }, [current]);

  useEffect(() => {
    if (scroll?.top && !alwaysShow) {
      setVisible(scroll?.top + clientHeight + visibilityHeight < scrollHeight);
    }
  }, [scrollHeight, scroll, visibilityHeight, current]);

  const scrollToBottom: MouseEventHandler<HTMLDivElement> = (e) => {
    (target as any)?.current?.scrollTo({ behavior: 'smooth', left: 0, top: scrollHeight });
    onClick?.(e);
  };

  /**
   * @description
   * 为了解决在使用了 ProChatProvider 的情况下，BackBottom 无法正常工作的问题
   */
  useEffect(() => {
    setTimeout(() => {
      (target as any)?.current?.scrollTo({ behavior: 'smooth', left: 0, top: scrollHeight });
    }, 16);
  }, []);

  const defauleDom = (
    <Button
      className={cx(styles, className)}
      icon={<Icon icon={ListEnd} />}
      onClick={scrollToBottom}
      ref={ref}
      size={'small'}
      style={{ bottom: 18, position: 'absolute', right: 16, ...style }}
    >
      {text || 'Back to bottom'}
    </Button>
  );

  if (render) return render(defauleDom, scrollToBottom, props);

  return defauleDom;
};

export default BackBottom;
