import './Header.scss'
import logo from '@/assets/images/21.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">
          <img src={logo} alt="Logo" width={150} height={150} />
        </a>
      </div>
    </header>
  )
}

export default Header
