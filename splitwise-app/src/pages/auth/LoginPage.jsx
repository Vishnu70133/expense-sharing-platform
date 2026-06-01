import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DollarSign, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill all fields."); return; }
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-mesh-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center mb-4 shadow-glow-green">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-100 mb-1">SplitEase</h1>
          <p className="text-slate-500 text-sm">Sign in to your account</p>
        </div>

        <div className="card p-6">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com"
                className="input-base"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} name="password" value={form.password}
                  onChange={handleChange} placeholder="••••••••"
                  className="input-base pr-11"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading && <Spinner size="sm" />}
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
