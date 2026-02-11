import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Mail, MapPin, Loader2, Building2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type GymRow = {
  id?: string
  name?: string
  status?: string
  locations?: number
  location_count?: number
  renewals?: string
  admin_email?: string
  admin_name?: string
  plan_name?: string
  price?: number | string
  created_at?: string
  city?: string
  state?: string
}

const AdminGyms = () => {
  const [gyms, setGyms] = useState<GymRow[]>([])
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')
      const { data, error: err } = await supabase.from('gyms').select('*').order('created_at', { ascending: false })
      if (!active) return
      if (err) {
        setError(err.message)
        setGyms([])
      } else {
        setGyms(data ?? [])
      }
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const toggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Gimnasios</p>
        <h1 className="text-2xl font-bold">Contratos y sedes</h1>
      </div>

      <Card subtitle="Admin del gym, plan contratado y sedes">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Loader2 className="animate-spin" size={16} /> Cargando gimnasios
          </div>
        ) : error ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</div>
        ) : gyms.length === 0 ? (
          <p className="text-sm text-text-secondary">Sin gimnasios registrados.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {gyms.map((gym) => {
              const id = gym.id ?? gym.name ?? Math.random().toString()
              const expanded = open[id]
              const locations = gym.location_count ?? gym.locations ?? 0
              const priceValue = gym.price !== undefined ? gym.price : undefined
              const price = typeof priceValue === 'number' ? `$${priceValue.toFixed(2)}` : priceValue

              return (
                <div key={id} className="rounded-2xl border border-border bg-background p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-text">{gym.name ?? 'Sin nombre'}</p>
                      <p className="text-xs text-text-secondary inline-flex items-center gap-1">
                        <Building2 size={14} /> Sedes: {locations}
                      </p>
                      {gym.city && (
                        <p className="text-xs text-text-secondary inline-flex items-center gap-1">
                          <MapPin size={14} /> {gym.city} {gym.state ? `• ${gym.state}` : ''}
                        </p>
                      )}
                      <div className="inline-flex gap-2 items-center text-xs text-text-secondary">
                        <Mail size={14} />
                        <span>{gym.admin_email ?? 'Sin email'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`pill text-xs ${gym.status === 'Activo' ? 'bg-success/15 text-success border-success/30' : gym.status === 'Revisión' ? 'bg-warning/15 text-warning border-warning/30' : 'bg-text-secondary/10 text-text border-border'}`}
                      >
                        {gym.status ?? 'Sin estado'}
                      </span>
                      <button
                        onClick={() => toggle(id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                      >
                        {expanded ? 'Ocultar' : 'Ver detalle'} {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="rounded-xl border border-border bg-surface p-3 text-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Admin</span>
                        <span className="font-semibold text-text">{gym.admin_name ?? 'N/D'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Plan SaaS</span>
                        <span className="font-semibold text-text">{gym.plan_name ?? 'N/D'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Precio</span>
                        <span className="font-semibold text-text">{price ? `${price} / mes` : 'N/D'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Renovaciones</span>
                        <span className="font-semibold text-text">{gym.renewals ?? 'N/D'}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}

export default AdminGyms
