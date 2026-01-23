import { BarChart3, CreditCard, KeyRound, Layers, Settings, ShoppingBasket, Ticket, Users, Waypoints, Workflow } from 'lucide-react'
import { NavLink } from 'react-router-dom'

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
]

const AdminSidebar = () => {
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
        {adminNav.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors border border-transparent ${
                isActive
                  ? 'bg-error/10 text-error border-error/30 shadow-soft'
                  : 'text-text-secondary hover:text-text hover:border-border'
              }`
            }
            end={to === '/admin'}
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
