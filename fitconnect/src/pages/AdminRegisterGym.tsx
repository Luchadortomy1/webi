import { FormEvent, useState } from 'react'
import { KeyRound, ShieldCheck } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

const AdminRegisterGym = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gym, setGym] = useState('')
  const [planName, setPlanName] = useState('FitConnect Pro')
  const [creating, setCreating] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleCreateGymAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback('')
    setCreating(true)

    const role = 'gym_owner'

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            gym,
            name,
            plan_name: planName,
          },
        },
      })

      if (signUpError) {
        setFeedback(signUpError.message)
        return
      }

      const userId = signUpData.user?.id
      if (!userId) {
        setFeedback('No se pudo obtener el usuario creado.')
        return
      }

      const { data: gymInsert, error: gymError } = await supabase
        .from('gyms')
        .insert({ name: gym, description: '', address: '', phone: '', image: '' })
        .select('id')
        .single()

      if (gymError) {
        setFeedback(`Usuario creado pero gimnasio falló: ${gymError.message}`)
        return
      }

      const gymId = gymInsert?.id

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        full_name: name,
        email,
        role,
        gym_id: gymId,
        gym: gymId ?? gym,
      })

      if (profileError) {
        setFeedback(`Usuario y gym creados pero perfil falló: ${profileError.message}`)
        return
      }

      setFeedback('Admin y gimnasio creados. Revisa el correo para confirmar acceso.')
      setName('')
      setEmail('')
      setPassword('')
      setGym('')
      setPlanName('FitConnect Pro')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">Registro de gimnasio</p>
          <h1 className="text-2xl font-bold">Crear admin y plan</h1>
          <p className="text-sm text-text-secondary mt-1">Un solo paso para crear el admin y asociar el plan contratado.</p>
        </div>
        <span className="pill bg-success/15 text-success border-success/30 inline-flex items-center gap-2">
          <ShieldCheck size={16} /> Operación segura
        </span>
      </div>

      <Card title="Datos del gimnasio" subtitle="Crea usuarios con rol de administración de sede">
        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreateGymAdmin}>
          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="gym-name">
            Gimnasio
            <input
              id="gym-name"
              value={gym}
              onChange={(event) => setGym(event.target.value)}
              required
              placeholder="Powerhouse Downtown"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="admin-name">
            Nombre completo
            <input
              id="admin-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Ana Operaciones"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="admin-email">
            Correo
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@gym.com"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="plan-name">
            Plan vendido (SaaS)
            <input
              id="plan-name"
              value={planName}
              onChange={(event) => setPlanName(event.target.value)}
              required
              placeholder="FitConnect Pro"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="space-y-1 text-sm font-semibold text-text" htmlFor="admin-password">
            Contraseña temporal
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={creating}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-background disabled:opacity-60 inline-flex items-center gap-2"
            >
              <KeyRound size={16} />
              {creating ? 'Creando…' : 'Crear admin'}
            </button>
            {feedback && <p className="text-sm text-text-secondary">{feedback}</p>}
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AdminRegisterGym
