import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { GlobalHeader } from "./components/layout/GlobalHeader";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <GlobalHeader />
      {children}
    </div>
  );
}

function AppInner() {
  useTheme();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
