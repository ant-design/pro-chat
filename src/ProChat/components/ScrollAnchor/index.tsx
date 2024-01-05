import { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useStore } from '@/ProChat/store';
import { chatSelectors } from '../../store/selectors';

import { useAtBottom } from './useAtBottom';

const ChatScrollAnchor = memo(() => {
  const trackVisibility = useStore((s) => !!s.chatLoadingId);
  const str = useStore(chatSelectors.currentChats);

  const { ref, entry, inView } = useInView({
    delay: 100,
    rootMargin: '0px 0px -150px 0px',
    trackVisibility,
  });

  // 如果是移动端，可能200太多了，认为超过 1/3 即可，PC默认200
  const ScrollOffset = window.innerHeight / 3 > 200 ? 200 : window.innerHeight / 4;
  const isAtBottom = useAtBottom(ScrollOffset);

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      });
    }
  }, [inView, entry, isAtBottom, trackVisibility, str]);

  return <div ref={ref} style={{ height: 1, width: '100%' }} />;
});

export default ChatScrollAnchor;
