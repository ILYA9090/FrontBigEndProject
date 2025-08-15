/* eslint-disable indent */
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from 'entities/User';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routerConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { MenuComponent } from 'shared/ui/Popups';
import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isAdmin = useSelector(isUserAdmin);
  const authData = useSelector(getUserAuthData);
  const isManager = useSelector(isUserManager);
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }
  return (
    <MenuComponent
      className={classNames(cls.avatarDropdown, {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('Админка'),
                href: RoutePath.admin_panel,
              },
            ]
          : []),
        {
          content: t('Профиль'),
          href: RoutePath.profile + authData.id,
        },
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
