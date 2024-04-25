import './Header.scss'
import logo from '/images/logo_rounded.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">
          <img src={logo} alt="Logo Snow Pet" width={150} height={150} />
        </a>
      </div>
    </header>
  )
}

export default Header
