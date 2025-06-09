import { Suspense, useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/index.scss';
import { Link } from 'react-router-dom'
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy'
import { MainPageLazy } from './pages/MainPage/MainPage.lazy'
import { Theme, ThemeContext } from './theme/ThemeContext';
import useTheme from './theme/useTheme';

export default function App() {
  const {theme, toggleTheme} = useTheme()
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/about' element={<AboutPageLazy/>}/>
          <Route path='/' element={<MainPageLazy/>}/>
        </Routes>
      </Suspense>
       
    </div>
  )
}
