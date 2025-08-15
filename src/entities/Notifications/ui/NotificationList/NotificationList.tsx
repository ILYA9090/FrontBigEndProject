import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { VStack } from 'shared/ui/Stack';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList: FC<NotificationListProps> = memo((props) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, { pollingInterval: 5000 });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.notificationList, {}, [className])}
      >
        <Skeleton border="8px" height="150px" width="100%" />
        <Skeleton border="8px" height="150px" width="100%" />
        <Skeleton border="8px" height="150px" width="100%" />
        <Skeleton border="8px" height="150px" width="100%" />
        <Skeleton border="8px" height="150px" width="100%" />
        <Skeleton border="8px" height="150px" width="100%" />
      </VStack>
    );
  }
  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.notificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
