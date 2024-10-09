import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import Field from '@/components/Field'
import './Signup.scss'

import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <>
      <div className="signUp">
        <h2 className="signUp__title">Crie sua conta!!</h2>
        <p className="signUp__sub">
          Preencha as informações para criar sua conta...
        </p>
        <form className="signUp__form">
          <div className="signUp__form__row">
            <Field label="Nome*" colorType="dark" />
            <Field label="Sobrenome*" colorType="dark" />
          </div>
          <Field label="Email*" colorType="dark" />
          <div className="signUp__form__row">
            <Field label="Senha*" colorType="dark" />
            <Field label="Confirme a senha*" colorType="dark" />
          </div>
          <div className="signUp__form__options">
            <Checkbox label="Concordo com os Termos de Serviço, a Política de Privacidade e as Configurações de Notificação padrão do Snow Pet Shop." />
          </div>
          <Button text="Entrar" colorType="dark" />
        </form>
      </div>
      <footer>
        Já possui uma conta? <Link to="../signin">Entrar...</Link>
      </footer>
    </>
  )
}

export default SignUp
