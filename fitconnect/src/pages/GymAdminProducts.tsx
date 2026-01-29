import { useEffect, useState } from 'react'
import { Loader2, Save, Trash2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type ProductRow = {
  id?: string
  name?: string
  sku?: string
  price?: number | string
  stock?: number
  active?: boolean
  gym_id?: string
}

const GymAdminProducts = () => {
  const [gymId, setGymId] = useState<string | null>(null)
  const [products, setProducts] = useState<ProductRow[]>([])
  const [form, setForm] = useState<ProductRow>({ name: '', sku: '', price: 0, stock: 0, active: true })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadGymId = async () => {
    const { data: auth } = await supabase.auth.getUser()
    const userId = auth.user?.id
    if (!userId) throw new Error('No hay sesión activa')
    const { data: profile, error: profileError } = await supabase.from('profiles').select('gym_id, gym').eq('id', userId).single()
    if (profileError) throw profileError
    return (profile as { gym_id?: string; gym?: string })?.gym_id ?? (profile as { gym?: string })?.gym
  }

  const loadProducts = async (currentGymId: string) => {
    const { data, error: prodError } = await supabase
      .from('products')
      .select('id, name, sku, price, stock, active')
      .eq('gym_id', currentGymId)
      .order('created_at', { ascending: false })
    if (prodError) throw prodError
    setProducts(data ?? [])
  }

  useEffect(() => {
    let active = true
    const init = async () => {
      setLoading(true)
      setError('')
      try {
        const currentGymId = await loadGymId()
        if (!currentGymId) throw new Error('El perfil no tiene gimnasio asignado')
        if (!active) return
        setGymId(currentGymId)
        await loadProducts(currentGymId)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'No se pudieron cargar productos')
      } finally {
        if (active) setLoading(false)
      }
    }
    init()
    return () => {
      active = false
    }
  }, [])

  const handleSave = async () => {
    if (!gymId) return
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const payload = { ...form, gym_id: gymId }
      if (!payload.name || !payload.sku) throw new Error('Nombre y SKU son obligatorios')
      if (payload.id) {
        const { error: updateError } = await supabase.from('products').update(payload).eq('id', payload.id)
        if (updateError) throw updateError
        setMessage('Producto actualizado')
      } else {
        const { error: insertError } = await supabase.from('products').insert(payload)
        if (insertError) throw insertError
        setMessage('Producto creado')
      }
      await loadProducts(gymId)
      setForm({ name: '', sku: '', price: 0, stock: 0, active: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el producto')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product: ProductRow) => {
    setForm(product)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const { error: delError } = await supabase.from('products').delete().eq('id', id)
      if (delError) throw delError
      if (gymId) await loadProducts(gymId)
      setMessage('Producto eliminado')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Productos</p>
        <h1 className="text-2xl font-bold">Inventario de la tienda</h1>
        {gymId && <p className="text-xs text-text-secondary mt-1">Gym: {gymId}</p>}
      </div>
      <Card subtitle="Controla precios, stock y visibilidad">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1 space-y-3">
            <p className="text-sm font-semibold text-text">Crear / editar</p>
            <input
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              placeholder="Nombre"
              value={form.name ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              placeholder="SKU"
              value={form.sku ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              type="number"
              min={0}
              step={0.01}
              placeholder="Precio"
              value={form.price ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            />
            <input
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              type="number"
              min={0}
              placeholder="Stock"
              value={form.stock ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
            />
            <label className="inline-flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={form.active ?? true}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              Activo en la tienda
            </label>
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-background disabled:opacity-60"
            >
              <Save size={16} /> {saving ? 'Guardando…' : form.id ? 'Actualizar' : 'Crear producto'}
            </button>
            {message && <p className="text-sm text-success">{message}</p>}
            {error && <p className="text-sm text-warning">{error}</p>}
          </div>

          <div className="md:col-span-2 grid gap-3 md:grid-cols-2">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-text-secondary md:col-span-2"><Loader2 className="animate-spin" size={16} /> Cargando productos</div>
            ) : products.length === 0 ? (
              <p className="text-sm text-text-secondary md:col-span-2">Sin productos cargados.</p>
            ) : (
              products.map((item) => {
                const priceVal = item.price !== undefined && item.price !== null ? (typeof item.price === 'number' ? item.price : Number(item.price)) : 0
                return (
                  <div key={item.id ?? item.sku} className="rounded-2xl border border-border bg-background p-4 space-y-2">
                    <p className="text-xs text-text-secondary">SKU {item.sku ?? 'N/D'}</p>
                    <p className="text-base font-semibold text-text">{item.name ?? 'Sin nombre'}</p>
                    <p className="text-sm text-text-secondary">Stock: {item.stock ?? 0}</p>
                    <p className="text-sm text-text-secondary">Estado: {item.active ? 'Activo' : 'Oculto'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${priceVal.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg border border-error text-error px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GymAdminProducts
