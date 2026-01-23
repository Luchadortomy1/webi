import Card from '../components/Card'

const AdminPayments = () => {
  const payments = [
    { id: '#8842', user: 'Laura Méndez', amount: '$42.00', status: 'Revisión' },
    { id: '#8841', user: 'Carlos Díaz', amount: '$18.50', status: 'Aprobado' },
    { id: '#8839', user: 'Marta Ruiz', amount: '$24.90', status: 'Disputa' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Pagos</p>
        <h1 className="text-2xl font-bold">Ingresos y fraude</h1>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-text-secondary">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Usuario</th>
                <th className="py-2">Monto</th>
                <th className="py-2">Estado</th>
                <th className="py-2 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-semibold text-text">{p.id}</td>
                  <td className="py-3">{p.user}</td>
                  <td className="py-3">{p.amount}</td>
                  <td className="py-3">
                    <span className={`pill text-xs ${p.status === 'Aprobado' ? 'bg-success/15 text-success border-success/30' : p.status === 'Revisión' ? 'bg-warning/15 text-warning border-warning/30' : 'bg-error/15 text-error border-error/30'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text">Detalle</button>
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

export default AdminPayments
