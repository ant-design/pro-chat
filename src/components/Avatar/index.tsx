import { Avatar as AntAvatar, type AvatarProps as AntAvatarProps } from 'antd';
import { memo, useMemo } from 'react';

import Emoji from '@/Emoji';
import { getEmoji } from '@/utils/getEmojiByCharacter';

import { useStyles } from './style';

export interface AvatarProps extends AntAvatarProps {
  /**
   * @description The URL or base64 data of the avatar image
   */
  avatar?: string;
  /**
   * @description The background color of the avatar
   */
  background?: string;
  /**
   * @description The shape of the avatar
   * @default 'circle'
   */
  shape?: 'circle' | 'square';
  /**
   * @description The size of the avatar in pixels
   * @default 40
   */
  size?: number;
  /**
   * @description The title text to display if avatar is not provided
   */
  title?: string;
}

const Avatar = memo<AvatarProps>(
  ({
    className,
    avatar,
    title,
    size = 40,
    shape = 'circle',
    background = 'rgba(0,0,0,0)',
    onClick,
    style,
    ...props
  }) => {
    const isImage = Boolean(
      avatar && ['/', 'http', 'data:'].some((index) => avatar.startsWith(index)),
    );
    const emoji = useMemo(() => avatar && !isImage && getEmoji(avatar), [avatar]);

    const { styles, cx } = useStyles({ background, isEmoji: Boolean(emoji), size });

    const text = String(isImage ? title : avatar);

    const avatarProps = {
      className: cx(styles.avatar, className),
      shape: shape,
      size,
      style: onClick ? style : { cursor: 'default', ...style },
    };

    return isImage ? (
      <AntAvatar src={avatar} {...avatarProps} {...props} />
    ) : (
      <AntAvatar {...avatarProps} {...props}>
        {emoji ? <Emoji emoji={emoji} size={size * 0.8} /> : text?.toUpperCase().slice(0, 2)}
      </AntAvatar>
    );
  },
);

export default Avatar;
