import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type SubscriptionRow = {
  id?: string
  user_email?: string
  gym_name?: string
  plan_name?: string
  status?: string
  renewal_date?: string
  created_at?: string
}

const AdminSubscriptions = () => {
  const [subs, setSubs] = useState<SubscriptionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')
      const { data, error: err } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false })
      if (!active) return
      if (err) {
        setError(err.message)
        setSubs([])
      } else {
        setSubs(data ?? [])
      }
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const formatDate = (value?: string) => {
    if (!value) return '—'
    const date = new Date(value)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Suscripciones</p>
        <h1 className="text-2xl font-bold">Asociación usuario ↔ gimnasio</h1>
      </div>
      <Card subtitle="Estado y vigencia de planes por gimnasio">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Loader2 className="animate-spin" size={16} /> Cargando suscripciones
          </div>
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
                  <th className="py-2">Gimnasio</th>
                  <th className="py-2">Plan</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Renovación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subs.map((s) => (
                  <tr key={s.id ?? `${s.user_email}-${s.gym_name}-${s.created_at}`}>
                    <td className="py-3 font-semibold text-text">{s.user_email ?? 'Sin usuario'}</td>
                    <td className="py-3">{s.gym_name ?? 'Sin gimnasio'}</td>
                    <td className="py-3">{s.plan_name ?? 'N/D'}</td>
                    <td className="py-3">
                      <span className={`pill text-xs ${s.status === 'Activa' ? 'bg-success/15 text-success border-success/30' : s.status === 'Pruebas' ? 'bg-info/15 text-info border-info/30' : s.status === 'Vencida' ? 'bg-error/15 text-error border-error/30' : 'bg-text-secondary/10 text-text border-border'}`}>
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

export default AdminSubscriptions
