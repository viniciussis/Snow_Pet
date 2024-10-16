import { Link } from 'react-router-dom'
import './Home.scss'

const options = [
  { icon: 'atendimento', label: 'Atendimento', route: 'atendimento' },
  { icon: 'banho_e_tosa', label: 'Banho e tosa', route: 'banho_e_tosa' },
  { icon: 'cliente', label: 'Cliente', route: 'cliente' },
  { icon: 'estoque', label: 'Estoque', route: 'estoque' },
  { icon: 'pet', label: 'Pet', route: 'pet' },
  { icon: 'produto', label: 'Produto', route: 'produto' },
  { icon: 'relatorio', label: 'Relatorio', route: 'relatorio' },
]

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">Bem vindo ao Snow Pet Shop</h1>
      <h2 className="home__sub">
        Onde amor e cuidado encontram um lar <em>peludo</em>.
      </h2>
      <div className="home__options">
        {options.map((option, index) => (
          <Link key={index} to={`../../admin/${option.route}`}>
            <img
              src={`/images/${option.icon}.png`}
              alt={option.label}
              className="home__options__icon"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
