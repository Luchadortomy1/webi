import { Activity, CreditCard, KeyRound, LayoutDashboard, ShoppingBasket, Ticket, Users } from 'lucide-react'
import { FormEvent, useState } from 'react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

const Admin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gym, setGym] = useState('')
  const [planName, setPlanName] = useState('FitConnect Pro')
  const [planPrice, setPlanPrice] = useState('49.00')
  const [creating, setCreating] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleCreateGymAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback('')
    setCreating(true)

    // Normaliza a los roles permitidos en profiles (user | admin | gym_owner)
    const role = 'gym_owner'

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          gym,
          name,
          plan_name: planName,
          plan_price: planPrice,
        },
      },
    })

    setCreating(false)

    if (signUpError) {
      setFeedback(signUpError.message)
      return
    }

    // Si hay sesión inmediata (confirmación de email desactivada), crea el perfil al vuelo.
    const userId = signUpData.user?.id
    if (userId) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        full_name: name,
        email,
        role,
      })

      if (profileError) {
        setFeedback(`Usuario creado pero perfil falló: ${profileError.message}`)
        return
      }
    }

    setFeedback('Admin de gimnasio creado. Revisa el correo para confirmar acceso.')
    setName('')
    setEmail('')
    setPassword('')
    setGym('')
    setPlanName('FitConnect Pro')
    setPlanPrice('49.00')
  }

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

      <Card title="Gestión rápida" subtitle="Acciones SRS">
        <div className="flex flex-wrap gap-3 text-sm">
          <button className="pill bg-primary/15 text-primary border-primary/30">Crear usuario</button>
          <button className="pill bg-secondary/15 text-secondary border-secondary/30">Registrar gimnasio</button>
          <button className="pill bg-info/15 text-info border-info/30">Crear admin de gimnasio</button>
          <button className="pill bg-success/15 text-success border-success/30">Generar códigos</button>
          <button className="pill bg-warning/15 text-warning border-warning/30">Validar pago</button>
          <button className="pill bg-text-secondary/10 text-text border-border">Exportar CSV</button>
        </div>
      </Card>

      <Card title="Crear admin de gimnasio" subtitle="Crea usuarios con rol de administración de sede">
        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreateGymAdmin}>
          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="gym-name">
            Gimnasio
            <input
              id="gym-name"
              value={gym}
              onChange={(event) => setGym(event.target.value)}
              required
              placeholder="Powerhouse Downtown"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="admin-name">
            Nombre completo
            <input
              id="admin-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Ana Operaciones"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="admin-email">
            Correo
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@gym.com"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="plan-name">
            Plan vendido (SaaS)
            <input
              id="plan-name"
              value={planName}
              onChange={(event) => setPlanName(event.target.value)}
              required
              placeholder="FitConnect Pro"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="plan-price">
            Precio mensual (USD)
            <input
              id="plan-price"
              type="number"
              min="0"
              step="0.01"
              value={planPrice}
              onChange={(event) => setPlanPrice(event.target.value)}
              required
              placeholder="49.00"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="admin-password">
            Contraseña temporal
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={creating}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-background disabled:opacity-60"
            >
              {creating ? 'Creando…' : 'Crear admin'}
            </button>
            {feedback && <p className="text-sm text-text-secondary">{feedback}</p>}
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Admin
