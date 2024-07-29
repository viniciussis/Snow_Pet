import './Footer.scss'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <p className='footer__para'>Copyright &copy; {new Date().getFullYear()} - Snow Pet Shop</p>
      <div className="footer__icons">
        <a href="">
          <FaInstagram size={36} />
        </a>
        <a href="">
          <FaWhatsapp size={36} />
        </a>
      </div>
      <p className='footer__para footer__para--right'>Todos os direitos reservados.</p>
    </footer>
  )
}

export default Footer
