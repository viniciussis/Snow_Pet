import './Footer.scss'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__para">
        Copyright &copy; {new Date().getFullYear()} - Snow Pet Shop
      </p>
      <div className="footer__icons">
        <a>
          <FaInstagram size={30} />
        </a>
        <a>
          <FaWhatsapp size={30} />
        </a>
      </div>
      <p className="footer__para footer__para--right">
        Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer
