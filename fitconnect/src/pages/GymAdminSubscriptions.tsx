import Card from '../components/Card'

const GymAdminSubscriptions = () => {
  const subs = [
    { user: 'ana@demo.com', plan: 'Mensual', status: 'Activa', renewal: '23 Feb 2026' },
    { user: 'luis@demo.com', plan: 'Trial 7d', status: 'Pruebas', renewal: 'Faltan 5 días' },
    { user: 'sofia@demo.com', plan: 'Mensual', status: 'Vencida', renewal: 'Renovar' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Suscripciones</p>
        <h1 className="text-2xl font-bold">Planes activos del gimnasio</h1>
      </div>
      <Card subtitle="Controla renovaciones y pruebas en tu sede">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-text-secondary">
              <tr>
                <th className="py-2">Usuario</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Renovación</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subs.map((s) => (
                <tr key={s.user + s.plan}>
                  <td className="py-3 font-semibold text-text">{s.user}</td>
                  <td className="py-3">{s.plan}</td>
                  <td className="py-3">
                    <span
                      className={`pill text-xs ${
                        s.status === 'Activa'
                          ? 'bg-success/15 text-success border-success/30'
                          : s.status === 'Pruebas'
                            ? 'bg-info/15 text-info border-info/30'
                            : 'bg-error/15 text-error border-error/30'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-text-secondary">{s.renewal}</td>
                  <td className="py-3 text-right">
                    <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text">Gestionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default GymAdminSubscriptions
