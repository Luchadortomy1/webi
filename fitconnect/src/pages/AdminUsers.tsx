import Card from '../components/Card'

const AdminUsers = () => {
  const users = [
    { name: 'Laura Méndez', status: 'Pendiente KYC', tier: 'Plus', updated: 'Hoy 10:12' },
    { name: 'Carlos Díaz', status: 'Activo', tier: 'Free', updated: 'Ayer' },
    { name: 'Marta Ruiz', status: 'Bloqueado', tier: 'Plus', updated: 'Hace 3h' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Usuarios</p>
        <h1 className="text-2xl font-bold">Gestión, riesgos y soporte</h1>
      </div>
      <Card subtitle="Alta, baja lógica, lectura, modificación (según SRS)">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-text-secondary">
              <tr>
                <th className="py-2">Nombre</th>
                <th className="py-2">Tier</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Actualizado</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.name}>
                  <td className="py-3 font-semibold text-text">{user.name}</td>
                  <td className="py-3">{user.tier}</td>
                  <td className="py-3">
                    <span className={`pill text-xs ${user.status === 'Pendiente KYC' ? 'bg-warning/15 text-warning border-warning/30' : user.status === 'Bloqueado' ? 'bg-error/15 text-error border-error/30' : 'bg-success/15 text-success border-success/30'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 text-text-secondary">{user.updated}</td>
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

export default AdminUsers
