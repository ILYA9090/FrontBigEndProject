import { saveJsonSettings } from 'entities/User';
import { useJsonSettings } from 'entities/User/model/selectors/jsonSettings';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { Drawer } from 'shared/ui/drawer/Drawer';
import { Modal } from 'shared/ui/Modal/Modal';
import { Text } from 'shared/ui/Text/Text';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();
  const onCloseModal = () => setIsOpen(false);
  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [isArticlePageWasOpened, dispatch]);

  const text = (
    <Text
      title={t('Приветствуем вас на странице статей')}
      text={t('Здесь вы можете найти список статей по программированию')}
    />
  );
  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onCloseModal}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onCloseModal}>
      {text}
    </Modal>
  );
});
