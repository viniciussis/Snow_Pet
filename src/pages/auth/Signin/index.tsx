import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import Field from '@/components/Field'
import './Signin.scss'

import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <>
      <div className="signIn">
        <h2 className="signIn__title">Bem-vindo de volta!!</h2>
        <p className="signIn__sub">Faça login para acessar sua conta...</p>
        <form className="signIn__form">
          <Field label="Endereço de Email" colorType="dark" />
          <Field label="Senha" colorType="dark" />
          <div className="signIn__form__options">
            <Checkbox label="Lembrar-me" />
            <Link to="../password-reset">Esqueci minha senha...</Link>
          </div>
          <Button text="Entrar" colorType="dark" />
        </form>
      </div>
      <footer>
        Ainda não tem uma conta? <Link to="../signup">Crie uma!</Link>
      </footer>
    </>
  )
}

export default SignIn
