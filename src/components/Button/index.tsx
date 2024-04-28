import React from 'react'
import './Button.scss'

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button onClick={onClick} className='button'>
      {text}
    </button>
  )
}

export default Button
