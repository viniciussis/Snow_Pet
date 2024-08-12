import { ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
  colorType?: 'primary' | 'success' | 'fail'
}

const Button = ({
  text,
  onClick,
  colorType = 'primary',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button__${colorType}`}
    >
      {text}
    </button>
  )
}

export default Button
