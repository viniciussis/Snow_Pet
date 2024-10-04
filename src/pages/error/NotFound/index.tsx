import { useNavigate } from 'react-router-dom'

import Button from '@/components/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './NotFound.scss'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <main className="notFound">
        <Button
          className="notFound__backButton"
          text="< Voltar"
          onClick={() => navigate(-1)}
        />
        <img
          className="notFound__image"
          src="/images/not_found.png"
          alt="Imagem com dois pets e um texto escrito 'página não encontrada!'"
        />
      </main>
      <Footer />
    </>
  )
}

export default NotFound
