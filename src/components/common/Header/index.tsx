import './Header.scss'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'
import logo from '@/assets/images/logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">
          <img src={logo} alt="Logo" width={150} height={150} />
        </a>
      </div>
      <div className="header__desktop">
        <DesktopMenu />
      </div>
      <div className="header__mobile">
        <MobileMenu />
      </div>
    </header>
  )
}

export default Header
