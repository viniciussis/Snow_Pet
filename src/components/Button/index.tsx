import { ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick?: () => void
  colorType?: 'primary' | 'success' | 'fail' | 'dark'
}

const Button = ({
  text,
  onClick,
  colorType = 'primary',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button__${colorType} button__${
        disabled ? 'disabled' : ''
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
