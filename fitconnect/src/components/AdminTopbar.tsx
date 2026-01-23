import { Download, Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../store/theme'

const AdminTopbar = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between gap-4 px-4 py-3 xl:px-6">
        <div className="flex items-center gap-2">
          <button className="h-10 px-3 inline-flex items-center gap-2 rounded-xl bg-primary text-background text-sm font-semibold">
            <Download size={16} /> Exportar CSV
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="h-10 w-10 flex items-center justify-center rounded-xl border border-border bg-background"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  )
}

export default AdminTopbar
