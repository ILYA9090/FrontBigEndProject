
import { FC, useMemo, useState } from 'react'
import { LOCAL_STORAGE_KEY_ITEM, Theme, ThemeContext } from '../lib/ThemeContext'

const ThemeProvider: FC = ({children}) => {

    const defaultTheme = localStorage.getItem(LOCAL_STORAGE_KEY_ITEM) as Theme || Theme.LIGHT
     const [theme, setTheme] = useState<Theme>(defaultTheme)

  

  const defaultProps = useMemo(() => ({
    theme: theme, setTheme: setTheme
  }), [theme])
  return (
    <ThemeContext.Provider value={defaultProps}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;
