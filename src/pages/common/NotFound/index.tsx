import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import './NotFound.scss'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="notFound">
      <Button text="< Voltar" colorType="goBack" onClick={() => navigate(-1)} />
      <img
        className="notFound__image"
        src="/images/not_found.png"
        alt="Imagem com dois pets e um texto escrito 'página não encontrada!'"
      />
    </div>
  )
}

export default NotFound
