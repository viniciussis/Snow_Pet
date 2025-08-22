import { useAlertModalStore } from '@/hooks/stores'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import './AlertModal.scss'

const AlertModal = () => {
  const { isOpen, title, message, confirm, close } = useAlertModalStore()

  if (!isOpen) {
    return null
  }

  return (
    <Modal title={title}>
      <div className="alertModal">
        <p className="alertModal__message">{message}</p>
        <div className="alertModal__actions">
          <Button text="Cancelar" colorType="fail" onClick={close} />
          <Button text="Confirmar" colorType="success" onClick={confirm} />
        </div>
      </div>
    </Modal>
  )
}

export default AlertModal
