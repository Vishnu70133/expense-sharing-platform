import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";
import { profileService } from "../../services/profileService";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import Spinner from "../../components/ui/Spinner";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const Section = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
          <span className="font-semibold text-slate-200">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>
      {open && <div className="px-6 pb-6 pt-2 border-t border-slate-700/50">{children}</div>}
    </div>
  );
};

const ProfilePage = () => {
  const { profile, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" });
  const [profileLoading, setProfileLoading] = useState(false);

  const [emailForm, setEmailForm] = useState({ newEmail: "" });
  const [emailLoading, setEmailLoading] = useState(false);

  const [passForm, setPassForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [passLoading, setPassLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileForm({ fullName: profile.fullName || "", phone: profile.phone || "" });
      setEmailForm({ newEmail: profile.email || "" });
    }
  }, [profile]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      await profileService.updateMe({ fullName: profileForm.fullName, phone: profileForm.phone });
      await refreshProfile();
      toast.success("Profile updated!");
    } catch { toast.error("Failed to update profile."); }
    finally { setProfileLoading(false); }
  };

  const handleEmailSave = async (e) => {
    e.preventDefault();
    if (!emailForm.newEmail.includes("@")) { toast.error("Enter a valid email."); return; }
    setEmailLoading(true);
    try {
      await authService.updateEmail({ newEmail: emailForm.newEmail });
      await refreshProfile();
      toast.success("Email updated!");
    } catch { toast.error("Failed to update email."); }
    finally { setEmailLoading(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passForm.newPassword.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    if (passForm.newPassword !== passForm.confirmPassword) { toast.error("Passwords do not match."); return; }
    setPassLoading(true);
    try {
      await authService.updatePassword({ oldPassword: passForm.oldPassword, newPassword: passForm.newPassword });
      setPassForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password changed!");
    } catch { toast.error("Failed to change password."); }
    finally { setPassLoading(false); }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await profileService.deleteMe();
      logout();
      toast.success("Account deleted.");
      navigate("/login");
    } catch { toast.error("Failed to delete account."); }
    finally { setDeleteLoading(false); }
  };

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto animate-fade-in">
      {/* Profile header */}
      <div className="card p-6 flex items-center gap-5">
        <Avatar name={profile?.fullName || profile?.email || "?"} size="xl" />
        <div>
          <h1 className="font-display font-bold text-xl text-slate-100">{profile?.fullName || "Your Profile"}</h1>
          <p className="text-slate-500">{profile?.email}</p>
          <p className="text-xs text-slate-600 mt-1">User ID: {profile?.id}</p>
        </div>
      </div>

      {/* Edit Profile */}
      <Section title="Edit Profile" icon={User} defaultOpen>
        <form onSubmit={handleProfileSave} className="space-y-4 mt-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" value={profileForm.fullName}
              onChange={(e) => setProfileForm(p => ({ ...p, fullName: e.target.value }))}
              placeholder="Your full name" className="input-base" />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input type="tel" value={profileForm.phone}
              onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="10-digit number" className="input-base" />
          </div>
          <button type="submit" disabled={profileLoading} className="btn-primary text-sm flex items-center gap-2">
            {profileLoading ? <Spinner size="sm" /> : <Save className="w-4 h-4" />} Save Changes
          </button>
        </form>
      </Section>

      {/* Change Email */}
      <Section title="Change Email" icon={Mail}>
        <form onSubmit={handleEmailSave} className="space-y-4 mt-4">
          <div>
            <label className="label">New Email</label>
            <input type="email" value={emailForm.newEmail}
              onChange={(e) => setEmailForm({ newEmail: e.target.value })}
              placeholder="new@email.com" className="input-base" />
          </div>
          <button type="submit" disabled={emailLoading} className="btn-primary text-sm flex items-center gap-2">
            {emailLoading ? <Spinner size="sm" /> : <Save className="w-4 h-4" />} Update Email
          </button>
        </form>
      </Section>

      {/* Change Password */}
      <Section title="Change Password" icon={Lock}>
        <form onSubmit={handlePasswordSave} className="space-y-4 mt-4">
          <div>
            <label className="label">Current Password</label>
            <input type="password" value={passForm.oldPassword}
              onChange={(e) => setPassForm(p => ({ ...p, oldPassword: e.target.value }))}
              placeholder="••••••••" className="input-base" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" value={passForm.newPassword}
              onChange={(e) => setPassForm(p => ({ ...p, newPassword: e.target.value }))}
              placeholder="Min. 6 characters" className="input-base" />
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input type="password" value={passForm.confirmPassword}
              onChange={(e) => setPassForm(p => ({ ...p, confirmPassword: e.target.value }))}
              placeholder="••••••••" className="input-base" />
          </div>
          <button type="submit" disabled={passLoading} className="btn-primary text-sm flex items-center gap-2">
            {passLoading ? <Spinner size="sm" /> : <Lock className="w-4 h-4" />} Change Password
          </button>
        </form>
      </Section>

      {/* Danger Zone */}
      <div className="card p-6 border-red-500/20 bg-red-500/5">
        <h3 className="font-semibold text-red-400 mb-1 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Danger Zone
        </h3>
        <p className="text-sm text-slate-500 mb-4">Permanently delete your account and all data. This cannot be undone.</p>
        <button onClick={() => setShowDelete(true)} className="btn-danger text-sm flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Delete Account
        </button>
      </div>

      <ConfirmDialog
        isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDeleteAccount}
        title="Delete Account" message="This will permanently delete your account and all associated data. Are you absolutely sure?"
        confirmLabel="Delete Account" loading={deleteLoading}
      />
    </div>
  );
};

export default ProfilePage;
