import React, { useEffect } from 'react'
import './Modal.scss'

interface ModalProps {
  isModalOpen: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, children }) => {

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
      <div className="modal">{children}</div>
    </div>
  )
}

export default Modal
