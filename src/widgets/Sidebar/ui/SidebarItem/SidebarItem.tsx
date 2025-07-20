import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = memo(
  ({ item, collapsed }) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
      return null;
    }
    return (
      <div>
        <AppLink
          to={item.path}
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
      </div>
    );
  }
);
