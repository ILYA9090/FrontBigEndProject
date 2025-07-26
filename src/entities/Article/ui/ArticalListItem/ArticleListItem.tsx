/* eslint-disable i18next/no-literal-string */
import { FC, memo, HTMLAttributeAnchorTarget } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import { RoutePath } from 'shared/config/routerConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  const { className, article, view, target } = props;

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          <Text text={article.type.join(', ')} className={cls.types} />
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink
              target={target}
              to={RoutePath.article_details + article.id}
            >
              <Button theme={ButtonTheme.OUTLINE}>читать далее...</Button>
            </AppLink>

            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
          </div>
        </Card>
      </div>
    );
  }
  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.img} alt={article.title} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(', ')} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
          <Icon Svg={EyeIcon} />
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
