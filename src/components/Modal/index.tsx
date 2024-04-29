import React, { useEffect } from 'react'
import './Modal.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">{children}</div>
    </div>
  )
}

export default Modal
