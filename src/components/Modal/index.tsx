import React, { useEffect } from 'react'
import './Modal.scss'

interface ModalProps {
  isModalOpen: boolean
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalProps> = ({ title, isModalOpen, children }) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

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
