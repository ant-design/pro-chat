import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface IAnimTextProps {
  children: string;
  Render: any;
}

export function AnimText({ children, Render }: IAnimTextProps) {
  const [done, setDone] = useState(false);
  const baseText = children;
  const count = useMotionValue(1);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.slice(0, latest));

  useEffect(() => {
    setDone(false);
    const conText = animate(count, baseText.length, {
      type: 'tween',
      delay: -0.1,
      duration: 1,
      ease: 'easeInOut',
      onComplete: () => {
        setDone(true);
      },
    });
    return () => {
      try {
        conText.stop();
      } catch (e) {}
    };
  }, [baseText]);
  return done ? (
    <Render>{baseText}</Render>
  ) : (
    <motion.div
      style={{
        lineHeight: 1.8,
      }}
    >
      {displayText}
    </motion.div>
  );
}
