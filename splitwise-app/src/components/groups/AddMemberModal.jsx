import { useState } from "react";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import { groupService } from "../../services/groupService";
import { toast } from "react-hot-toast";

const AddMemberModal = ({ isOpen, onClose, groupId, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("User ID is required."); return; }
    setLoading(true);
    try {
      await groupService.addMember(
    groupId,
    { email }
);
      toast.success("Member added!");
      setEmail("");
      setError("");
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add member.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { setEmail(""); setError(""); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Member" size="sm">
      {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input
            type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="Enter member email" className="input-base" autoFocus
          />
          <p className="text-xs text-slate-500 mt-1.5">Enter the email address used to register.</p>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary text-sm">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary text-sm flex items-center gap-2">
            {loading && <Spinner size="sm" />} Add Member
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMemberModal;
