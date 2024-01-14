import { Button, type BackTopProps } from 'antd';
import { ListEnd } from 'lucide-react';
import {
  MouseEventHandler,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import Icon from '@/Icon';

import { useStyles } from './style';

export interface BackBottomProps {
  className?: string;
  onClick?: BackTopProps['onClick'];
  style?: CSSProperties;
  target: React.RefObject<HTMLDivElement>;
  text?: string;
  visibilityHeight?: BackTopProps['visibilityHeight'];
}

const BackBottom = memo<BackBottomProps>(
  ({ visibilityHeight = 240, target, onClick, style, className, text }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { styles, cx } = useStyles(visible);
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const current = useMemo(() => {
      if (target.current && target.current.scrollHeight > target.current.clientHeight) {
        return target.current;
      }
      return document.body;
    }, []);

    const scrollHeight = current?.scrollHeight || 0;
    const clientHeight = current?.clientHeight || 0;
    const [scroll, setScroll] = useState({ top: 0, left: 0 });

    const timeRef = useRef<number | null>(null);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const scroll = (e: any) => {
        timeRef.current = window.setTimeout(() => {
          setVisible(current?.scrollTop + clientHeight + visibilityHeight < scrollHeight);
          setScroll({
            top: e?.scrollTop,
            left: e?.scrollLeft,
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
    }, []);

    useEffect(() => {
      if (scroll?.top) {
        setVisible(scroll?.top + clientHeight + visibilityHeight < scrollHeight);
      }
    }, [scrollHeight, scroll, visibilityHeight]);

    const scrollToBottom: MouseEventHandler<HTMLDivElement> = (e) => {
      (target as any)?.current?.scrollTo({ behavior: 'smooth', left: 0, top: scrollHeight });
      onClick?.(e);
    };

    useEffect(() => {
      (target as any)?.current?.scrollTo({ behavior: 'smooth', left: 0, top: scrollHeight });
    }, []);

    return (
      <Button
        className={cx(styles, className)}
        icon={<Icon icon={ListEnd} />}
        onClick={scrollToBottom}
        ref={ref}
        size={'small'}
        style={{ bottom: 16, position: 'absolute', right: 16, ...style }}
      >
        {text || 'Back to bottom'}
      </Button>
    );
  },
);

export default BackBottom;
