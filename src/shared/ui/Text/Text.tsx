import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}
interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text: React.FC<TextProps> = memo((props) => {
  const { className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.LEFT } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
  };
  return (
    <div className={classNames(cls.text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
