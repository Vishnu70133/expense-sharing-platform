import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Receipt, User, LogOut, DollarSign, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/ui/Avatar";
import { toast } from "react-hot-toast";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/groups", icon: Users, label: "Groups" },
  { to: "/profile", icon: User, label: "Profile" },
];

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
      <DollarSign className="w-4 h-4 text-white" />
    </div>
    <span className="font-display font-bold text-slate-100 text-lg">SplitEase</span>
  </div>
);

export const Sidebar = ({ onClose }) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-slate-700/50">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => isActive ? "sidebar-link-active" : "sidebar-link"}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-slate-700/50">
        {profile && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Avatar name={profile.fullName || profile.email} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{profile.fullName || "User"}</p>
              <p className="text-xs text-slate-500 truncate">{profile.email}</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const AppLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-slate-800/50 border-r border-slate-700/50 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-slate-800 border-r border-slate-700/50 animate-slide-in">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 btn-ghost p-1.5">
              <X className="w-4 h-4" />
            </button>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="btn-ghost p-2">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-slate-100">SplitEase</span>
          </div>
          <div className="w-9" />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
