import { HTMLMotionProps, motion } from 'framer-motion';

export default function AnimationItem({
  children,
  animation,
  ...rest
}: { children: React.ReactNode; animation: boolean } & HTMLMotionProps<'div'>) {
  if (animation !== true) {
    return <div {...(rest as any)}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
