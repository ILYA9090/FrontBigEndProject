import { Popover } from '@headlessui/react';
import { FC, memo, ReactNode } from 'react';
// import { useTranslation } from 'react-i18next';
import { DropDownDirection } from 'shared/types/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import { mapDirectionClass } from '../../styles/consts';
import cls from './MyPopover.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropDownDirection;
  trigger?: ReactNode;
  children?: ReactNode;
}

export const MyPopover: FC<PopoverProps> = memo((props) => {
  const { className, direction = 'bottom right', trigger, children } = props;
  // const { t } = useTranslation();
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Popover
      className={classNames(cls.MyPopover, {}, [className, popupCls.popup])}
    >
      <Popover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </Popover.Button>
      <Popover.Panel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </Popover.Panel>
    </Popover>
  );
});
