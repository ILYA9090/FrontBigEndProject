import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';

import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrensySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect: React.FC<CurrensySelectProps> = memo((props) => {
  const { className, value, onChange, readonly } = props;

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );
  const { t } = useTranslation();

  return (
    <ListBox
      readonly={readonly}
      className={className}
      label={t('Укажите валюту')}
      value={value}
      onChange={onChangeHandler}
      items={options}
      defaultValue={t('Укажите валюту')}
      direction="top right"
    />
  );
});
