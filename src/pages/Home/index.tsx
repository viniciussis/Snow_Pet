import './Home.scss'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Link } from 'react-router-dom';

const options = [
  { icon: 'banho_e_tosa', label: 'Banho e tosa', route: '/banho_e_tosa' },
  { icon: 'cliente', label: 'Cliente', route: '/cliente' },
  { icon: 'estoque', label: 'Estoque', route: '/estoque' },
  { icon: 'financeiro', label: 'Financeiro', route: '/financeiro' },
  { icon: 'funcionario', label: 'Funcionario', route: '/funcionario' },
  { icon: 'pet', label: 'Pet', route: '/pet' },
  { icon: 'produto', label: 'Produto', route: '/produto' },
  { icon: 'relatorio', label: 'Relatorio', route: '/relatorio' },
  { icon: 'venda', label: 'Venda', route: '/venda' },
];

const Home = () => {
  return (
    <div className="containerHome">
      <Header />
      <main className="containerHome__content">
        <h1 className="content__title">Bem vindo ao Snow Pet Shop</h1>
        <h2 className="content__subtitle">
          Onde amor e cuidado encontram um lar <em>peludo</em>.
        </h2>
        <div className='content__options'>
          {options.map((option, index) => (
            <Link key={index} to={option.route} >
              <img src={`src/assets/images/${option.icon}.png`} alt={option.label} className='options__icon'/>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
