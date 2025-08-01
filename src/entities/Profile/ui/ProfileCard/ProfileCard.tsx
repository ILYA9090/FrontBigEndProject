import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { FC, KeyboardEvent } from 'react';

// import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';
import { Profile } from '../../model/types/profile';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  // error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeSity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const {
    className,
    data,
    // error,
    readonly,
    isLoading,
    onChangeAge,
    onChangeSity,
    onChangeFirstname,
    onChangeLastname,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем: цифры, Backspace, Delete, Tab, стрелки
    if (!/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
      e.preventDefault();
    }
  };

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </HStack>
    );
  }
  const mods: Mods = {
    [cls.editing]: !readonly,
  };
  // if (error) {
  //   return (
  //     <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
  //       <Text
  //         theme={TextTheme.ERROR}
  //         title={t('Произошла ошибка при загрузке профиля')}
  //         text={t('Попробуйте обновить страницу')}
  //         align={TextAlign.CENTER}
  //       />
  //     </div>
  //   );
  // }
  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="start" max className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} alt="аватар" />
        </HStack>
      )}

      <Input
        readonly={readonly}
        onChange={onChangeFirstname}
        value={data?.first}
        placeholder={t('Ваше имя')}
        className={cls.input}
      />
      <Input
        readonly={readonly}
        onChange={onChangeLastname}
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        className={cls.input}
      />
      <Input
        readonly={readonly}
        onChange={onChangeAge}
        onKeyDown={handleKeyDown}
        value={data?.age}
        placeholder={t('Ваш возраст')}
        className={cls.input}
      />
      <Input
        readonly={readonly}
        onChange={onChangeSity}
        value={data?.city}
        placeholder={t('Город')}
        className={cls.input}
      />
      <Input
        readonly={readonly}
        onChange={onChangeUsername}
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        className={cls.input}
      />
      <Input
        readonly={readonly}
        onChange={onChangeAvatar}
        value={data?.avatar}
        placeholder={t('Добавьте ссылку на аватар')}
        className={cls.input}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};
