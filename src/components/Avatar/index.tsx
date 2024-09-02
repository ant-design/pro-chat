import { Avatar as AntAvatar, type AvatarProps as AntAvatarProps } from 'antd';
import { memo, useMemo } from 'react';

import Emoji from '@/Emoji';
import { getEmoji } from '@/components/Avatar/getEmojiByCharacter';

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
  /**
   * @description The custom CSS class name
   */
  className?: string;
}

/**
 * @module Avatar
 * @description 头像组件，用于显示用户头像信息
 * @exports Avatar
 * @component
 *
 * @param {string} [avatar] - 头像图片的URL或base64数据
 * @param {string} [background] - 头像的背景颜色
 * @param {'circle' | 'square'} [shape='circle'] - 头像的形状，默认为圆形
 * @param {number} [size=40] - 头像的尺寸（像素）
 * @param {string} [title] - 如果未提供头像，则显示的标题文本
 * @param {string} [className] - 自定义的CSS类名
 * @param {Function} [onClick] - 点击头像时触发的回调函数
 * @param {Object} [style] - 自定义的行内样式
 * @param {Object} [props] - 其他传递给AntAvatar组件的属性
 *
 */
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
    const isBase64 = Boolean(avatar?.startsWith('data'));
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
      <AntAvatar
        src={isBase64 ? avatar : <img src={avatar} alt="avatar" />}
        {...avatarProps}
        {...props}
      />
    ) : (
      <AntAvatar {...avatarProps} {...props}>
        {emoji ? <Emoji emoji={emoji} size={size * 0.8} /> : text?.toUpperCase().slice(0, 2)}
      </AntAvatar>
    );
  },
);

export default Avatar;
