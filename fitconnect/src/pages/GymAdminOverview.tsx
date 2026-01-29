import { useEffect, useMemo, useState } from 'react'
import { Activity, CreditCard, Loader2, Users } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type MonthlySeries = { labels: string[]; data: number[] }

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const getLastMonths = (count: number) => {
  const now = new Date()
  const months: { label: string; key: string }[] = []
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ label: `${monthNames[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`, key: `${date.getFullYear()}-${date.getMonth()}` })
  }
  return months
}

const rollupByMonth = (rows: { created_at: string | null }[]): MonthlySeries => {
  const months = getLastMonths(6)
  const counter = months.reduce<Record<string, number>>((acc, m) => ({ ...acc, [m.key]: 0 }), {})
  rows.forEach((row) => {
    if (!row.created_at) return
    const d = new Date(row.created_at)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (counter[key] !== undefined) counter[key] += 1
  })
  return { labels: months.map((m) => m.label), data: months.map((m) => counter[m.key] ?? 0) }
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (!data.length) return <p className="text-sm text-text-secondary">Sin datos</p>
  const max = Math.max(...data, 1)
  const points = data.map((value, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * 100
    const y = 32 - (value / max) * 32
    return `${x},${y}`
  })
  return (
    <svg viewBox="0 0 100 32" className="w-full h-24" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={points.join(' ')} />
    </svg>
  )
}

const GymAdminOverview = () => {
  const [gymId, setGymId] = useState<string | null>(null)
  const [memberCount, setMemberCount] = useState(0)
  const [activeSubs, setActiveSubs] = useState(0)
  const [salesAmount, setSalesAmount] = useState(0)
  const [userSeries, setUserSeries] = useState<MonthlySeries>({ labels: [], data: [] })
  const [subSeries, setSubSeries] = useState<MonthlySeries>({ labels: [], data: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const lastMonths = useMemo(() => getLastMonths(6), [])

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const { data: auth } = await supabase.auth.getUser()
        const userId = auth.user?.id
        if (!userId) throw new Error('No hay sesión activa')

        const { data: profile, error: profileError } = await supabase.from('profiles').select('gym, gym_id').eq('id', userId).single()
        if (profileError) throw profileError
        const currentGymId = (profile as { gym?: string; gym_id?: string })?.gym_id ?? (profile as { gym?: string })?.gym
        if (!currentGymId) throw new Error('El perfil no tiene gimnasio asignado')
        if (!active) return
        setGymId(currentGymId)

        const since = new Date()
        since.setMonth(since.getMonth() - 5, 1)
        since.setHours(0, 0, 0, 0)

        const [membersRes, subsRes, salesRes, usersSeriesRes, subsSeriesRes] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('gym_id', currentGymId).eq('role', 'user'),
          supabase.from('subscriptions').select('id', { count: 'exact', head: true }).eq('gym_id', currentGymId).eq('status', 'Activa'),
          supabase.from('payments').select('amount').eq('gym_id', currentGymId).gte('created_at', since.toISOString()),
          supabase.from('profiles').select('created_at').eq('gym_id', currentGymId).eq('role', 'user').gte('created_at', since.toISOString()),
          supabase.from('subscriptions').select('created_at').eq('gym_id', currentGymId).gte('created_at', since.toISOString()),
        ])

        if (!active) return
        setMemberCount(membersRes.count ?? 0)
        setActiveSubs(subsRes.count ?? 0)
        const salesTotal = (salesRes.data ?? []).reduce((acc, row) => acc + (typeof row.amount === 'number' ? row.amount : Number(row.amount ?? 0)), 0)
        setSalesAmount(salesTotal)
        setUserSeries(rollupByMonth(usersSeriesRes.data ?? []))
        setSubSeries(rollupByMonth(subsSeriesRes.data ?? []))

        const firstError = [membersRes.error, subsRes.error, salesRes.error, usersSeriesRes.error, subsSeriesRes.error].find(Boolean)
        if (firstError) setError(firstError.message)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los datos')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Panel del gimnasio</p>
          <h1 className="text-2xl font-bold">Resumen operativo</h1>
          {gymId && <p className="text-xs text-text-secondary mt-1">Gym: {gymId}</p>}
        </div>
        <span className="pill bg-primary/15 text-primary border-primary/30">Admin</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Miembros activos" subtitle="Usuarios con acceso" action={<Users size={16} className="text-text-secondary" />}>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{loading ? '…' : memberCount}</p>
            {!loading && memberCount === 0 && <span className="text-sm text-text-secondary">Sin datos</span>}
          </div>
        </Card>
        <Card title="Suscripciones activas" subtitle="Planes vigentes" action={<Activity size={16} className="text-text-secondary" />}>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{loading ? '…' : activeSubs}</p>
            {!loading && activeSubs === 0 && <span className="text-sm text-text-secondary">Sin datos</span>}
          </div>
        </Card>
        <Card title="Ventas tienda" subtitle="Últimos 6 meses" action={<CreditCard size={16} className="text-text-secondary" />}>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{loading ? '…' : `$${salesAmount.toFixed(2)}`}</p>
            {!loading && salesAmount === 0 && <span className="text-sm text-text-secondary">Sin datos</span>}
          </div>
        </Card>
        <Card title="Series" subtitle="Usuarios / Subs" action={<Activity size={16} className="text-text-secondary" />}>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-text-secondary"><Loader2 className="animate-spin" size={16} /> Cargando</div>
          ) : (
            <div className="space-y-2">
              <Sparkline data={userSeries.data} color="rgb(99,102,241)" />
              <Sparkline data={subSeries.data} color="rgb(16,185,129)" />
            </div>
          )}
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Tareas rápidas" subtitle="Acciones diarias">
          <div className="flex flex-wrap gap-3 text-sm">
            <button className="pill bg-primary/15 text-primary border-primary/30">Agregar miembro</button>
            <button className="pill bg-secondary/15 text-secondary border-secondary/30">Crear clase</button>
            <button className="pill bg-success/15 text-success border-success/30">Registrar pago</button>
            <button className="pill bg-text-secondary/10 text-text border-border">Exportar CSV</button>
          </div>
        </Card>
        <Card title="Alertas" subtitle="Lo que necesita atención">
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• Revisa membresías próximas a vencer</li>
            <li>• Monitorea pagos en revisión</li>
            <li>• Checa stock bajo en tienda</li>
          </ul>
        </Card>
        <Card title="Renovaciones" subtitle="Semana en curso">
          <p className="text-sm text-text-secondary">Consulta detalle en Suscripciones</p>
        </Card>
      </div>

      {error && (
        <div className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</div>
      )}
    </div>
  )
}

export default GymAdminOverview
