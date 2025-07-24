import { StateSchema } from 'app/providers/StoreProveder';
import { getScrollSafePath, ScrollSafeActions } from 'features/scrollSafe';
import { FC, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/Hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/Hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/Hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = (props) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPostition = useSelector(
    (state: StateSchema) => getScrollSafePath(state, pathname)
    // eslint-disable-next-line function-paren-newline
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPostition;
  });
  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      ScrollSafeActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, 500);

  return (
    <section
      onScroll={onScroll}
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </section>
  );
};
