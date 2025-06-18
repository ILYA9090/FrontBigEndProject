import React, { ButtonHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, type, ...otherProps } = props;

  return (
    <button type={type} className={classNames(cls.Button, { [cls[theme]]: true }, [className])} {...otherProps}>
      {children}
    </button>
  );
};
