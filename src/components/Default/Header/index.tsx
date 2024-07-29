import { useNavigate } from 'react-router-dom'
import './Header.scss'
import logo from '/images/logo_rounded.png'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="header">
      <div className="header__logo">
        <img
          src={logo}
          alt="Logo Snow Pet"
          width={125}
          height={125}
          onClick={() => navigate('/')}
        />
      </div>
    </header>
  )
}

export default Header
