import { Activity, CreditCard, KeyRound, LayoutDashboard, ShoppingBasket, Ticket, Users } from 'lucide-react'
import Card from '../components/Card'

const Admin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Panel administrativo (GRTECH / gimnasios)</p>
          <h1 className="text-2xl font-bold">Control operativo</h1>
        </div>
        <span className="pill bg-error/15 text-error border-error/30">Acceso restringido</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Usuarios" subtitle="Activos / bloqueados" action={<span className="pill">+3% semana</span>}>
          <p className="text-3xl font-bold">12,430</p>
        </Card>
        <Card title="Gimnasios" subtitle="Registrados" action={<KeyRound size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">128</p>
        </Card>
        <Card title="Suscripciones" subtitle="Planes vigentes" action={<Ticket size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">3,240</p>
        </Card>
        <Card title="Ingresos pruebas" subtitle="Pagos sandbox" action={<CreditCard size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">$84k</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Alertas" subtitle="Validaciones y riesgos">
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• KYC pendientes: 14</li>
            <li>• Pagos en disputa: 3</li>
            <li>• Códigos agotándose: 2 gimnasios</li>
          </ul>
        </Card>
        <Card title="Órdenes" subtitle="Estado actual" action={<Activity size={16} className="text-text-secondary" />}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Borrador</span><span className="font-semibold">34</span></div>
            <div className="flex justify-between"><span>Pagado (sandbox)</span><span className="font-semibold">128</span></div>
            <div className="flex justify-between"><span>Revisión</span><span className="font-semibold">5</span></div>
          </div>
        </Card>
        <Card title="Stock crítico" subtitle="Productos en bajo inventario" action={<ShoppingBasket size={16} className="text-text-secondary" />}>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>Creatina 300g — 12 unidades</p>
            <p>Pre-workout — 8 unidades</p>
            <p>Shaker XL — 5 unidades</p>
          </div>
        </Card>
      </div>

      <Card title="Gestión rápida" subtitle="Acciones SRS">
        <div className="flex flex-wrap gap-3 text-sm">
          <button className="pill bg-primary/15 text-primary border-primary/30">Crear usuario</button>
          <button className="pill bg-secondary/15 text-secondary border-secondary/30">Registrar gimnasio</button>
          <button className="pill bg-success/15 text-success border-success/30">Generar códigos</button>
          <button className="pill bg-warning/15 text-warning border-warning/30">Validar pago</button>
          <button className="pill bg-text-secondary/10 text-text border-border">Exportar CSV</button>
        </div>
      </Card>
    </div>
  )
}

export default Admin
