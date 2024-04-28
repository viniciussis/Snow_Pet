import './SearchBar.scss'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    console.log('Pesquisar por:', searchTerm)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="searchBar__button" onClick={handleSearch}>
        <FaSearch className="button__icon" size={20} />
      </button>
    </div>
  )
}

export default SearchBar
