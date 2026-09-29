import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import useAuth from './hooks/useAuth.js'

function App() {
  const { isAuthenticated } = useAuth()
  const defaultRoute = isAuthenticated ? '/dashboard' : '/login'

  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  )
}

export default App
