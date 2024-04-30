import React, { useEffect } from 'react'
import './Modal.scss'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>
  )
}

export default Modal
