import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/index.scss';
import { Link } from 'react-router-dom'
import AboutPage from 'pages/AboutPage/ui/AboutPage';
import MainPage from 'pages/MainPage/ui/MainPage';
import { useTheme } from './providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';

export default function App() {
  const {theme, toggleTheme} = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </Suspense>
       
    </div>
  )
}
