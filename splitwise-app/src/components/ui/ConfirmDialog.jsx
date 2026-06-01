import Modal from "./Modal";
import Spinner from "./Spinner";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Delete", loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <p className="text-slate-400 text-sm mb-6">{message}</p>
    <div className="flex gap-3 justify-end">
      <button onClick={onClose} className="btn-secondary text-sm">Cancel</button>
      <button onClick={onConfirm} disabled={loading} className="btn-danger text-sm flex items-center gap-2">
        {loading && <Spinner size="sm" />}
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
