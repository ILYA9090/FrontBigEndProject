import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import { Button } from '../../../Button/Button';
import { mapDirectionClass } from '../../styles/consts';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  label?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
}

export function ListBox(props: ListBoxProps) {
  const {
    direction = 'bottom right',
    readonly,
    items,
    className,
    value,
    defaultValue,
    onChange,
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <div
      className={classNames(cls.listBoxWrapper, {}, [
        className,
        popupCls.popup,
      ])}
    >
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.listBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              as={Fragment}
              disabled={item.disabled}
              key={item.value}
              value={item.value}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </div>
  );
}
