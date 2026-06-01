import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { profileService } from "../services/profileService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const [authRes, profileRes] = await Promise.all([
        authService.me(),
        profileService.getMe(),
      ]);
      setUser(authRes.data);
      setProfile(profileRes.data);
    } catch {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    localStorage.setItem("token", res.data.token);
    await fetchUser();
  };

  const register = async (data) => {
    const res = await authService.register(data);
    localStorage.setItem("token", res.data.token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    try {
      const res = await profileService.getMe();
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
