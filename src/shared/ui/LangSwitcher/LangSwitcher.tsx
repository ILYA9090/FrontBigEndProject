import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { Button, ThemeButton } from '../Button/Button';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = (props) => {
  const { className } = props;

  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button type="button" className={classNames('', {}, [className])} theme={ThemeButton.CLEAR} onClick={toggle}>
      {t('Язык')}
    </Button>
  );
};
