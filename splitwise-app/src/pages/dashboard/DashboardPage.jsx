import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, ArrowRight, TrendingUp, Receipt } from "lucide-react";
import { groupService } from "../../services/groupService";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/ui/Avatar";
import EmptyState from "../../components/ui/EmptyState";
import Spinner from "../../components/ui/Spinner";
import CreateGroupModal from "../../components/groups/CreateGroupModal";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-display font-bold text-slate-100">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const fetchGroups = async () => {
    try {
      const res = await groupService.getMyGroups();
      setGroups(res.data || []);
    } catch {
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGroups(); }, []);

  const recentGroups = groups.slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-100">
            Good day, {profile?.fullName?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Here's your expense overview</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Group</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Groups" value={groups.length} color="bg-brand-500/15 text-brand-400" />
        <StatCard icon={Receipt} label="Active Groups" value={groups.length} color="bg-blue-500/15 text-blue-400" />
        <StatCard icon={TrendingUp} label="Member Of" value={groups.length} color="bg-purple-500/15 text-purple-400" />
      </div>

      {/* Recent Groups */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <h2 className="section-title">Recent Groups</h2>
          <button onClick={() => navigate("/groups")} className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : recentGroups.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No groups yet"
            description="Create your first group to start splitting expenses"
            action={
              <button onClick={() => setShowCreate(true)} className="btn-primary text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Group
              </button>
            }
          />
        ) : (
          <div className="divide-y divide-slate-700/30">
            {recentGroups.map((g) => (
              <div
                key={g.id}
                onClick={() => navigate(`/groups/${g.id}`)}
                className="px-6 py-4 flex items-center gap-4 hover:bg-slate-700/20 cursor-pointer transition-colors"
              >
                <Avatar name={g.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-200 truncate">{g.name}</p>
                  <p className="text-xs text-slate-500">Tap to view expenses</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="section-title mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Create Group", icon: Users, action: () => setShowCreate(true), color: "text-brand-400" },
            { label: "View Groups", icon: Receipt, action: () => navigate("/groups"), color: "text-blue-400" },
            { label: "My Profile", icon: TrendingUp, action: () => navigate("/profile"), color: "text-purple-400" },
          ].map(({ label, icon: Icon, action, color }) => (
            <button key={label} onClick={action}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/60 transition-all duration-200 border border-slate-700/50 hover:border-slate-600 group">
              <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <CreateGroupModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); fetchGroups(); }} />
    </div>
  );
};

export default DashboardPage;
