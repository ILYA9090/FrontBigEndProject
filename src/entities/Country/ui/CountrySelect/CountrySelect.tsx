import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from 'entities/Country/model/types/country';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';

interface CurrensySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazahstan, content: Country.Kazahstan },
  { value: Country.USA, content: Country.USA },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Germany, content: Country.Germany },
];

export const CountrySelect: React.FC<CurrensySelectProps> = memo((props) => {
  const { className, value, onChange, readonly } = props;

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );
  const { t } = useTranslation();
  return (
    <Select
      readonly={readonly}
      className={classNames('', {}, [className])}
      label={t('Укажите валюту')}
      options={options}
      value={value}
      onChange={onChangeHandler}
    />
  );
});
