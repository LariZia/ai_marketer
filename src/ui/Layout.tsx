import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, Settings2, Box, Image as ImageIcon, UserRound, History as HistoryIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Layout() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 text-slate-800">
      <div className="flex">
        <aside className="w-60 shrink-0 h-screen sticky top-0 hidden md:flex flex-col gap-2 p-4 bg-white/70 backdrop-blur border-r border-slate-200">
          <div className="text-xl font-semibold text-slate-700 mb-2">AI Marketing</div>
          <NavItem to="/" icon={<Home size={18} />} label="Home" end />
          <NavItem to="/services" icon={<Settings2 size={18} />} label="Services" />
          <NavItem to="/products" icon={<Box size={18} />} label="Products" />
          <NavItem to="/thumbnails" icon={<ImageIcon size={18} />} label="Thumbnails" />
          <NavItem to="/avatars" icon={<UserRound size={18} />} label="Avatars" />
          <NavItem to="/history" icon={<HistoryIcon size={18} />} label="History" />
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({ to, icon, label, end }: { to: string; icon: React.ReactNode; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
          isActive ? 'bg-gradient-to-r from-sky-100 to-teal-100 text-sky-700' : 'hover:bg-slate-100 text-slate-600'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}


