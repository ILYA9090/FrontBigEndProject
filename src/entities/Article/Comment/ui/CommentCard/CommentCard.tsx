/* eslint-disable i18next/no-literal-string */
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { VStack } from 'shared/ui/Stack';
import { RoutePath } from 'shared/types/router';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo((props) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        gap="8"
        max
        className={classNames(cls.commentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton border="50%" width={30} height={30} />
          <Skeleton width={100} height={16} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </VStack>
    );
  }
  if (!comment) {
    return null;
  }
  return (
    <VStack
      max
      gap="8"
      className={classNames(cls.commentCard, {}, [className])}
    >
      <AppLink
        to={`${RoutePath.profile}${comment?.user.id}`}
        className={cls.header}
      >
        {comment?.user.avatar ? (
          <Avatar size={30} src={comment?.user.avatar} />
        ) : null}
        <Text className={cls.username} title={comment?.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment?.text} />
    </VStack>
  );
});
