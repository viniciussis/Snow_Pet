import { forwardRef, InputHTMLAttributes } from 'react'
import './Checkbox.scss'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors?: string
  colorType?: 'dark'
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, errors, colorType, ...rest }, ref) => {
    return (
      <label
        className={`checkbox ${colorType ? `checkbox--${colorType}` : ''}`}
      >
        <input
          type="checkbox"
          className="checkbox__input"
          ref={ref}
          {...rest}
        />
        <span></span>
        {label && <span className="checkbox__label">{label}</span>}
        {errors && <span className="checkbox__error">{errors}</span>}
      </label>
    )
  },
)

export default Checkbox
