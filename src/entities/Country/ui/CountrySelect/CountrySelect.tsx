import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

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
    <ListBox
      readonly={readonly}
      className={className}
      label={t('Укажите страну')}
      items={options}
      value={value}
      onChange={onChangeHandler}
      defaultValue={t('Укажите страну')}
      direction="top"
    />
  );
});
