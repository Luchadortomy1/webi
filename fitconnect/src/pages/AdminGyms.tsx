import Card from '../components/Card'

const AdminGyms = () => {
  const gyms = [
    { name: 'CrossFit One', status: 'Activo', locations: 3, renewals: '+6%' },
    { name: 'Powerhouse', status: 'Revisión', locations: 5, renewals: '-2%' },
    { name: 'Fit Studio', status: 'Activo', locations: 2, renewals: '+4%' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Gimnasios</p>
        <h1 className="text-2xl font-bold">Contratos y suscripciones</h1>
      </div>

      <Card>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {gyms.map((gym) => (
            <div key={gym.name} className="rounded-2xl border border-border bg-background p-4 space-y-2">
              <p className="text-sm font-semibold text-text">{gym.name}</p>
              <p className="text-xs text-text-secondary">Sedes: {gym.locations}</p>
              <p className="text-xs text-text-secondary">Renovaciones: {gym.renewals}</p>
              <span className={`pill text-xs ${gym.status === 'Activo' ? 'bg-success/15 text-success border-success/30' : 'bg-warning/15 text-warning border-warning/30'}`}>
                {gym.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default AdminGyms
