import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import { expenseService } from "../../services/expenseService";
import { toast } from "react-hot-toast";

const ExpenseModal = ({ isOpen, onClose, groupId, members, expense, onSuccess }) => {
  const isEdit = !!expense;
  const [form, setForm] = useState({ description: "", amount: "", paidBy: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (expense) {
      setForm({
        description: expense.description || "",
        amount: expense.amount || "",
        paidBy: expense.paidBy || "",
      });
    } else {
      setForm({ description: "", amount: "", paidBy: "" });
    }
    setError("");
  }, [expense, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description.trim()) { setError("Description is required."); return; }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) { setError("Enter a valid amount."); return; }
    if (!form.paidBy) { setError("Select who paid."); return; }
    setLoading(true);
    try {
      const payload = {
        description: form.description.trim(),
        amount: Number(form.amount),
        paidBy: Number(form.paidBy),
        groupId: Number(groupId),
      };
      if (isEdit) {
        await expenseService.update(expense.id, payload);
        toast.success("Expense updated!");
      } else {
        await expenseService.create(payload);
        toast.success("Expense added!");
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save expense.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { setForm({ description: "", amount: "", paidBy: "" }); setError(""); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEdit ? "Edit Expense" : "Add Expense"} size="sm">
      {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Description</label>
          <input
            type="text" value={form.description}
            onChange={(e) => { setForm(p => ({ ...p, description: e.target.value })); setError(""); }}
            placeholder="e.g. Dinner at restaurant" className="input-base"
          />
        </div>
        <div>
          <label className="label">Amount (₹)</label>
          <input
            type="number" min="0.01" step="0.01" value={form.amount}
            onChange={(e) => { setForm(p => ({ ...p, amount: e.target.value })); setError(""); }}
            placeholder="0.00" className="input-base"
          />
        </div>
        <div>
          <label className="label">Paid By</label>
          <select
            value={form.paidBy}
            onChange={(e) => { setForm(p => ({ ...p, paidBy: e.target.value })); setError(""); }}
            className="input-base bg-slate-900"
          >
            <option value="">Select member</option>
            {members.map((m) => (
              <option
                key={m.authUserId}
                value={m.authUserId}
              >
                {m.fullName || `User ${m.authUserId}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary text-sm">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary text-sm flex items-center gap-2">
            {loading && <Spinner size="sm" />}
            {isEdit ? "Update" : "Add Expense"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
