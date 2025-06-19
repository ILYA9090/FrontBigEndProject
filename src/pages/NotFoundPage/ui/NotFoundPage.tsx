import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return <div className={classNames(cls.NotFoundPage, {}, [className])}>{t('Страница не найдена')}</div>;
};
