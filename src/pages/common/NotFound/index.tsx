import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="notFound">
      <div className="notFound__goBack">
        <button onClick={() => navigate(-1)}>{'< Voltar'}</button>
      </div>
      <img
        className='notFound__image'
        src="/images/not_found.png"
        alt="Imagem com dois pets e um texto escrito 'página não encontrada!'"
      />
    </div>
  )
}

export default NotFound
