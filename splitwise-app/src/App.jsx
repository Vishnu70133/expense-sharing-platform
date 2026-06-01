import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import GroupsPage from "./pages/groups/GroupsPage";
import GroupDetailPage from "./pages/groups/GroupDetailPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid #334155",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#052e16" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/groups/:id" element={<GroupDetailPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
