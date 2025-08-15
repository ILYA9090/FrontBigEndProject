import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routerConfig/routeConfig';
import { HStack } from 'shared/ui/Stack';
import { NotificationButton } from 'features/notificationButton';
import { AvatarDropdown } from 'features/avatarDropdown';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t('ХОБР')}
        />
        <AppLink
          className={cls.createBtn}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t('Создать статью')}
        </AppLink>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }
  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        onClick={onShowModal}
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.Links}
      >
        {t('Войти')}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
