import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

type MemberRow = {
  id?: string
  full_name?: string
  plan_name?: string
  status?: string
  checkins?: number
  created_at?: string
  gym_id?: string
}

const GymAdminUsers = () => {
  const [gymId, setGymId] = useState<string | null>(null)
  const [users, setUsers] = useState<MemberRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const { data: auth } = await supabase.auth.getUser()
        const userId = auth.user?.id
        if (!userId) throw new Error('No hay sesión activa')
        const { data: profile, error: profileError } = await supabase.from('profiles').select('gym_id, gym').eq('id', userId).single()
        if (profileError) throw profileError
        const currentGymId = (profile as { gym_id?: string; gym?: string })?.gym_id ?? (profile as { gym?: string })?.gym
        if (!currentGymId) throw new Error('El perfil no tiene gimnasio asignado')
        if (!active) return
        setGymId(currentGymId)

        const { data, error: usersError } = await supabase
          .from('profiles')
          .select('id, full_name, plan_name, status, checkins, created_at')
          .eq('gym_id', currentGymId)
          .eq('role', 'user')
          .order('created_at', { ascending: false })

        if (!active) return
        if (usersError) {
          setError(usersError.message)
          setUsers([])
        } else {
          setUsers(data ?? [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los usuarios')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Usuarios</p>
        <h1 className="text-2xl font-bold">Miembros y accesos</h1>
        {gymId && <p className="text-xs text-text-secondary mt-1">Gym: {gymId}</p>}
      </div>

      <Card subtitle="Gestión de socios del gimnasio">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary"><Loader2 size={16} className="animate-spin" /> Cargando usuarios</div>
        ) : error ? (
          <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">{error}</div>
        ) : users.length === 0 ? (
          <p className="text-sm text-text-secondary">Sin miembros en este gimnasio.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-text-secondary">
                <tr>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Plan</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Check-ins</th>
                  <th className="py-2">Alta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id ?? Math.random().toString()}>
                    <td className="py-3 font-semibold text-text">{user.full_name ?? 'Sin nombre'}</td>
                    <td className="py-3">{user.plan_name ?? 'N/D'}</td>
                    <td className="py-3">
                      <span
                        className={`pill text-xs ${
                          user.status === 'Activa'
                            ? 'bg-success/15 text-success border-success/30'
                            : user.status === 'Pruebas'
                              ? 'bg-info/15 text-info border-info/30'
                              : user.status === 'Vencida'
                                ? 'bg-error/15 text-error border-error/30'
                                : 'bg-text-secondary/10 text-text border-border'
                        }`}
                      >
                        {user.status ?? 'Sin estado'}
                      </span>
                    </td>
                    <td className="py-3 text-text-secondary">{user.checkins ?? 0}</td>
                    <td className="py-3 text-text-secondary">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default GymAdminUsers
