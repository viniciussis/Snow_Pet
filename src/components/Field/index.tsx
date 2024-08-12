import { forwardRef, InputHTMLAttributes } from 'react'
import './Field.scss'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: string
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      required = false,
      type = 'text',
      label,
      errors,
      autoComplete = 'off',
      ...rest
    },
    ref,
  ) => {
    return (
      <label className="field">
        <input
          autoComplete={autoComplete}
          className="field__input"
          required={required}
          placeholder=""
          type={type}
          ref={ref}
          {...rest}
        />
        <span className="field__label">{label}</span>
        {errors && <span className="field__error">{errors}</span>}
      </label>
    )
  },
)

export default Field
