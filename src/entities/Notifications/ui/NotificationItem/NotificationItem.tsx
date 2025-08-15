import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item?: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo((props) => {
  const { className, item } = props;

  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.notificationItem, {}, [className])}
    >
      <Text title={item?.title} text={item?.description} />
    </Card>
  );

  if (item?.href) {
    return (
      <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});
