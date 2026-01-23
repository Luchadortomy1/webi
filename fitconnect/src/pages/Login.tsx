import { FormEvent, useState } from 'react'
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [regError, setRegError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Placeholder auth: direct access to admin. Replace with real auth when backend is ready.
    navigate('/admin')
  }

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (regPassword !== regConfirm) {
      setRegError('Las contraseñas no coinciden')
      return
    }
    setRegError('')
    // Placeholder: create superadmin. Replace with backend call.
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

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur space-y-6">
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

          <div className="h-px bg-white/10" />

          <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <UserPlus size={18} className="text-[#ff8f7d]" />
            Crear superadmin
          </div>

          <form className="space-y-3" onSubmit={handleRegister}>
            <div className="grid gap-3">
              <label className="space-y-2 text-sm font-semibold text-white/80" htmlFor="reg-name">
                Nombre completo
                <input
                  id="reg-name"
                  type="text"
                  value={regName}
                  onChange={(event) => setRegName(event.target.value)}
                  required
                  placeholder="Ana Operaciones"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/40 outline-none focus:border-[#ff745c]/60 focus:bg-white/10"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-white/80" htmlFor="reg-email">
                Correo corporativo
                <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 focus-within:border-[#ff745c]/60 focus-within:bg-white/10">
                  <Mail size={18} className="text-white/60" />
                  <input
                    id="reg-email"
                    type="email"
                    value={regEmail}
                    onChange={(event) => setRegEmail(event.target.value)}
                    required
                    placeholder="superadmin@fitconnect.com"
                    className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                  />
                </div>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-white/80" htmlFor="reg-password">
                  Contraseña
                  <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 focus-within:border-[#ff745c]/60 focus-within:bg-white/10">
                    <Lock size={18} className="text-white/60" />
                    <input
                      id="reg-password"
                      type="password"
                      value={regPassword}
                      onChange={(event) => setRegPassword(event.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm font-semibold text-white/80" htmlFor="reg-confirm">
                  Confirmar contraseña
                  <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 focus-within:border-[#ff745c]/60 focus-within:bg-white/10">
                    <Lock size={18} className="text-white/60" />
                    <input
                      id="reg-confirm"
                      type="password"
                      value={regConfirm}
                      onChange={(event) => setRegConfirm(event.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                    />
                  </div>
                </label>
              </div>
            </div>

            {regError && <p className="text-sm font-semibold text-[#ffb3a5]">{regError}</p>}

            <button
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
            >
              Registrar superadmin
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-center text-xs text-white/60">Solo para creación inicial de cuentas de alto privilegio.</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
