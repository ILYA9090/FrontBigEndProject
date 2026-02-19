import { useMemo, CSSProperties } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import DefaultUserAvatarIcon from '../../assets/icons/defaultUserAvatarIcon.svg';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, src, size = 100, alt, fallbackInverted } = props;
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );
  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={DefaultUserAvatarIcon}
    />
  );
  const mods: Mods = {};
  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      style={styles}
      src={src}
      className={classNames(cls.Avatar, mods, [className])}
      alt={alt}
    />
  );
};
