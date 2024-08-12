import { useNavigate } from 'react-router-dom'
import logo from '/images/logo_rounded.png'
import './Header.scss'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Logo Snow Pet"
        onClick={() => navigate('/')}
        height={100}
        width={100}
        src={logo}
      />
    </header>
  )
}

export default Header
