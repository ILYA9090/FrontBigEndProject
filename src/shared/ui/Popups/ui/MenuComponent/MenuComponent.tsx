import { Menu } from '@headlessui/react';
import { Fragment, ReactNode, useId } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import cls from './MenuComponent.module.scss';
import popupCls from '../../styles/popup.module.scss';

export interface MenuComponentItems {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface MenuComponentProps {
  className?: string;
  items: MenuComponentItems[];
  direction?: DropDownDirection;
  trigger?: ReactNode;
}

export function MenuComponent(props: MenuComponentProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;
  const id = useId();
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.menuComponent, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(
                cls.item,
                { [popupCls.active]: active },
                []
              )}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item
                key={`menu-item${id}`}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item
              key={`menu-item${id}`}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
