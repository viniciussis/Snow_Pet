import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="notFound">
      <div className="notFound__goBack">
        <button onClick={() => navigate(-1)}>{'< Voltar'}</button>
      </div>
      <h1>Página não encontrada!</h1>
    </div>
  )
}

export default NotFound
