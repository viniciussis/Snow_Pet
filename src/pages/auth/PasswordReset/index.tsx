import Button from '@/components/Button'
import Field from '@/components/Field'
import './PasswordReset.scss'

import { Link } from 'react-router-dom'

const PasswordReset = () => {
  return (
    <>
      <div className="passwordReset">
        <h2 className="passwordReset__title">Esqueceu a senha?</h2>
        <p className="passwordReset__sub">
          Digite o endereço de e-mail que você usou ao se registrar e enviaremos
          instruções para redefinir sua senha.
        </p>
        <p className="passwordReset__sub">
          Por motivos de segurança, <strong>NÃO</strong> armazenamos sua senha.
          Portanto, fique tranquilo(a), pois nunca enviaremos sua senha por
          e-mail.{' '}
        </p>w
        <form className="passwordReset__form">
          <Field label="Email*" colorType="dark" />
          <Button text="Trocar senha" colorType="dark" />
        </form>
      </div>
      <footer>
        Já possui uma conta? <Link to="../signin">Entrar...</Link>
      </footer>
    </>
  )
}

export default PasswordReset
