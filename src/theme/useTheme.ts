import {useContext} from 'react'
import { LOCAL_STORAGE_KEY_ITEM, Theme, ThemeContext } from './ThemeContext'

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme
}
const useTheme = (): UseThemeResult => {
   const {theme, setTheme} = useContext(ThemeContext);
    
    
    const toggleTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_KEY_ITEM, newTheme)
    }
    return {theme, toggleTheme}
}

export default useTheme
