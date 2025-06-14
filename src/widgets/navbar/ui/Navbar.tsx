import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import cls from './Navbar.module.scss'
 interface NavbarProps {
        className?: string
    }


export const Navbar = ({className} : NavbarProps) => {

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ThemeSwitcher/>
      <div className={cls.Links}>
        <AppLink to='/' theme={AppLinkTheme.SECONDARY}className={cls.mainLink}>
          главная
        </AppLink>
        <AppLink to='/about' theme={AppLinkTheme.RED}>
          О сайте
        </AppLink>
      </div>
    </div>
  )
}

