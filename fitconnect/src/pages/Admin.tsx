import { BarChart3, LayoutDashboard, Users, Warehouse } from 'lucide-react'
import Card from '../components/Card'

const Admin = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Panel Admin</p>
          <h1 className="text-2xl font-bold">Operaciones y métricas</h1>
        </div>
        <span className="pill bg-error/15 text-error border-error/30">Solo web</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Usuarios" subtitle="Total activos" action={<span className="pill">+3% semanal</span>}>
          <p className="text-3xl font-bold">12,430</p>
        </Card>
        <Card title="Productos" subtitle="Stock vivo" action={<Warehouse size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">184</p>
        </Card>
        <Card title="Suscripciones" subtitle="Gimnasios" action={<LayoutDashboard size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">38</p>
        </Card>
        <Card title="Métricas" subtitle="Ingresos MTD" action={<BarChart3 size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">$84k</p>
        </Card>
      </div>

      <Card title="Gestión rápida" subtitle="Acciones clave">
        <div className="flex flex-wrap gap-3 text-sm">
          <button className="pill bg-primary/15 text-primary border-primary/30">Crear usuario</button>
          <button className="pill bg-secondary/15 text-secondary border-secondary/30">Añadir producto</button>
          <button className="pill bg-success/15 text-success border-success/30">Validar pago</button>
          <button className="pill bg-warning/15 text-warning border-warning/30">Alertas stock</button>
        </div>
      </Card>
    </div>
  )
}

export default Admin
