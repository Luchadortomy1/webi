import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Admin from './pages/Admin'
import AdminUsers from './pages/AdminUsers'
import AdminProducts from './pages/AdminProducts'
import AdminGyms from './pages/AdminGyms'
import AdminPayments from './pages/AdminPayments'
import AdminPlans from './pages/AdminPlans'
import AdminCodes from './pages/AdminCodes'
import AdminOrders from './pages/AdminOrders'
import AdminSubscriptions from './pages/AdminSubscriptions'
import AdminSettings from './pages/AdminSettings'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="gyms" element={<AdminGyms />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="codes" element={<AdminCodes />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="subscriptions" element={<AdminSubscriptions />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
