import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type OrderRow = {
  id?: string
  user_email?: string
  items?: number
  total?: number | string
  status?: string
  created_at?: string
}

const GymAdminOrders = () => {
  const [gymId, setGymId] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderRow[]>([])
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

        const { data, error: ordersError } = await supabase
          .from('orders')
          .select('id, user_email, items, total, status, created_at')
          .eq('gym_id', currentGymId)
          .order('created_at', { ascending: false })
        if (!active) return
        if (ordersError) {
          setError(ordersError.message)
          setOrders([])
        } else {
          setOrders(data ?? [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los pedidos')
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
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Pedidos</p>
        <h1 className="text-2xl font-bold">Ventas y logística</h1>
        {gymId && <p className="text-xs text-text-secondary mt-1">Gym: {gymId}</p>}
      </div>
      <Card subtitle="Flujo de carrito → pago → entrega">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary"><Loader2 size={16} className="animate-spin" /> Cargando pedidos</div>
        ) : error ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</div>
        ) : orders.length === 0 ? (
          <p className="text-sm text-text-secondary">Sin pedidos en este gimnasio.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-text-secondary">
                <tr>
                  <th className="py-2">ID</th>
                  <th className="py-2">Usuario</th>
                  <th className="py-2">Items</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Creado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => {
                  const totalVal = o.total !== undefined && o.total !== null ? (typeof o.total === 'number' ? o.total : Number(o.total)) : 0
                  return (
                    <tr key={o.id ?? `${o.user_email}-${o.created_at}`}>
                      <td className="py-3 font-semibold text-text">{o.id ?? '—'}</td>
                      <td className="py-3">{o.user_email ?? 'Sin usuario'}</td>
                      <td className="py-3">{o.items ?? 0}</td>
                      <td className="py-3">${totalVal.toFixed(2)}</td>
                      <td className="py-3">
                        <span
                          className={`pill text-xs ${
                            o.status === 'Pagado'
                              ? 'bg-success/15 text-success border-success/30'
                              : o.status === 'Enviado'
                                ? 'bg-info/15 text-info border-info/30'
                                : o.status === 'Borrador'
                                  ? 'bg-warning/15 text-warning border-warning/30'
                                  : 'bg-text-secondary/10 text-text border-border'
                          }`}
                        >
                          {o.status ?? 'Sin estado'}
                        </span>
                      </td>
                      <td className="py-3 text-text-secondary">{o.created_at ? new Date(o.created_at).toLocaleString() : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default GymAdminOrders
