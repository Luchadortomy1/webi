import { FormEvent, useState } from 'react'
import { Building2, Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

const AdminRegisterGym = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    location: '',
    image_url: '',
    is_active: true,
  })
  const [creating, setCreating] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.currentTarget
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback('')
    setCreating(true)

    // Validar campos requeridos
    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setFeedback('Por favor completa todos los campos requeridos')
      setFeedbackType('error')
      setCreating(false)
      return
    }

    try {
      const { error } = await supabase.from('gyms').insert({
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim() || null,
        image_url: formData.image_url.trim() || null,
        is_active: formData.is_active,
      })

      if (error) {
        setFeedback(`Error: ${error.message}`)
        setFeedbackType('error')
      } else {
        setFeedback('✓ Gimnasio registrado exitosamente')
        setFeedbackType('success')
        setFormData({
          name: '',
          address: '',
          phone: '',
          location: '',
          image_url: '',
          is_active: true,
        })
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Error desconocido')
      setFeedbackType('error')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Registro de gimnasios</p>
          <h1 className="text-2xl font-bold">Registrar nuevo gimnasio</h1>
          <p className="text-sm text-text-secondary mt-1">Completa los datos del gimnasio para agregarlo a la plataforma.</p>
        </div>
        <span className="pill bg-primary/15 text-primary border-primary/30 inline-flex items-center gap-2">
          <Building2 size={16} /> Nuevo gimnasio
        </span>
      </div>

      <Card title="Información del gimnasio" subtitle="Todos los campos marcados con * son obligatorios">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-1 text-sm font-semibold text-text md:col-span-2" htmlFor="name">
            Nombre del gimnasio *
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="ej: Powerhouse Downtown"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="address">
            Dirección *
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="ej: Calle Principal 123"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="phone">
            Teléfono *
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              type="tel"
              placeholder="ej: +52 555 1234567"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="image_url">
            URL de imagen
            <input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              type="url"
              placeholder="ej: https://ejemplo.com/imagen.jpg"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text md:col-span-2" htmlFor="location">
            Descripción/Ubicación
            <textarea
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="ej: Ubicado en el centro comercial, 3 pisos"
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-border"
            />
            Gimnasio activo
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={creating}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-background disabled:opacity-60 inline-flex items-center gap-2"
            >
              {creating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Registrando…
                </>
              ) : (
                <>
                  <Building2 size={16} />
                  Registrar gimnasio
                </>
              )}
            </button>
            {feedback && (
              <p
                className={`text-sm ${
                  feedbackType === 'success' ? 'text-success' : feedbackType === 'error' ? 'text-error' : 'text-text-secondary'
                }`}
              >
                {feedback}
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AdminRegisterGym
