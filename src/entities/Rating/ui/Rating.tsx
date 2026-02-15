import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { Input } from 'shared/ui/Input/Input';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from 'shared/ui/drawer/Drawer';
import cls from './Rating.module.scss';

interface RatingProps {
  className?: string;
  title?: string;
  feedBackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedBack?: string) => void;
}

export const Rating: FC<RatingProps> = memo((props) => {
  const {
    className,
    title,
    feedBackTitle,
    onAccept,
    onCancel,
    hasFeedback = true,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(0);
  const [feedBack, setFeedBack] = useState<string>('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsOpenModal(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = useCallback(() => {
    setIsOpenModal(false);
    onAccept?.(starsCount, feedBack);
  }, [feedBack, onAccept, starsCount]);

  const canceleHandle = useCallback(() => {
    setIsOpenModal(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <VStack max gap="32">
      <Text title={feedBackTitle} />
      <Input placeholder={t('Ваш отзыв')} />
      <HStack max gap="16" justify="end">
        <Button onClick={canceleHandle} theme={ButtonTheme.OUTLINE_RED}>
          {t('Закрыть')}
        </Button>
        <Button onClick={acceptHandle} theme={ButtonTheme.OUTLINE}>
          {t('Отправить')}
        </Button>
      </HStack>
    </VStack>
  );
  return (
    <Card className={classNames(cls.rating, {}, [className])}>
      <VStack>
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          {modalContent}
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy>
          {modalContent}
        </Drawer>
      </MobileView>
    </Card>
  );
});
