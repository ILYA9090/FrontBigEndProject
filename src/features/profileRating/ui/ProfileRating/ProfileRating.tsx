import { FC, memo, useCallback } from 'react';
import { Rating } from 'entities/Rating';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  useAddProfileRating,
  useGetProfileRating,
} from '../../api/profileRatingApi';

interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

export const ProfileRating: FC<ProfileRatingProps> = memo((props) => {
  const { profileId } = props;
  const userData = useSelector(getUserAuthData);
  const { t } = useTranslation();

  const { data: articleRating, isLoading } = useGetProfileRating(
    profileId && userData?.id ? { profileId, userId: userData.id } : skipToken
  );
  const [addRating] = useAddProfileRating();
  const rating = articleRating?.[0];

  const handleProfileMutation = useCallback(
    (starsCount: number, feedback: string) => {
      if (!userData?.id || !profileId) {
        return;
      }
      addRating({
        userId: userData?.id,
        profileId,
        rate: starsCount,
        feedback,
      });
    },
    [addRating, profileId, userData?.id]
  );
  const onCancel = useCallback(
    (starsCount: number) => {
      handleProfileMutation(starsCount, '');
    },
    [handleProfileMutation]
  );

  const onAccept = useCallback(
    (starsCount: number, feedBack?: string) => {
      handleProfileMutation(starsCount, feedBack || '');
    },
    [handleProfileMutation]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  if (!profileId) {
    return null;
  }

  return (
    <Rating
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={rating?.rate ? t('Ваша оценка профиля') : t('Оцените профиль')}
      feedBackTitle={t('Оставьте ваш отзыв о профиле')}
      hasFeedback
    />
  );
});
