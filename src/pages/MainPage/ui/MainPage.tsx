import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Rating } from 'entities/Rating';

const MainPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      {t('Главная страница')}
      <Rating title="привет" />
    </div>
  );
});

export default MainPage;
