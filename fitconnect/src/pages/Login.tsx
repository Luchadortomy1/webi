import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../providers/AuthProvider'

const Login = () => {
  const { user, role } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: Location })?.from?.pathname

  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [roleChoice, setRoleChoice] = useState<'superadmin' | 'admin'>('superadmin')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !role) return
    const target = from || (role === 'superadmin' ? '/sa' : '/admin')
    navigate(target, { replace: true })
  }, [user, role, from, navigate])

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role: roleChoice },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      if (data.session) {
        setMessage('Cuenta creada. Redirigiendo...')
      } else {
        setMessage('Revisa tu correo para confirmar la cuenta.')
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError(signInError.message)
      }
    }

    setLoading(false)
  }

  if (user && role) {
    return <Navigate to={role === 'superadmin' ? '/sa' : '/admin'} replace />
  }

  let submitLabel = 'Ingresar'
  if (mode === 'signup') submitLabel = 'Crear cuenta'
  if (loading) submitLabel = 'Procesando...'

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-surface shadow-soft p-6 space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-text-secondary">Acceso FitConnect</p>
          <h1 className="text-2xl font-bold">Login / Registro</h1>
          <div className="text-xs text-text-secondary">
            Crea primero un <span className="font-semibold text-text">superadmin</span>, luego usará este login para agregar
            admins de gimnasios.
          </div>
        </header>

        <div className="inline-flex rounded-xl border border-border bg-background p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`px-4 py-2 rounded-lg font-semibold ${mode === 'signup' ? 'bg-surface text-text shadow-soft' : 'text-text-secondary'}`}
          >
            Crear cuenta
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`px-4 py-2 rounded-lg font-semibold ${mode === 'signin' ? 'bg-surface text-text shadow-soft' : 'text-text-secondary'}`}
          >
            Ingresar
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-text" htmlFor="fullName">
                Nombre completo
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Ej. Laura Díaz"
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-text" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-text" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-text">Rol a crear</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <label className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${roleChoice === 'superadmin' ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="superadmin"
                    checked={roleChoice === 'superadmin'}
                    onChange={() => setRoleChoice('superadmin')}
                    className="h-4 w-4"
                  />
                  <span>Superadmin</span>
                </label>
                <label className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${roleChoice === 'admin' ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={roleChoice === 'admin'}
                    onChange={() => setRoleChoice('admin')}
                    className="h-4 w-4"
                  />
                  <span>Admin de gym</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </form>

        {message && <div className="text-sm text-success">{message}</div>}
        {error && <div className="text-sm text-error">{error}</div>}

        <div className="rounded-xl border border-border bg-background p-4 text-xs text-text-secondary space-y-2">
          <p className="font-semibold text-text">Notas rápidas</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Usa este formulario solo para crear el primer superadmin.</li>
            <li>El JWT trae user_metadata.role; se redirige a /sa (superadmin) o /admin.</li>
            <li>Si Supabase exige confirmación por correo, revisa tu bandeja para activar la cuenta.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
