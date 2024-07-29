import React from 'react'
import './Alert.scss'

interface AlertProps {
  severity: 'success' | 'warning' | 'error' | 'info'
  message: string
}

const Alert: React.FC<AlertProps> = ({ severity = 'info', message }) => {
  return (
    <div className={`alert alert--${severity}`}>
      <h2 className="alert__title">{severity}</h2>
      {message}
    </div>
  )
}

export default Alert
