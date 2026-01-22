import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Routines from './pages/Routines'
import Store from './pages/Store'
import Gyms from './pages/Gyms'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/store" element={<Store />} />
        <Route path="/gyms" element={<Gyms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
