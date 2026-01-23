import type { ComponentType } from 'react'
import { BarChart3, Building2, CreditCard, KeyRound, Layers, Settings, ShoppingBasket, Ticket, Users, Waypoints, Workflow } from 'lucide-react'
import { NavLink } from 'react-router-dom'

<<<<<<< HEAD
export type AdminNavItem = { label: string; to: string; icon: ComponentType<{ size?: number }> }

const adminNav: AdminNavItem[] = [
  { label: 'Overview', to: '', icon: BarChart3 },
  { label: 'Usuarios', to: 'users', icon: Users },
  { label: 'Gimnasios', to: 'gyms', icon: Layers },
  { label: 'Portal gimnasio', to: 'gym-portal', icon: Building2 },
  { label: 'Planes', to: 'plans', icon: Waypoints },
  { label: 'Códigos', to: 'codes', icon: KeyRound },
  { label: 'Productos', to: 'products', icon: ShoppingBasket },
  { label: 'Pedidos', to: 'orders', icon: Workflow },
  { label: 'Suscripciones', to: 'subscriptions', icon: Ticket },
  { label: 'Pagos', to: 'payments', icon: CreditCard },
  { label: 'Ajustes', to: 'settings', icon: Settings },
=======
const adminNav = [
  { label: 'Overview', to: '/admin', icon: BarChart3 },
  { label: 'Usuarios', to: '/admin/users', icon: Users },
  { label: 'Gimnasios', to: '/admin/gyms', icon: Layers },
  { label: 'Planes', to: '/admin/plans', icon: Waypoints },
  { label: 'Códigos', to: '/admin/codes', icon: KeyRound },
  { label: 'Productos', to: '/admin/products', icon: ShoppingBasket },
  { label: 'Pedidos', to: '/admin/orders', icon: Workflow },
  { label: 'Suscripciones', to: '/admin/subscriptions', icon: Ticket },
  { label: 'Pagos', to: '/admin/payments', icon: CreditCard },
  { label: 'Ajustes', to: '/admin/settings', icon: Settings },
>>>>>>> 26ad93db39ab1f03a3fdfd36f05c9e73407c0604
]

interface AdminSidebarProps {
  items?: AdminNavItem[]
  prefix?: string
}

const normalize = (path?: string) => {
  if (!path) return ''
  return path.endsWith('/') ? path.slice(0, -1) : path
}

const AdminSidebar = ({ items = adminNav, prefix = '' }: AdminSidebarProps) => {
  const base = normalize(prefix)

  const buildPath = (to: string) => {
    const clean = to.replace(/^\/+/, '')
    if (clean === '') return base || '/'
    return base ? `${base}/${clean}` : `/${clean}`
  }

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 bg-surface border-r border-border px-6 py-8">
      <div className="flex items-center gap-2 text-xl font-bold text-text">
        <div className="h-10 w-10 rounded-2xl bg-error/15 flex items-center justify-center text-error font-black">
          ADM
        </div>
        <div>
          <div>FitConnect Admin</div>
          <p className="text-xs text-text-secondary">Control de operación</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={buildPath(to)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors border border-transparent ${
                isActive
                  ? 'bg-error/10 text-error border-error/30 shadow-soft'
                  : 'text-text-secondary hover:text-text hover:border-border'
              }`
            }
<<<<<<< HEAD
            end={to === ''}
=======
            end={to === '/admin'}
>>>>>>> 26ad93db39ab1f03a3fdfd36f05c9e73407c0604
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}

export default AdminSidebar
