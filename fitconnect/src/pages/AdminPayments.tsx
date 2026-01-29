import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type PaymentRow = {
  id?: string
  user_email?: string
  amount?: number | string
  status?: string
  created_at?: string
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<PaymentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')
      const { data, error: err } = await supabase.from('payments').select('*').order('created_at', { ascending: false })
      if (!active) return
      if (err) {
        setError(err.message)
        setPayments([])
      } else {
        setPayments(data ?? [])
      }
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const formatAmount = (value?: number | string) => {
    if (value === undefined || value === null) return 'N/D'
    if (typeof value === 'number') return `$${value.toFixed(2)}`
    return String(value)
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Pagos</p>
        <h1 className="text-2xl font-bold">Ingresos y fraude</h1>
      </div>
      <Card subtitle="Pagos almacenados en la tabla payments">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Loader2 className="animate-spin" size={16} /> Cargando pagos
          </div>
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
                  <th className="py-2">Usuario</th>
                  <th className="py-2">Monto</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Creado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.map((p) => (
                  <tr key={p.id ?? `${p.user_email}-${p.created_at}`}>
                    <td className="py-3 font-semibold text-text">{p.id ?? '—'}</td>
                    <td className="py-3">{p.user_email ?? 'Sin usuario'}</td>
                    <td className="py-3">{formatAmount(p.amount)}</td>
                    <td className="py-3">
                      <span className={`pill text-xs ${p.status === 'Aprobado' ? 'bg-success/15 text-success border-success/30' : p.status === 'Revisión' ? 'bg-warning/15 text-warning border-warning/30' : p.status === 'Disputa' ? 'bg-error/15 text-error border-error/30' : 'bg-text-secondary/10 text-text border-border'}`}>
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

export default AdminPayments
