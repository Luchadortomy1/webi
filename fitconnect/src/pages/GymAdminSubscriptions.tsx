import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type SubRow = {
  id?: string
  user_email?: string
  plan_name?: string
  status?: string
  renewal_date?: string
  created_at?: string
  gym_id?: string
}

const GymAdminSubscriptions = () => {
  const [gymId, setGymId] = useState<string | null>(null)
  const [subs, setSubs] = useState<SubRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const { data: auth } = await supabase.auth.getUser()
        const userId = auth.user?.id
        if (!userId) throw new Error('No hay sesión activa')
        const { data: profile, error: profileError } = await supabase.from('profiles').select('gym_id, gym').eq('id', userId).single()
        if (profileError) throw profileError
        const currentGymId = (profile as { gym_id?: string; gym?: string })?.gym_id ?? (profile as { gym?: string })?.gym
        if (!currentGymId) throw new Error('El perfil no tiene gimnasio asignado')
        if (!active) return
        setGymId(currentGymId)

        const { data, error: subsError } = await supabase
          .from('subscriptions')
          .select('id, user_email, plan_name, status, renewal_date, created_at')
          .eq('gym_id', currentGymId)
          .order('created_at', { ascending: false })

        if (!active) return
        if (subsError) {
          setError(subsError.message)
          setSubs([])
        } else {
          setSubs(data ?? [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar las suscripciones')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const formatDate = (value?: string) => {
    if (!value) return '—'
    const d = new Date(value)
    return d.toLocaleDateString()
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Suscripciones</p>
        <h1 className="text-2xl font-bold">Planes activos del gimnasio</h1>
        {gymId && <p className="text-xs text-text-secondary mt-1">Gym: {gymId}</p>}
      </div>
      <Card subtitle="Controla renovaciones y pruebas en tu sede">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary"><Loader2 size={16} className="animate-spin" /> Cargando suscripciones</div>
        ) : error ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</div>
        ) : subs.length === 0 ? (
          <p className="text-sm text-text-secondary">Sin suscripciones registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-text-secondary">
                <tr>
                  <th className="py-2">Usuario</th>
                  <th className="py-2">Plan</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Renovación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subs.map((s) => (
                  <tr key={s.id ?? `${s.user_email}-${s.plan_name}-${s.created_at}`}>
                    <td className="py-3 font-semibold text-text">{s.user_email ?? 'Sin usuario'}</td>
                    <td className="py-3">{s.plan_name ?? 'N/D'}</td>
                    <td className="py-3">
                      <span
                        className={`pill text-xs ${
                          s.status === 'Activa'
                            ? 'bg-success/15 text-success border-success/30'
                            : s.status === 'Pruebas'
                              ? 'bg-info/15 text-info border-info/30'
                              : s.status === 'Vencida'
                                ? 'bg-error/15 text-error border-error/30'
                                : 'bg-text-secondary/10 text-text border-border'
                        }`}
                      >
                        {s.status ?? 'Sin estado'}
                      </span>
                    </td>
                    <td className="py-3 text-text-secondary">{formatDate(s.renewal_date ?? s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default GymAdminSubscriptions
