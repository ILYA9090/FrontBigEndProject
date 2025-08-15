import { memo } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { MyPopover } from 'shared/ui/Popups';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationList } from 'entities/Notifications';
import cls from './NotificationButton.module.scss';
import NotificationIcon from '../../../../shared/assets/icons/notification-20-20.svg';

export const NotificationButton = memo(() => (
  <MyPopover
    direction="bottom left"
    trigger={
      <Button theme={ButtonTheme.CLEAR}>
        <Icon Svg={NotificationIcon} inverted />
      </Button>
    }
  >
    <NotificationList className={cls.notificationButton} />
  </MyPopover>
));
