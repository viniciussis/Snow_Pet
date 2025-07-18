import { useAuthStore } from '@/hooks/stores'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import { useAuth } from '@/api/queries'
import Field from '@/components/Field'
import './Signin.scss'

import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const token = useAuthStore((s) => s.token)
  const signin = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signin.mutate({ email, password })
  }

  console.log(token)

  if (token) return <Navigate to="/admin/home" />

  return (
    <>
      <div className="signIn">
        <h2 className="signIn__title">Bem-vindo de volta!!</h2>
        <p className="signIn__sub">Faça login para acessar sua conta...</p>
        <form className="signIn__form" onSubmit={handleSubmit}>
          <Field
            label="Endereço de Email"
            colorType="dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            label="Senha"
            type="password"
            colorType="dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="signIn__form__options">
            <Checkbox
              label="Lembrar-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Link to="../password-reset">Esqueci minha senha...</Link>
          </div>
          <Button
            text={signin.isPending ? 'Entrando...' : 'Entrar'}
            colorType="dark"
            disabled={signin.isPending}
            type="submit"
          />
        </form>
      </div>
      <footer>
        Ainda não tem uma conta? <Link to="../signup">Crie uma!</Link>
      </footer>
    </>
  )
}

export default SignIn
