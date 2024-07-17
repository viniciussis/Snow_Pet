import { useState } from 'react'
import { FaBars } from 'react-icons/fa'

import './MobileMenu.scss'

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const openMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <>
      <div className="menuToggle">
        <button className="menuToggle__button" onClick={openMenu}>
          <FaBars className="button__icon" size={36} />
        </button>
      </div>
      {menuOpen && (
        <nav className="menuBar">
          <div className="menuBar__options">
            <button className="__links">Sobre nós</button>
            <button className="__links">Localização</button>
            <button className="__links">Orçamentos</button>
          </div>
          <div className="menuBar__divider" />
          <div className="menuBar__login">
            <button className="__links __links--colorful">Entrar</button>
          </div>
        </nav>
      )}
    </>
  )
}

export default MobileMenu
