import Card from '../components/Card'

const GymAdminGymPanel = () => {
  const schedule = [
    { day: 'Lunes - Viernes', hours: '6:00 - 22:00' },
    { day: 'Sábado', hours: '7:00 - 18:00' },
    { day: 'Domingo', hours: '8:00 - 14:00' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-text-secondary">Mi gimnasio</p>
        <h1 className="text-2xl font-bold">Operación y sedes</h1>
      </div>

      <Card title="Datos principales" subtitle="Información visible para tus usuarios">
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-text">Powerhouse Downtown</p>
            <p className="text-text-secondary">Av. Central 123, Bogotá</p>
            <p className="pill bg-success/15 text-success border-success/30 inline-flex">Abierto</p>
          </div>
          <div className="space-y-2 text-text-secondary">
            <p>Capacidad: 120 personas</p>
            <p>Salas: Cross, Peso libre, Cardio</p>
            <p>Staff activo: 14 entrenadores</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Horario" subtitle="Personaliza apertura y días especiales">
          <ul className="space-y-2 text-sm text-text-secondary">
            {schedule.map((item) => (
              <li key={item.day} className="flex items-center justify-between">
                <span>{item.day}</span>
                <span className="font-semibold text-text">{item.hours}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Servicios" subtitle="Lo que aparece en la app">
          <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
            <span className="pill bg-primary/10 text-primary border-primary/30">Locker</span>
            <span className="pill bg-primary/10 text-primary border-primary/30">Clases grupales</span>
            <span className="pill bg-primary/10 text-primary border-primary/30">Wi-Fi</span>
            <span className="pill bg-primary/10 text-primary border-primary/30">Parqueadero</span>
          </div>
        </Card>
      </div>

      <Card title="Notas operativas" subtitle="Tareas internas de la sede">
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Revisar mantenimiento de caminadoras (jueves)</li>
          <li>• Actualizar aforo en horario pico de la tarde</li>
          <li>• Subir nuevas fotos del box para la app</li>
        </ul>
      </Card>
    </div>
  )
}

export default GymAdminGymPanel
