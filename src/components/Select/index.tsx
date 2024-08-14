import { forwardRef, SelectHTMLAttributes } from 'react'
import './Select.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  errors?: string
  options: { value: string | number; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ required = false, label, errors, options, ...rest }, ref) => {
    return (
      <label className="select">
        <select
          className="select__input"
          required={required}
          ref={ref}
          {...rest}
        >
          <option value="" disabled>
            Selecione...
          </option>
          {options.map((option) => (
            <option
              className="select__input__option"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="select__label">{label}</span>
        {errors && <span className="select__error">{errors}</span>}
      </label>
    )
  },
)

export default Select
