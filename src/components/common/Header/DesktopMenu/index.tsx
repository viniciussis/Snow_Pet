import './DesktopMenu.scss'

const DesktopMenu = () => {
  return (
    <div className="menu">
      <a className="menu__option" href="/">
        Sobre nós
      </a>
      <a className="menu__option" href="/">
        Localização
      </a>
      <a className="menu__option" href="/">
        Orçamentos
      </a>
      <a className="menu__option menu__option--colorful" href="/">
        Entrar
      </a>
    </div>
  )
}

export default DesktopMenu
