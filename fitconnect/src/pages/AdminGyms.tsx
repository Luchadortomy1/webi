import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail } from 'lucide-react'
import Card from '../components/Card'

const AdminGyms = () => {
  const gyms = [
    {
      name: 'CrossFit One',
      status: 'Activo',
      locations: 3,
      renewals: '+6%',
      admin: 'ana@crossfitone.com',
      adminName: 'Ana Torres',
      plan: 'FitConnect Pro',
      price: '$49',
    },
    {
      name: 'Powerhouse',
      status: 'Revisión',
      locations: 5,
      renewals: '-2%',
      admin: 'luis@powerhouse.com',
      adminName: 'Luis Pérez',
      plan: 'FitConnect Starter',
      price: '$29',
    },
    {
      name: 'Fit Studio',
      status: 'Activo',
      locations: 2,
      renewals: '+4%',
      admin: 'sofia@fitstudio.com',
      adminName: 'Sofía Rojas',
      plan: 'FitConnect Pro',
      price: '$49',
    },
  ]

  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = (name: string) => {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Gimnasios</p>
        <h1 className="text-2xl font-bold">Contratos y suscripciones</h1>
      </div>

      <Card subtitle="Admin del gym, plan contratado y sedes">
        <div className="grid gap-3 md:grid-cols-2">
          {gyms.map((gym) => {
            const expanded = open[gym.name]
            return (
              <div key={gym.name} className="rounded-2xl border border-border bg-background p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-text">{gym.name}</p>
                    <p className="text-xs text-text-secondary">Sedes: {gym.locations}</p>
                    <p className="text-xs text-text-secondary">Renovaciones: {gym.renewals}</p>
                    <div className="inline-flex gap-2 items-center text-xs text-text-secondary">
                      <Mail size={14} />
                      <span>{gym.admin}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`pill text-xs ${gym.status === 'Activo' ? 'bg-success/15 text-success border-success/30' : 'bg-warning/15 text-warning border-warning/30'}`}
                    >
                      {gym.status}
                    </span>
                    <button
                      onClick={() => toggle(gym.name)}
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
                      <span className="font-semibold text-text">{gym.adminName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Plan SaaS</span>
                      <span className="font-semibold text-text">{gym.plan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Precio</span>
                      <span className="font-semibold text-text">{gym.price} / mes</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

export default AdminGyms
