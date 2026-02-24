import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Rating } from 'entities/Rating';

const MainPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div data-testid="MainPage">
      {t('Главная страница')}
      <Rating title="Оцени сайт " />
    </div>
  );
});

export default MainPage;
