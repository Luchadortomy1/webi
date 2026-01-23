import { Navigate, Route, Routes } from 'react-router-dom'
import { BarChart3, Building2, CreditCard, Layers, Settings, Ticket, Users, Waypoints } from 'lucide-react'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Admin from './pages/Admin'
import AdminUsers from './pages/AdminUsers'
import AdminGyms from './pages/AdminGyms'
import AdminPayments from './pages/AdminPayments'
import AdminPlans from './pages/AdminPlans'
import AdminSubscriptions from './pages/AdminSubscriptions'
import AdminSettings from './pages/AdminSettings'
import GymPortal from './pages/GymPortal'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import type { AdminNavItem } from './components/AdminSidebar'

const App = () => {
  const gymAdminNav: AdminNavItem[] = [
    { label: 'Portal', to: '', icon: Building2 },
    { label: 'Suscripciones', to: 'subscriptions', icon: Ticket },
  ]

  const superAdminNav: AdminNavItem[] = [
    { label: 'Overview', to: '', icon: BarChart3 },
    { label: 'Usuarios', to: 'users', icon: Users },
    { label: 'Gimnasios', to: 'gyms', icon: Layers },
    { label: 'Planes', to: 'plans', icon: Waypoints },
    { label: 'Suscripciones', to: 'subscriptions', icon: Ticket },
    { label: 'Pagos', to: 'payments', icon: CreditCard },
    { label: 'Ajustes', to: 'settings', icon: Settings },
  ]

  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/sa"
        element={
          <RequireAuth allowedRoles={['superadmin']}>
            <AdminLayout prefix="/sa" navItems={superAdminNav} />
          </RequireAuth>
        }
      >
=======
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
>>>>>>> 26ad93db39ab1f03a3fdfd36f05c9e73407c0604
        <Route index element={<Admin />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="gyms" element={<AdminGyms />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="subscriptions" element={<AdminSubscriptions />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RequireAuth allowedRoles={['admin', 'superadmin']}>
            <AdminLayout prefix="/admin" navItems={gymAdminNav} />
          </RequireAuth>
        }
      >
        <Route index element={<GymPortal />} />
        <Route path="subscriptions" element={<AdminSubscriptions />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
