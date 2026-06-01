import { useState } from "react";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import { groupService } from "../../services/groupService";
import { toast } from "react-hot-toast";

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Group name is required."); return; }
    setLoading(true);
    try {
      await groupService.create({ name: name.trim() });
      toast.success("Group created!");
      setName("");
      setError("");
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create group.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { setName(""); setError(""); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Group" size="sm">
      {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Group Name</label>
          <input
            type="text" value={name} onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="e.g. Trip to Goa" className="input-base" autoFocus
          />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary text-sm">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary text-sm flex items-center gap-2">
            {loading && <Spinner size="sm" />} Create Group
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGroupModal;
