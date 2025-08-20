import { ArticleList } from 'entities/Article';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: FC<ArticleRecommendationsListProps> =
  memo((props) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading } = useArticleRecommendationsList(4);

    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    return (
      <VStack gap="8" className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={t('Рекомендуем')} />
        <ArticleList articles={articles || []} target="_blank" />
      </VStack>
    );
  });
