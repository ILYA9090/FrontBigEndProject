import { getUserInited, initAuthData } from 'entities/User';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useAppDispatch } from 'shared/lib/Hooks/useAppDispatch';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

import { AppRouter } from './providers/router';

export default function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}
