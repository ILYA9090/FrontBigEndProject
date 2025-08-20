import { FC, memo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticalListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticalListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 16 : 6)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    className,
    articles,
    isLoading,
    target,
    view = ArticleView.SMALL,
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдна')} />
      </div>
    );
  }
  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {articles.map((article) => (
        <ArticleListItem
          article={article}
          view={view}
          target={target}
          key={article.id}
          className={cls.card}
        />
      ))}

      {isLoading && getSkeletons(view)}
    </div>
  );
});
