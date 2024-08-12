import { ReactNode } from 'react'
import './Modal.scss'

interface ModalProps {
  children: ReactNode
  title: string
}

const Modal = ({ title, children }: ModalProps) => {
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
