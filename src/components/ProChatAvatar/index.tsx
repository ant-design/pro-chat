import { Avatar, type AvatarProps } from 'antd';

import cx from 'classnames';
import { isEmoji } from './isEmoji';

export interface ProChatAvatarProps extends AvatarProps {
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

  loading?: boolean;
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
const ProChatAvatar: React.FC<ProChatAvatarProps> = ({
  className,
  avatar,
  title,
  size = 40,
  shape = 'circle',
  onClick,
  style,
  ...props
}) => {
  if (isEmoji(avatar)) {
    return <div>{avatar}</div>;
  }
  const isImage = Boolean(
    avatar && ['/', 'http', 'data:'].some((index) => avatar.startsWith(index)),
  );
  const isBase64 = Boolean(avatar?.startsWith('data'));

  const text = String(isImage ? title : avatar);

  const avatarProps = {
    className: cx(className),
    shape: shape,
    size,
    style: onClick ? style : { cursor: 'default', ...style },
  };

  return isImage ? (
    <Avatar
      src={isBase64 ? avatar : <img src={avatar} alt="avatar" />}
      {...avatarProps}
      {...props}
    />
  ) : (
    <Avatar {...avatarProps} {...props}>
      {text?.toUpperCase().slice(0, 2)}
    </Avatar>
  );
};

export default ProChatAvatar;
