import Button from '@/components/Button'
import './Pet.scss'
import Table from './Table'
import SearchBar from '@/components/SearchBar'

const Pet = () => {
  const handleClick = () => {
    console.log('Botão clicado')
  }

  return (
    <div className="pet">
      <h1 className="pet__title">Gerenciamento de Pets</h1>
      <div className="pet__actions">
        <SearchBar placeholder='Pesquisar Pet...' />
        <Button text='Novo Pet' onClick={handleClick} />
      </div>
      <Table />
      <div className='pet__reports'>
        <Button onClick={handleClick} text='Relatórios' />
      </div>
    </div>
  )
}

export default Pet
