import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, UserPlus, Pencil, Trash2, ArrowRight, TrendingUp, TrendingDown, Receipt, Users } from "lucide-react";
import { groupService } from "../../services/groupService";
import { expenseService } from "../../services/expenseService";
import { toast } from "react-hot-toast";
import Avatar from "../../components/ui/Avatar";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AddMemberModal from "../../components/groups/AddMemberModal";
import ExpenseModal from "../../components/expenses/ExpenseModal";

const tabs = ["Expenses", "Balances", "Settlements", "Members"];

const formatCurrency = (n) => `₹${Math.abs(Number(n)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

const GroupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Expenses");
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteExpense, setDeleteExpense] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAll = async () => {
    try {
      const [grpRes, memRes, expRes, balRes, setRes] = await Promise.all([
        groupService.getById(id),
        groupService.getMembers(id),
        expenseService.getByGroup(id),
        expenseService.getBalances(id),
        expenseService.getSettlements(id),
      ]);
      setGroup(grpRes.data);
      setMembers(memRes.data || []);
      setExpenses(expRes.data || []);
      setBalances(balRes.data || []);
      setSettlements(setRes.data || []);
    } catch (err) {
      toast.error("Failed to load group data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [id]);

  const getMemberName = (userId) => {
  const m = members.find(
    (m) => m.authUserId === userId
  );

  return m?.fullName || `User ${userId}`;
};

  const handleDeleteExpense = async () => {
    setDeleteLoading(true);
    try {
      await expenseService.delete(deleteExpense.id);
      toast.success("Expense deleted.");
      setDeleteExpense(null);
      fetchAll();
    } catch { toast.error("Failed to delete expense."); }
    finally { setDeleteLoading(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Spinner size="lg" /></div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/groups")} className="btn-ghost p-2">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-2xl text-slate-100 truncate">{group?.name}</h1>
          <p className="text-slate-500 text-sm">{members.length} member{members.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAddMember(true)} className="btn-secondary text-sm flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> <span className="hidden sm:inline">Add Member</span>
          </button>
          <button onClick={() => { setEditExpense(null); setShowExpenseModal(true); }} className="btn-primary text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Expense</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab
                ? "bg-brand-500/20 text-brand-400 shadow-sm"
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-700/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Expenses Tab */}
      {activeTab === "Expenses" && (
        <div className="card overflow-hidden">
          {expenses.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No expenses yet"
              description="Add the first expense for this group"
              action={
                <button onClick={() => setShowExpenseModal(true)} className="btn-primary text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Expense
                </button>
              }
            />
          ) : (
            <div className="divide-y divide-slate-700/30">
              {expenses.map((exp) => (
                <div key={exp.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-700/20 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
                    <Receipt className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-200 truncate">{exp.description}</p>
                    <p className="text-xs text-slate-500">Paid by {getMemberName(exp.paidBy)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-brand-400">{formatCurrency(exp.amount)}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={() => { setEditExpense(exp); setShowExpenseModal(true); }}
                      className="p-1.5 rounded-lg hover:bg-slate-600 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteExpense(exp)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Balances Tab */}
      {activeTab === "Balances" && (
        <div className="space-y-3">
          {balances.length === 0 ? (
            <div className="card">
              <EmptyState icon={TrendingUp} title="No balances yet" description="Add expenses to see who owes what" />
            </div>
          ) : (
            balances.map((b) => {
              const isPositive = Number(b.balance) >= 0;
              
              return (
                <div key={b.userId} className="card p-5 flex items-center gap-4">
                  <Avatar name={getMemberName(b.userId)} size="md" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-200">{getMemberName(b.userId)}</p>
                    <p className="text-xs text-slate-500">ID: {b.userId}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${isPositive ? "text-brand-400" : "text-red-400"}`}>
                      {isPositive ? "+" : "-"}{formatCurrency(b.balance)}
                    </p>
                    <span className={isPositive ? "badge-green" : "badge-red"}>
                      {isPositive ? "Should Receive" : "Owes"}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPositive ? "bg-brand-500/15" : "bg-red-500/15"}`}>
                    {isPositive
                      ? <TrendingUp className="w-4 h-4 text-brand-400" />
                      : <TrendingDown className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Settlements Tab */}
      {activeTab === "Settlements" && (
        <div className="space-y-3">
          {settlements.length === 0 ? (
            <div className="card">
              <EmptyState icon={ArrowRight} title="All settled up!" description="No pending settlements for this group" />
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 px-1">Recommended settlement plan</p>
              {settlements.map((s) => (
                  <div
                    key={`${s.fromUserId}-${s.toUserId}`}
                    className="card p-5"
                  >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <Avatar name={getMemberName(s.fromUserId)} size="sm" />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-200 truncate">{getMemberName(s.fromUserId)}</p>
                        <p className="text-xs text-slate-500">needs to pay</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0 px-4">
                      <p className="font-bold text-brand-400 text-lg">{formatCurrency(s.amount)}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-slate-600" />
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <div className="w-8 h-px bg-slate-600" />
                      </div>
                    </div>
                    <div className="flex-1 flex items-center gap-3 justify-end min-w-0">
                      <div className="min-w-0 text-right">
                        <p className="font-semibold text-slate-200 truncate">{getMemberName(s.toUserId)}</p>
                        <p className="text-xs text-slate-500">receives</p>
                      </div>
                      <Avatar name={getMemberName(s.toUserId)} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Members Tab */}
      {activeTab === "Members" && (
        <div className="card overflow-hidden">
          {members.length === 0 ? (
            <EmptyState icon={Users} title="No members yet" description="Add members to split expenses"
              action={<button onClick={() => setShowAddMember(true)} className="btn-primary text-sm flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add Member</button>} />
          ) : (
            <div className="divide-y divide-slate-700/30">
              {members.map((m) => (
                <div key={m.authUserId} className="px-6 py-4 flex items-center gap-4">
                  <Avatar name={m.fullName || `User ${m.authUserId}`} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-200 truncate">{m.fullName || m.name || "Member"}</p>
                    <p className="text-xs text-slate-500">ID: {m.authUserId}</p>
                  </div>
                  <span className="badge-blue">Member</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <AddMemberModal isOpen={showAddMember} onClose={() => setShowAddMember(false)} groupId={id}
        onSuccess={() => { setShowAddMember(false); fetchAll(); }} />

      <ExpenseModal
        isOpen={showExpenseModal}
        onClose={() => { setShowExpenseModal(false); setEditExpense(null); }}
        groupId={id} members={members} expense={editExpense}
        onSuccess={() => { setShowExpenseModal(false); setEditExpense(null); fetchAll(); }}
      />

      <ConfirmDialog
        isOpen={!!deleteExpense} onClose={() => setDeleteExpense(null)} onConfirm={handleDeleteExpense}
        title="Delete Expense" message={`Delete "${deleteExpense?.description}"? This cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
};

export default GroupDetailPage;
