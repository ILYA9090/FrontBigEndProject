import { FC, memo, ReactNode, HTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
}

export const Card: FC<CardProps> = memo((props) => {
  const {
    className,
    children,
    theme = CardTheme.NORMAL,
    max = false,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls.card, { [cls.max]: max }, [
        className,
        cls[theme],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
