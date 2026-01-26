import Card from '../components/Card'

const GymAdminProducts = () => {
  const products = [
    { name: 'Proteína aislada', sku: 'PF-101', stock: 38, price: '$32.00' },
    { name: 'Creatina 300g', sku: 'EL-233', stock: 12, price: '$18.50' },
    { name: 'Shaker XL', sku: 'SH-991', stock: 6, price: '$12.00' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Productos</p>
        <h1 className="text-2xl font-bold">Inventario de la tienda</h1>
      </div>
      <Card subtitle="Controla precios, stock y visibilidad">
        <div className="grid gap-3 md:grid-cols-3">
          {products.map((item) => (
            <div key={item.sku} className="rounded-2xl border border-border bg-background p-4 space-y-2">
              <p className="text-xs text-text-secondary">SKU {item.sku}</p>
              <p className="text-base font-semibold text-text">{item.name}</p>
              <p className="text-sm text-text-secondary">Stock: {item.stock}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{item.price}</span>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text">Editar</button>
                  <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-background">Vender</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default GymAdminProducts
