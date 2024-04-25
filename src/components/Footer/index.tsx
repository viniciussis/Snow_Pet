import './Footer.scss'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright &copy; {new Date().getFullYear()} - Snow Pet Shop</p>
      <ul className="footer__icons">
        <li>
          <a href="">
            <FaInstagram size={36} />
          </a>
        </li>
        <li>
          <a href="">
            <FaWhatsapp size={36} />
          </a>
        </li>
      </ul>
      <p>Todos os direitos reservados.</p>
    </footer>
  )
}

export default Footer
