import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type PaymentRow = {
  id?: string
  source?: string
  amount?: number | string
  status?: string
  created_at?: string
}

const GymAdminPayments = () => {
  const [gymId, setGymId] = useState<string | null>(null)
  const [payments, setPayments] = useState<PaymentRow[]>([])
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

        const { data, error: payError } = await supabase
          .from('payments')
          .select('id, source, amount, status, created_at')
          .eq('gym_id', currentGymId)
          .order('created_at', { ascending: false })
        if (!active) return
        if (payError) {
          setError(payError.message)
          setPayments([])
        } else {
          setPayments(data ?? [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los pagos')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const formatAmount = (value?: number | string) => {
    if (value === undefined || value === null) return 'N/D'
    if (typeof value === 'number') return `$${value.toFixed(2)}`
    const num = Number(value)
    return Number.isNaN(num) ? String(value) : `$${num.toFixed(2)}`
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Pagos</p>
        <h1 className="text-2xl font-bold">Cobros y depósitos</h1>
        {gymId && <p className="text-xs text-text-secondary mt-1">Gym: {gymId}</p>}
      </div>
      <Card subtitle="Pagos recibidos y conciliaciones de la sede">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary"><Loader2 size={16} className="animate-spin" /> Cargando pagos</div>
        ) : error ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</div>
        ) : payments.length === 0 ? (
          <p className="text-sm text-text-secondary">Sin pagos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-text-secondary">
                <tr>
                  <th className="py-2">ID</th>
                  <th className="py-2">Origen</th>
                  <th className="py-2">Monto</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.map((p) => (
                  <tr key={p.id ?? `${p.source}-${p.created_at}`}>
                    <td className="py-3 font-semibold text-text">{p.id ?? '—'}</td>
                    <td className="py-3">{p.source ?? 'N/D'}</td>
                    <td className="py-3">{formatAmount(p.amount)}</td>
                    <td className="py-3">
                      <span
                        className={`pill text-xs ${
                          p.status === 'Aprobado'
                            ? 'bg-success/15 text-success border-success/30'
                            : p.status === 'Depositado'
                              ? 'bg-primary/15 text-primary border-primary/30'
                              : p.status === 'Revisión'
                                ? 'bg-warning/15 text-warning border-warning/30'
                                : 'bg-text-secondary/10 text-text border-border'
                        }`}
                      >
                        {p.status ?? 'Sin estado'}
                      </span>
                    </td>
                    <td className="py-3 text-text-secondary">{p.created_at ? new Date(p.created_at).toLocaleString() : '—'}</td>
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

export default GymAdminPayments
