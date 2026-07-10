import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LoaderCircle, X } from 'lucide-react'
import clsx from 'clsx'

export function Card({ children, className = '', hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return <motion.section whileHover={hover ? { y: -3 } : undefined} className={clsx('glass-card', className)}>{children}</motion.section>
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' | 'success' }) {
  const motionProps = props as Record<string, unknown>
  return <motion.button whileTap={{ scale: .96 }} whileHover={{ y: -1 }} className={clsx('btn', `btn-${variant}`, className)} {...motionProps}>{children}</motion.button>
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <header className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</header>
}

export function StatusBadge({ status }: { status: string }) {
  const tone = status.includes('Təsdiq') || status === 'Yanaşıb' || status === 'Qeydiyyatda' ? 'success' : status.includes('Yaxın') || status.includes('Gözlə') || status === 'Yoxlamada' ? 'warning' : status.includes('Risk') ? 'danger' : 'info'
  return <span className={`status status-${tone}`}><i />{status}</span>
}

export function Skeleton({ className = '' }: { className?: string }) { return <span className={`skeleton ${className}`} /> }

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title} onMouseDown={onClose}>
    <motion.section initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="modal" onMouseDown={e => e.stopPropagation()}>
      <header><h2>{title}</h2><button onClick={onClose} aria-label="Bağla"><X size={20} /></button></header>{children}
    </motion.section>
  </div>
}

export function LoadingScreen() { return <main className="loading-screen"><LoaderCircle className="spin" /><strong>Platforma hazırlanır...</strong></main> }
