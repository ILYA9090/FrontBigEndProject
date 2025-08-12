import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from '../../model/consts/consts';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: React.FC<ArticleSortSelectorProps> = memo(
  (props) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption[]>(
      () => [
        {
          value: 'asc',
          content: t('возрастанию'),
        },
        {
          value: 'desk',
          content: t('убыванию'),
        },
      ],
      [t]
    );

    const sortFieldOptions = useMemo<SelectOption[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('дате создания'),
        },
        {
          value: ArticleSortField.TITLE,
          content: t('названию'),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t('просмотрам'),
        },
      ],
      [t]
    );

    const changeSortHandler = useCallback(
      (newSort: string) => {
        onChangeSort(newSort as ArticleSortField);
      },
      [onChangeSort]
    );
    const changeOrderHandler = useCallback(
      (newOrder: string) => {
        onChangeOrder(newOrder as SortOrder);
      },
      [onChangeOrder]
    );

    return (
      <div className={classNames(cls.articleSortSelector, {}, [className])}>
        <Select
          value={sort}
          options={sortFieldOptions}
          label={t('Сортировать ПО')}
          onChange={changeSortHandler}
        />
        <Select
          onChange={changeOrderHandler}
          value={order}
          options={orderOptions}
          label={t('по')}
          className={cls.order}
        />
      </div>
    );
  }
);
