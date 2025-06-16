import './styles/index.scss';
import { Suspense } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/Sidebar';




export default function App() {

  const {theme} = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar/> 
          <div className='content-page'>
            <Sidebar/>
            <AppRouter/>
          </div>      
      </Suspense>     
    </div>
  )
}
