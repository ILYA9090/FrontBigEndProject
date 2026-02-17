import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Rating } from 'entities/Rating';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  useAddArticleRating,
  useGetArticleRating,
} from '../../api/articleRatingApi';

interface ArticleRatingProps {
  className?: string;
  articleId?: string;
}

export const ArticleRating: FC<ArticleRatingProps> = memo((props) => {
  const { articleId } = props;
  const userData = useSelector(getUserAuthData);
  const { t } = useTranslation();

  const { data: articleRating, isLoading } = useGetArticleRating(
    articleId && userData?.id ? { articleId, userId: userData.id } : skipToken
  );
  const [addRating] = useAddArticleRating();
  const rating = articleRating?.[0];

  const handleArticleMutation = useCallback(
    (starsCount: number, feedback: string) => {
      if (!userData?.id || !articleId) {
        return;
      }
      addRating({
        userId: userData?.id,
        articleId,
        rate: starsCount,
        feedback,
      });
    },
    [addRating, articleId, userData?.id]
  );
  const onCancel = useCallback(
    (starsCount: number) => {
      handleArticleMutation(starsCount, '');
    },
    [handleArticleMutation]
  );

  const onAccept = useCallback(
    (starsCount: number, feedBack?: string) => {
      handleArticleMutation(starsCount, feedBack || '');
    },
    [handleArticleMutation]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  if (!articleId) {
    return null;
  }

  return (
    <Rating
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={rating?.rate ? t('Ваша оценка статьи') : t('Оцените статью')}
      feedBackTitle={t('Оставьте ваш отзыв о статье')}
      hasFeedback
    />
  );
});
