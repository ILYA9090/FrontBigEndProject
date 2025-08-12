import { FC, memo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';
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
  virtualized?: boolean;
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
    virtualized = true,
  } = props;
  const { t } = useTranslation();

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 4;

  const rowCount = isBig
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  const rowRender = ({ index, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          target={target}
          className={cls.card}
          article={articles[index]}
          view={view}
          key={articles[index].id}
        />
      );
    }
    return (
      <div key={key} className={cls.row} style={style}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдна')} />
      </div>
    );
  }
  return (
    // @ts-ignore
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        height,
        width,
        registerChild,
        onChildScroll,
        isScrolling,
        scrollTop,
      }) => (
        <div
          // @ts-ignore
          ref={registerChild}
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          {virtualized ? (
            // @ts-ignore
            <List
              autoHeight
              height={height ?? 700}
              rowCount={rowCount}
              rowHeight={isBig ? 700 : 330}
              rowRenderer={rowRender}
              width={width ? width - 80 : 700}
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
            />
          ) : (
            articles.map((article) => (
              <ArticleListItem
                article={article}
                view={view}
                target={target}
                key={article.id}
                className={cls.card}
              />
            ))
          )}

          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
