<<<<<<< HEAD
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
=======
import { FormEvent, useState } from 'react'
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Placeholder auth: direct access to admin. Replace with real auth when backend is ready.
    navigate('/admin')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#0f1b32] to-[#101f3d] text-white">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(226,69,83,0.18), transparent 35%), radial-gradient(circle at 80% 10%, rgba(226,69,83,0.22), transparent 30%), radial-gradient(circle at 20% 80%, rgba(255,116,92,0.16), transparent 30%)',
        }}
      />

      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#e24553]/25 blur-3xl" />
      <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#ff745c]/25 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-center md:px-12 md:py-16">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e24553]/40 bg-[#e24553]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#ffd5cc]">
            <ShieldCheck size={14} /> Acceso seguro
          </div>
          <div className="space-y-3">
            <p className="text-4xl font-black md:text-5xl">Bienvenido a FitConnect</p>
            <p className="text-lg text-white/80 md:text-xl">
              Centraliza tus gimnasios, usuarios y pagos en un panel ágil. Ingresa para continuar gestionando la operación.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
              <p className="text-sm font-semibold text-white/85">Visibilidad total</p>
              <p className="text-sm text-white/60">KPIs, riesgos y flujos en tiempo real para decidir rápido.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
              <p className="text-sm font-semibold text-white/85">Pagos protegidos</p>
              <p className="text-sm text-white/60">Detección temprana de fraudes y conciliaciones claras.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            <span className="pill bg-white/10 border-white/10">2FA listo</span>
            <span className="pill bg-white/10 border-white/10">Exportar reportes</span>
            <span className="pill bg-white/10 border-white/10">Modo claro/oscuro</span>
          </div>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e24553]/25 text-[#ff8f7d]">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">Panel administrativo</p>
              <p className="text-lg font-bold">Inicia sesión</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="space-y-2 text-sm font-semibold text-white/80" htmlFor="email">
              Correo electrónico
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 focus-within:border-[#ff745c]/60 focus-within:bg-white/10">
                <Mail size={18} className="text-white/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="admin@fitconnect.com"
                  className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </label>

            <label className="space-y-2 text-sm font-semibold text-white/80" htmlFor="password">
              Contraseña
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 focus-within:border-[#ff745c]/60 focus-within:bg-white/10">
                <Lock size={18} className="text-white/60" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm text-white/70">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-transparent text-primary focus:ring-primary/60"
                />
                Recuérdame en este equipo
              </label>
              <button type="button" className="font-semibold text-[#ff8f7d] hover:text-white transition-colors">
                ¿Olvidaste tu clave?
              </button>
            </div>

            <button
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#e24553] via-[#ff5f5f] to-[#ff8f7d] px-4 py-3 text-sm font-semibold text-background shadow-soft transition-transform duration-150 hover:-translate-y-0.5"
            >
              Entrar al panel
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-center text-xs text-white/60">Acceso restringido al equipo de operaciones de FitConnect.</p>
          </form>
>>>>>>> 26ad93db39ab1f03a3fdfd36f05c9e73407c0604
        </div>
      </div>
    </div>
  )
}

export default Login
