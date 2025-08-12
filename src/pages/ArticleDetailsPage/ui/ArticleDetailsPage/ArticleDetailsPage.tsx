/* eslint-disable i18next/no-literal-string */
import { ArticleDetails } from 'entities/Article';

import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';

import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slices';

import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;

  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
