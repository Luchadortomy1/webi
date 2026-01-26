import Card from '../components/Card'

const GymAdminUsers = () => {
  const users = [
    { name: 'Ana Torres', status: 'Activa', plan: 'Mensual', checkins: 12 },
    { name: 'Luis Pérez', status: 'Pruebas', plan: 'Trial 7d', checkins: 3 },
    { name: 'Sofía Rojas', status: 'Vencida', plan: 'Mensual', checkins: 0 },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Usuarios</p>
        <h1 className="text-2xl font-bold">Miembros y accesos</h1>
      </div>

      <Card subtitle="Gestión de socios del gimnasio">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-text-secondary">
              <tr>
                <th className="py-2">Nombre</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Check-ins</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.name}>
                  <td className="py-3 font-semibold text-text">{user.name}</td>
                  <td className="py-3">{user.plan}</td>
                  <td className="py-3">
                    <span
                      className={`pill text-xs ${
                        user.status === 'Activa'
                          ? 'bg-success/15 text-success border-success/30'
                          : user.status === 'Pruebas'
                            ? 'bg-info/15 text-info border-info/30'
                            : 'bg-error/15 text-error border-error/30'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 text-text-secondary">{user.checkins}</td>
                  <td className="py-3 text-right">
                    <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text">Ver</button>
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

export default GymAdminUsers
