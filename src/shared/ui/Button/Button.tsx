import React, { ButtonHTMLAttributes } from 'react';
// import { classNames } from 'shared/lib/classNames/classNames';
// import cls from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, ...otherProps } = props;

  return (
    <button className={classNames(cls.Button, { [cls[theme]]: true }, [className])} {...otherProps}>
      {children}
    </button>
  );
};
