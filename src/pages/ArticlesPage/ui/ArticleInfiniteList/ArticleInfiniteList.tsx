import { ArticleList } from 'entities/Article';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { getArticles } from '../../model/slices/articlePageSlice';
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticleInfiniteList.module.scss';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo(
  (props) => {
    const { className } = props;

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);

    const view = useSelector(getArticlesPageView);

    return (
      <div className={classNames(cls.articleInfiniteList, {}, [className])}>
        <ArticleList
          className={className}
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
        ;
      </div>
    );
  }
);
