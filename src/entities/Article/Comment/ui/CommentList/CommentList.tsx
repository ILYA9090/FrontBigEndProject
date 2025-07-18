/* eslint-disable i18next/no-literal-string */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo((props) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }
  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => <CommentCard isLoading={isLoading} className={cls.comment} comment={comment} />)
      ) : (
        <Text title={t('Комментарии отсутствуют')} />
      )}
    </div>
  );
});
