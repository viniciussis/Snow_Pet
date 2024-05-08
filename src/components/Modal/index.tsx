import React from 'react'
import './Modal.scss'

interface ModalProps {
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h1 className="modal__title">{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default Modal
