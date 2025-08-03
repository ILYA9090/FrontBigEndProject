import { Currency } from 'entities/Currency';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/Hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Country } from 'entities/Country';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileCard } from 'entities/Profile';
import { VStack } from 'shared/ui/Stack';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard: FC<EditableProfileCardProps> = memo(
  (props) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const validateErrors = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    const validateErrorTranslates = {
      [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
      [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
      [ValidateProfileError.INCORRECT_AVATAR]: t('Некорректный аватар'),
      [ValidateProfileError.INCORRECT_COUNTRY]: t('Страна обязательное поле '),
      [ValidateProfileError.INCORRECT_CURRENCY]: t('Валюта обязательное поле'),
      [ValidateProfileError.INCORRECT_USER_DATA]: t(
        'Имя и фамилия обязательны'
      ),
      [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    };

    useInitialEffect(() => {
      if (id) {
        dispatch(fetchProfileData(id));
      }
    });

    const onChangeFirstname = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
      },
      [dispatch]
    );
    const onChangeLastname = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
      },
      [dispatch]
    );
    const onChangeAge = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value || '') }));
      },
      [dispatch]
    );
    const onChangeSity = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
      },
      [dispatch]
    );
    const onChangeUsername = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
      },
      [dispatch]
    );
    const onChangeAvatar = useCallback(
      (value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
      },
      [dispatch]
    );
    const onChangeCurrency = useCallback(
      (currency?: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
      },
      [dispatch]
    );
    const onChangeCountry = useCallback(
      (country?: Country) => {
        dispatch(profileActions.updateProfile({ country }));
      },
      [dispatch]
    );
    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <VStack gap="8" max className={classNames('', {}, [className])}>
          <EditableProfileCardHeader />
          {validateErrors?.length &&
            validateErrors.map((err: ValidateProfileError) => (
              <Text
                key={err}
                text={validateErrorTranslates[err]}
                theme={TextTheme.ERROR}
              />
            ))}
          <ProfileCard
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            data={formData}
            isLoading={isLoading}
            onChangeAge={onChangeAge}
            onChangeSity={onChangeSity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
          />
        </VStack>
      </DynamicModuleLoader>
    );
  }
);
