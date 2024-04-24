import './Home.scss'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

const Home = () => {
  return (
    <div className="containerHome">
      <Header />
      <main className='containerHome__content'>
        <h1>Bem vindo ao Snow Pet Shop</h1>
        <h2>Onde amor e cuidado encontram um lar <em>peludo</em>.</h2>
      </main>
      <Footer />
    </div>
  )
}

export default Home
