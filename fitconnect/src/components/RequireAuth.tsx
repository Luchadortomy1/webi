import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../providers/AuthProvider'

interface RequireAuthProps {
  children: ReactNode
  allowedRoles?: Array<'superadmin' | 'admin'>
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, role, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-secondary">
        Cargando sesión...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default RequireAuth
