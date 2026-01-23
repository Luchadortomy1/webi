import { Building2, MapPin, Navigation, Package, ShieldCheck, Store, Users, Wifi } from 'lucide-react'
import Card from '../components/Card'

const GymPortal = () => {
  const gym = {
    name: 'Powerhouse Roma',
    owner: 'Laura Díaz (admin del gym)',
    status: 'Operativo',
    zone: 'CDMX · Roma / Condesa',
    lastSync: 'Hace 5 min',
    establishments: 3,
    subs: 1240,
    tickets: '$48.2k MXN',
    products: 26,
  }

  const locations = [
    {
      name: 'Roma Norte',
      address: 'Querétaro 82, Roma Norte',
      latlng: '19.4163, -99.1638',
      radius: '1.2 km',
      status: 'Activo',
      capacity: 320,
    },
    {
      name: 'Condesa',
      address: 'Tamaulipas 150, Condesa',
      latlng: '19.4121, -99.1752',
      radius: '900 m',
      status: 'Activo',
      capacity: 210,
    },
    {
      name: 'Del Valle',
      address: 'Pilares 1124, Del Valle',
      latlng: '19.3795, -99.1629',
      radius: '1.4 km',
      status: 'Revisión',
      capacity: 260,
    },
  ]

  const plans = [
    { name: 'Mensual', price: '$35', scope: 'Todas las sedes', status: 'Activo' },
    { name: 'Trimestral', price: '$90', scope: 'Roma / Condesa', status: 'Activo' },
    { name: 'Pruebas 7 días', price: '$0', scope: 'Solo app', status: 'Pruebas' },
  ]

  const catalog = [
    { name: 'Proteína aislada 1kg', sku: 'PF-101', stock: 84, price: '$32.00' },
    { name: 'Pre-workout cítrico', sku: 'IG-889', stock: 22, price: '$24.90' },
    { name: 'Shaker térmico', sku: 'SH-443', stock: 45, price: '$16.50' },
  ]

  const checklist = [
    { label: 'Ubicaciones creadas con geocerca', done: true },
    { label: 'Planes publicados', done: true },
    { label: 'Productos visibles en tienda', done: true },
    { label: 'Pasarela conectada', done: false },
    { label: 'Staff invitado', done: false },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Portal de gimnasio</p>
          <h1 className="text-2xl font-bold">{gym.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <span className="pill bg-success/15 text-success border-success/30">{gym.status}</span>
            <span className="pill bg-background border border-border">{gym.zone}</span>
            <span className="pill bg-background border border-border">{gym.owner}</span>
            <span className="pill bg-background border border-border">Sincronizado: {gym.lastSync}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text">Invitar staff</button>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-background">Nuevo establecimiento</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Establecimientos" subtitle="Operando / en revisión" action={<span className="pill bg-success/15 text-success border-success/30">{gym.establishments}</span>}>
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>Sedes activas</span>
            <span className="font-semibold text-text">2 / 3</span>
          </div>
        </Card>
        <Card title="Subscripciones" subtitle="Usuarios ligados al gym" action={<Users size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">{gym.subs}</p>
          <p className="text-xs text-text-secondary">Corte mensual · pruebas</p>
        </Card>
        <Card title="Catálogo" subtitle="Productos y add-ons" action={<Package size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">{gym.products}</p>
          <p className="text-xs text-text-secondary">Ventas en tienda del gym</p>
        </Card>
        <Card title="Facturación" subtitle="Últimos 30 días" action={<Store size={16} className="text-text-secondary" />}>
          <p className="text-3xl font-bold">{gym.tickets}</p>
          <p className="text-xs text-text-secondary">Incluye sandbox</p>
        </Card>
      </div>

      <Card
        title="Mapa y sedes"
        subtitle="Define cada establecimiento, radio de servicio y ubicación para geolocalización"
        action={<button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text">Exportar KML</button>}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="relative h-72 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute inset-8 rounded-[32px] border border-border/70" />
              <div className="absolute left-10 top-10 h-4 w-4 rounded-full bg-error shadow-[0_0_0_12px_rgba(255,61,0,0.2)]" />
              <div className="absolute left-40 top-24 h-3 w-3 rounded-full bg-success shadow-[0_0_0_10px_rgba(16,185,129,0.25)]" />
              <div className="absolute right-16 bottom-16 h-3 w-3 rounded-full bg-warning shadow-[0_0_0_10px_rgba(234,179,8,0.25)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0,transparent_45%)]" />
            </div>
            <div className="absolute left-4 top-4 rounded-xl bg-background/80 px-3 py-2 text-xs text-text-secondary border border-border">
              Geolocalización activa · 3 sedes
            </div>
            <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-xl bg-background/80 px-3 py-2 text-xs border border-border">
              <Navigation size={14} className="text-text-secondary" />
              <span>Radio ajustable por sede</span>
            </div>
          </div>

          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded-2xl border border-border bg-background p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">{loc.name}</p>
                    <p className="text-xs text-text-secondary">{loc.address}</p>
                  </div>
                  <span className={`pill text-xs ${loc.status === 'Activo' ? 'bg-success/15 text-success border-success/30' : 'bg-warning/15 text-warning border-warning/30'}`}>
                    {loc.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
                  <span className="pill bg-background border border-border"><MapPin size={12} /> {loc.latlng}</span>
                  <span className="pill bg-background border border-border">Radio {loc.radius}</span>
                  <span className="pill bg-background border border-border">Capacidad {loc.capacity} personas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Planes y subs" subtitle="Planes publicados por el gym">
          <div className="space-y-3 text-sm">
            {plans.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2">
                <div>
                  <p className="font-semibold text-text">{plan.name}</p>
                  <p className="text-xs text-text-secondary">{plan.scope}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{plan.price}</p>
                  <span className={`pill text-xs ${plan.status === 'Activo' ? 'bg-success/15 text-success border-success/30' : 'bg-info/15 text-info border-info/30'}`}>
                    {plan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Catálogo del gym" subtitle="Productos y add-ons que controla el gimnasio">
          <div className="space-y-3 text-sm">
            {catalog.map((item) => (
              <div key={item.sku} className="rounded-xl border border-border bg-background p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-text">{item.name}</p>
                  <span className="text-xs text-text-secondary">SKU {item.sku}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Stock: {item.stock}</span>
                  <span className="text-sm font-semibold text-text">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Checklist operativo" subtitle="Lo mínimo para que el gym opere solo">
          <div className="space-y-2 text-sm">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2">
                <span className="text-text-secondary">{item.label}</span>
                <span className={`pill text-xs ${item.done ? 'bg-success/15 text-success border-success/30' : 'bg-warning/15 text-warning border-warning/30'}`}>
                  {item.done ? 'Listo' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Seguridad e integraciones" subtitle="Controles que puede gestionar el gimnasio" className="border-dashed">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 text-sm">
          <div className="rounded-xl border border-border bg-background p-3 flex items-start gap-3">
            <ShieldCheck className="text-success" size={18} />
            <div>
              <p className="font-semibold text-text">Permisos de staff</p>
              <p className="text-text-secondary">Roles: recepcionista, coach, gerente. Accesos por sede.</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-3 flex items-start gap-3">
            <Wifi className="text-primary" size={18} />
            <div>
              <p className="font-semibold text-text">Pasarela y POS</p>
              <p className="text-text-secondary">Sandbox activo · conecta tu terminal física o link de pago.</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-3 flex items-start gap-3">
            <Building2 className="text-secondary" size={18} />
            <div>
              <p className="font-semibold text-text">Control por establecimiento</p>
              <p className="text-text-secondary">Horarios, aforo, precios locales y avisos de mantenimiento.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GymPortal
