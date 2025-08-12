import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  ArticleViewSelector,
  ArticleView,
  ArticleSortField,
  ArticleTypeTabs,
  ArticleType,
} from 'entities/Article';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { useSelector } from 'react-redux';

import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/Hooks/useDebounce/useDebounce';

import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlePageActions } from '../../model/slices/articlePageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
  (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);
    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);
    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
        dispatch(articlePageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(newSort));
        dispatch(articlePageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlePageActions.setOrder(newOrder));
        dispatch(articlePageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        debouncedFetchData();
      },
      [dispatch, debouncedFetchData]
    );

    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlePageActions.setType(value));
        dispatch(articlePageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData]
    );

    return (
      <div className={classNames(cls.articlesPageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            onChange={onChangeSearch}
            value={search}
            placeholder={t('Поиск')}
          />
        </Card>
        <ArticleTypeTabs
          className={cls.tabs}
          value={type}
          onChangeType={onChangeType}
        />
      </div>
    );
  }
);
