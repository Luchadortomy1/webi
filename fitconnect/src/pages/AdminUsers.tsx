import Card from '../components/Card'

const AdminUsers = () => {
  const users = [
    { name: 'Ana Torres', gym: 'Powerhouse Downtown', plan: 'FitConnect Pro', price: '$49', status: 'Activo', updated: 'Hoy 10:12' },
    { name: 'Luis Pérez', gym: 'CrossFit One', plan: 'FitConnect Starter', price: '$29', status: 'Activo', updated: 'Ayer' },
    { name: 'Sofía Rojas', gym: 'Fit Studio', plan: 'FitConnect Pro', price: '$49', status: 'Trial', updated: 'Hace 3h' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Admins de gimnasio</p>
        <h1 className="text-2xl font-bold">Relación admin ↔ gimnasio ↔ plan</h1>
      </div>

      <Card subtitle="Admins que gestionan cada gimnasio y el plan que tienen contratado">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-text-secondary">
              <tr>
                <th className="py-2">Admin</th>
                <th className="py-2">Gimnasio</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Actualizado</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.name}>
                  <td className="py-3 font-semibold text-text">{user.name}</td>
                  <td className="py-3">{user.gym}</td>
                  <td className="py-3">{user.plan}</td>
                  <td className="py-3">{user.price}</td>
                  <td className="py-3">
                    <span className={`pill text-xs ${user.status === 'Activo' ? 'bg-success/15 text-success border-success/30' : user.status === 'Trial' ? 'bg-info/15 text-info border-info/30' : 'bg-warning/15 text-warning border-warning/30'}`}>
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
