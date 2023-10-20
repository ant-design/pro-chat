import { memo } from 'react';

import { DivProps } from '../types';

import { useStyles } from './style';

export interface EmojiProps extends DivProps {
  /**
   * @description The emoji character to be rendered
   */
  emoji: string;
  /**
   * @description Size of the emoji
   * @default 40
   */
  size?: number;
}

const Emoji = memo<EmojiProps>(({ emoji, className, style, size = 40 }) => {
  const { cx, styles } = useStyles();

  return (
    <div
      className={cx(styles.container, className)}
      style={{ fontSize: size * 0.9, height: size, width: size, ...style }}
    >
      {emoji}
    </div>
  );
});

export default Emoji;
