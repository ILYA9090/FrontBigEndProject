import React, { ButtonHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  children: React.ReactNode;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
  const { className, children, theme = ButtonTheme.OUTLINE, square, disabled, size = ButtonSize.M, ...otherProps } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };
  return (
    <button disabled={disabled} className={classNames(cls.Button, mods, [className])} {...otherProps}>
      {children}
    </button>
  );
});
