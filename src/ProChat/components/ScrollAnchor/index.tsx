import { memo, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useStore } from '@/ProChat/store';
import { chatSelectors } from '../../store/selectors';

const ChatScrollAnchor = memo(({ target }: { target: React.RefObject<HTMLDivElement> }) => {
  const trackVisibility = useStore((s) => !!s.chatLoadingId);
  const str = useStore(chatSelectors.currentChats);

  const [isWindowAvailable, setIsWindowAvailable] = useState(false);

  useEffect(() => {
    // 检查window对象是否已经可用
    if (typeof window !== 'undefined') {
      setIsWindowAvailable(true);
    }
  }, []);

  // 获取上方列表的实例化 ref，会传入给 useAtBottom 用于判断当前是否在滚动
  const current = useMemo(() => {
    if (target.current) {
      return target.current;
    }
    return document.body;
  }, [isWindowAvailable]);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (isWindowAvailable) {
      // 如果是移动端，可能100太多了，认为超过 1/3 即可，PC默认100
      setScrollOffset(window.innerHeight / 3 > 100 ? 100 : window.innerHeight / 4);
    }
  }, [isWindowAvailable]);

  const { ref, entry, inView } = useInView({
    root: target.current,
    delay: 100,
    rootMargin: `0px 0px ${scrollOffset}px 0px`,
    trackVisibility,
  });

  useEffect(() => {
    if (trackVisibility && inView) {
      current?.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: current?.scrollHeight || 99999,
      });
    }
  }, [inView, entry, trackVisibility, str]);

  return <div ref={ref} style={{ height: 1, width: '100%' }} />;
});

export default ChatScrollAnchor;
