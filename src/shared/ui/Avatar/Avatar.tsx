import { useMemo, CSSProperties } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, src, size, alt } = props;
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 90,
      height: size || 130,
    }),
    [size]
  );

  const mods: Mods = {};
  return <img style={styles} src={src} className={classNames(cls.Avatar, mods, [className])} alt={alt} />;
};
