import { FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'
import './SearchBar.scss'

interface SearchBarProps {
  placeholder: string
  search: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, search }) => {
  const [query, setQuery] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onBlur={() => search(query)}
      />
      <button className="searchBar__button" onClick={() => search(query)}>
        <FaSearch className="button__icon" size={20} />
      </button>
    </div>
  )
}

export default SearchBar
