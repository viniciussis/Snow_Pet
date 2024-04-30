import React from 'react'
import './Button.scss'

interface ButtonProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {text}
    </button>
  )
}

export default Button
