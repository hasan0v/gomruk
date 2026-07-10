import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Activity, Anchor, BarChart3, Bell, ChevronLeft, ClipboardCheck, FileText, History, LayoutDashboard, Menu, Moon, Search, Settings, Ship, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { avtomobiller, beyannameler, gemiler } from '../data/mockData'

const links = [
  ['/', 'İdarə paneli', LayoutDashboard], ['/emeliyyatlar', 'Əməliyyat komandası', Activity], ['/gemiler', 'Gəmi idarəetməsi', Ship], ['/qeydiyyat', 'Vahid qeydiyyat', ClipboardCheck],
  ['/beyannameler', 'Bəyannamələr', FileText], ['/tarixce', 'Tarixçə və qərarlar', History], ['/analitika', 'Analitika', BarChart3], ['/parametrler', 'Parametrlər', Settings],
] as const

export default function Layout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const { dark, toggleDark, sidebarOpen, setSidebarOpen, commandOpen, setCommandOpen } = useAppStore()
  const navigate = useNavigate(); const location = useLocation()
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  useEffect(() => { const fn = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCommandOpen(true) } }; addEventListener('keydown', fn); return () => removeEventListener('keydown', fn) }, [setCommandOpen])
  return <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <header className="brand"><span className="brand-mark"><Anchor /></span>{!collapsed && <div><strong>VGLP</strong><small>Vahid rəqəmsal liman</small></div>}<button className="mobile-close" onClick={() => setSidebarOpen(false)}><X /></button></header>
      <nav aria-label="Əsas naviqasiya">{links.map(([to, label, Icon]) => <NavLink key={to} end={to === '/'} to={to} onClick={() => setSidebarOpen(false)}><Icon size={20} /><span>{label}</span>{to === '/emeliyyatlar' && <b>CANLI</b>}</NavLink>)}</nav>
      {!collapsed && <section className="integration-card"><span><i /> SİSTEMLƏR AKTİVDİR</span><strong>Liman ↔ Gömrük</strong><small>AIS və Vahid Pəncərə əlaqəsi</small><div><em>99.8%</em><small>inteqrasiya</small></div></section>}
      <button className="collapse-btn" onClick={() => setCollapsed(v => !v)} aria-label="Yan paneli yığ"><ChevronLeft className={collapsed ? 'rotate' : ''} /></button>
    </aside>
    <div className="content-shell">
      <header className="topbar"><button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Menyunu aç"><Menu /></button><button className="global-search" onClick={() => setCommandOpen(true)}><Search size={18} /><span>Gəmi, avtomobil və ya bəyannamə axtar...</span><kbd>⌘ K</kbd></button><div className="top-actions"><button className="icon-btn" aria-label="Bildirişlər"><Bell /><i className="notification-dot">3</i></button><button className="icon-btn" onClick={toggleDark} aria-label="Mövzunu dəyiş">{dark ? <Sun /> : <Moon />}</button><div className="profile"><span>AH</span><div><strong>Ali Həsənov</strong><small>Şöbə rəhbəri</small></div></div></div></header>
      <AnimatePresence mode="wait"><motion.main key={location.pathname} className="main-content" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .24 }}>{children}</motion.main></AnimatePresence>
      <footer>© 2026 Vahid Gömrük-Liman Platforması <span>•</span> Rəhbərlik üçün vizual prototip</footer>
    </div>
    <AnimatePresence>{commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} onSelect={(path) => { navigate(path); setCommandOpen(false) }} />}</AnimatePresence>
    {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}
  </div>
}

function CommandPalette({ onClose, onSelect }: { onClose: () => void; onSelect: (p: string) => void }) {
  const [q, setQ] = useState('')
  const results = useMemo(() => {
    if (!q) return [{ title: 'Əməliyyat komandasını aç', sub: 'MSW + VAİS vahid canlı görünüş', path: '/emeliyyatlar', icon: '→' }, { title: 'Vahid qeydiyyata keç', sub: 'Gəmi → avtomobil → bəyannamə', path: '/qeydiyyat', icon: '→' }, { title: 'Canlı gəmi xəritəsi', sub: 'AIS radar paneli', path: '/gemiler', icon: '→' }]
    const s = q.toLocaleLowerCase('az')
    return [
      ...gemiler.filter(x => `${x.ad} ${x.id}`.toLocaleLowerCase('az').includes(s)).slice(0, 4).map(x => ({ title: x.ad, sub: `${x.id} · ${x.status}`, path: '/gemiler', icon: 'G' })),
      ...avtomobiller.filter(x => `${x.nomre} ${x.kod}`.toLowerCase().includes(s)).slice(0, 4).map(x => ({ title: x.nomre, sub: `${x.surucu} · ${x.yuk}`, path: '/qeydiyyat', icon: 'A' })),
      ...beyannameler.filter(x => x.kod.toLowerCase().includes(s)).slice(0, 4).map(x => ({ title: x.kod, sub: `${x.broker} · ${x.status}`, path: '/beyannameler', icon: 'B' })),
    ]
  }, [q])
  return <motion.div className="command-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.section className="command" initial={{ scale: .96, y: -20 }} animate={{ scale: 1, y: 0 }} onMouseDown={e => e.stopPropagation()}><header><Search /><input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Sürətli axtarış..."/><kbd>ESC</kbd></header><div className="command-results">{results.length ? results.map((r, i) => <button key={i} onClick={() => onSelect(r.path)}><span>{r.icon}</span><div><strong>{r.title}</strong><small>{r.sub}</small></div></button>) : <p>Nəticə tapılmadı</p>}</div><footer><span>↑↓ seçim</span><span>↵ aç</span><span>ESC bağla</span></footer></motion.section></motion.div>
}
