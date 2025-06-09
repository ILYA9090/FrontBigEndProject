import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import './index.scss'
// import MainPage from './pages/MainPage/MainPage'
// import AboutPage from './pages/AboutPage/AboutPage'
import { Link } from 'react-router-dom'
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy'
import { MainPageLazy } from './pages/MainPage/MainPage.lazy'
export default function App() {
  return (
    <div className='app'>
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
