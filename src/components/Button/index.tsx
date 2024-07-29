import React from 'react'
import './Button.scss'

interface ButtonProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
  colorType?: 'primary' | 'success' | 'fail' | 'goBack'
}

const Button: React.FC<ButtonProps> = ({ text, onClick, colorType = 'primary', type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={`button button__${colorType}`}>
      {text}
    </button>
  )
}

export default Button
