import Modal from './Modal.jsx'

function ConfirmDialog({
  confirmLabel = 'Confirm',
  description,
  isBlocked = false,
  onCancel,
  onConfirm,
  title,
}) {
  return (
    <Modal labelledBy="confirm-dialog-title" onClose={onCancel}>
      <div className="modal-card__header">
        <div>
          <p className="eyebrow">Please confirm</p>
          <h2 id="confirm-dialog-title">{title}</h2>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onCancel}
          aria-label="Close confirmation dialog"
        >
          ×
        </button>
      </div>

      <p className={`confirm-message${isBlocked ? ' confirm-message--blocked' : ''}`}>
        {description}
      </p>

      <div className="modal-actions">
        <button className="secondary-action" type="button" onClick={onCancel}>
          {isBlocked ? 'Close' : 'Cancel'}
        </button>
        {!isBlocked && (
          <button className="danger-action" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        )}
      </div>
    </Modal>
  )
}

export default ConfirmDialog
