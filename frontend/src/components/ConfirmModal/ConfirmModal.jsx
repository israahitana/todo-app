import "./ConfirmModal.css";

/*
  Popup de confirmation générique
  - Oui  → confirmer l'action
  - Non  → annuler l'action
*/
function ConfirmModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>

        <div className="modal-actions">
          <button className="confirm" onClick={onConfirm}>
            Oui
          </button>
          <button className="cancel" onClick={onCancel}>
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
