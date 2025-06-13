import './styles/index.scss';
import { Link } from 'react-router-dom'
import { useTheme } from './providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/navbar';
export default function App() {
  const {theme, toggleTheme} = useTheme()
  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar/>
      <AppRouter/>
       <button onClick={toggleTheme}>TOGGLE</button>
    </div>
  )
}
