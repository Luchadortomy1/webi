import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import type { AdminNavItem } from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'

interface AdminLayoutProps {
  navItems?: AdminNavItem[]
  prefix?: string
}

const AdminLayout = ({ navItems, prefix }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-surface text-text flex">
      <AdminSidebar items={navItems} prefix={prefix} />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 px-4 py-6 xl:px-8 bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
