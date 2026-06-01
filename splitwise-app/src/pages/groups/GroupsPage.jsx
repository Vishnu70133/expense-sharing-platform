import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { groupService } from "../../services/groupService";
import { toast } from "react-hot-toast";
import Avatar from "../../components/ui/Avatar";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import CreateGroupModal from "../../components/groups/CreateGroupModal";

const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchGroups = async () => {
    try {
      const res = await groupService.getMyGroups();
      setGroups(res.data || []);
    } catch { setGroups([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchGroups(); }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setEditLoading(true);
    try {
      await groupService.update(editGroup.id, { name: editName.trim() });
      toast.success("Group updated!");
      setEditGroup(null);
      fetchGroups();
    } catch { toast.error("Failed to update group."); }
    finally { setEditLoading(false); }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await groupService.delete(deleteGroup.id);
      toast.success("Group deleted.");
      setDeleteGroup(null);
      fetchGroups();
    } catch { toast.error("Failed to delete group."); }
    finally { setDeleteLoading(false); }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-100">My Groups</h1>
          <p className="text-slate-500 text-sm mt-0.5">{groups.length} group{groups.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> New Group
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Spinner size="lg" /></div>
      ) : groups.length === 0 ? (
        <div className="card">
          <EmptyState icon={Users} title="No groups yet" description="Create a group to start tracking shared expenses"
            action={<button onClick={() => setShowCreate(true)} className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Create Group</button>} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groups.map((g) => (
            <div key={g.id} className="card-hover p-5 cursor-pointer group" onClick={() => navigate(`/groups/${g.id}`)}>
              <div className="flex items-start gap-4">
                <Avatar name={g.name} size="md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{g.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Tap to view details</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); setEditGroup(g); setEditName(g.name); }}
                    className="p-1.5 rounded-lg hover:bg-slate-600 text-slate-400 hover:text-slate-200 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteGroup(g); }}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="badge-blue text-xs">Active</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateGroupModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); fetchGroups(); }} />

      <Modal isOpen={!!editGroup} onClose={() => setEditGroup(null)} title="Edit Group" size="sm">
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label className="label">Group Name</label>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="input-base" autoFocus />
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setEditGroup(null)} className="btn-secondary text-sm">Cancel</button>
            <button type="submit" disabled={editLoading} className="btn-primary text-sm flex items-center gap-2">
              {editLoading && <Spinner size="sm" />} Save Changes
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteGroup} onClose={() => setDeleteGroup(null)} onConfirm={handleDelete}
        title="Delete Group" message={`Are you sure you want to delete "${deleteGroup?.name}"? All expenses will be lost.`}
        loading={deleteLoading}
      />
    </div>
  );
};

export default GroupsPage;
