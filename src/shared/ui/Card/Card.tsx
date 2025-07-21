import { FC, memo, ReactNode, HTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: FC<CardProps> = memo((props) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      className={classNames(cls.card, {}, [className])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
