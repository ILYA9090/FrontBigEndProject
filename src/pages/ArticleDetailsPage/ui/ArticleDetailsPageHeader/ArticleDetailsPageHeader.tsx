import { getArticleDetailsData } from 'entities/Article';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routerConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
  (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);
    const dispatch = useAppDispatch();
    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
      dispatch(fetchArticlesList({ replace: true }));
    }, [navigate, dispatch]);

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [navigate, article?.id]);

    return (
      <HStack max justify="between" className={classNames('', {}, [className])}>
        <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
          {t('Назад к списку')}
        </Button>
        {canEdit && (
          <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>
            {t('Редактировать статью')}
          </Button>
        )}
      </HStack>
    );
  }
);
