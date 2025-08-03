import { getUserAuthData } from 'entities/User';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> =
  memo((props) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);
    return (
      <HStack max justify="between" className={classNames('', {}, [className])}>
        <Text title={t('Профиль пользователя')} />
        {canEdit && (
          <div>
            {readonly ? (
              <Button onClick={onEdit} theme={ButtonTheme.OUTLINE}>
                {t('Редактировать')}
              </Button>
            ) : (
              <HStack gap="8">
                <Button onClick={onCancelEdit} theme={ButtonTheme.OUTLINE_RED}>
                  {t('Отменить')}
                </Button>
                <Button onClick={onSave} theme={ButtonTheme.OUTLINE}>
                  {t('Сохранить')}
                </Button>
              </HStack>
            )}
          </div>
        )}
      </HStack>
    );
  });
