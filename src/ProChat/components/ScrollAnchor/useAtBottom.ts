import { useEffect, useState } from 'react';

export const useAtBottom = (offset = 0, target: HTMLElement) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  useEffect(() => {
    if (target) {
      const handleScroll = () => {
        setIsAtBottom(target.scrollTop + target.clientHeight >= target.scrollHeight - offset);
      };
      target.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => {
        target.removeEventListener('scroll', handleScroll);
      };
    } else {
      const handleScroll = () => {
        setIsAtBottom(window.innerHeight + window.scrollY >= document.body.offsetHeight - offset);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [offset, target]);

  return isAtBottom;
};
