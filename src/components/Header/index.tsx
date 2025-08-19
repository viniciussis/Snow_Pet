import { useNavigate } from 'react-router-dom'

import logo from '/images/logo_rounded.png'
import Button from '../Button'
import './Header.scss'
import { useAuthStore } from '@/hooks/stores'

const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore();
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
      <Button text='Sair' colorType='fail' onClick={logout} />
    </header>
  )
}

export default Header
