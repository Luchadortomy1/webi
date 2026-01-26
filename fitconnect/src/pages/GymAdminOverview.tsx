import { Activity, CreditCard, Users } from 'lucide-react'
import Card from '../components/Card'

const GymAdminOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Panel del gimnasio</p>
          <h1 className="text-2xl font-bold">Resumen operativo</h1>
        </div>
        <span className="pill bg-primary/15 text-primary border-primary/30">Admin</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Miembros activos" subtitle="Usuarios con acceso" action={<Users size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">428</p>
          <p className="text-sm text-success">+12 esta semana</p>
        </Card>
        <Card title="Suscripciones" subtitle="Planes vigentes" action={<Activity size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">312</p>
          <p className="text-sm text-text-secondary">84 pruebas • 18 vencidas</p>
        </Card>
        <Card title="Ventas tienda" subtitle="Últimos 30 días" action={<CreditCard size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">$6,420</p>
          <p className="text-sm text-success">+8% vs. mes anterior</p>
        </Card>
        <Card title="Ocupación" subtitle="Hora pico" action={<Activity size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">78%</p>
          <p className="text-sm text-text-secondary">Capacidad en la tarde</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Alertas" subtitle="Lo que necesita atención">
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• 5 membresías vencen hoy</li>
            <li>• 2 pagos en revisión</li>
            <li>• Stock bajo: Creatina, Shaker XL</li>
          </ul>
        </Card>
        <Card title="Próximos cobros" subtitle="Renovaciones esta semana">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Plan Mensual</span><span className="font-semibold">$1,240</span></div>
            <div className="flex justify-between"><span>Plan Trimestral</span><span className="font-semibold">$980</span></div>
            <div className="flex justify-between"><span>Trials</span><span className="font-semibold">12 usuarios</span></div>
          </div>
        </Card>
        <Card title="Tareas rápidas" subtitle="Acciones diarias">
          <div className="flex flex-wrap gap-3 text-sm">
            <button className="pill bg-primary/15 text-primary border-primary/30">Crear código</button>
            <button className="pill bg-secondary/15 text-secondary border-secondary/30">Agregar clase</button>
            <button className="pill bg-success/15 text-success border-success/30">Marcar pago</button>
            <button className="pill bg-text-secondary/10 text-text border-border">Exportar CSV</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default GymAdminOverview
