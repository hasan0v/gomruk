import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LoaderCircle, X } from 'lucide-react'
import clsx from 'clsx'

export function Card({ children, className = '', hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return <motion.section whileHover={hover ? { y: -1 } : undefined} className={clsx('glass-card', className)}>{children}</motion.section>
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' | 'success' }) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: .98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx('btn', `btn-${variant}`, className)}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  )
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <header className="page-header">
      <div className="page-header-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status.includes('Təsdiq') || status === 'Buraxıldı' || status === 'Körpüdə' || status === 'Qeydiyyatda' || status.includes('Doğrulan') ? 'success'
    : status === 'Lövbərdə' || status === 'Yolda' || status.includes('Gözlə') || status === 'Yoxlamada' || status.includes('Yönləndir') || status.includes('Emal') ? 'warning'
    : status.includes('Risk') || status.includes('İmtina') ? 'danger'
    : 'info'
  return <span className={`status status-${tone}`}><i />{status}</span>
}

export function Skeleton({ className = '' }: { className?: string }) { return <span className={`skeleton ${className}`} /> }

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title} onMouseDown={onClose}>
      <motion.section
        initial={{ opacity: 0, scale: .92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={clsx('modal', wide && 'modal-wide')}
        onMouseDown={e => e.stopPropagation()}
      >
        <header>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Bağla"><X size={20} /></button>
        </header>
        {children}
      </motion.section>
    </div>
  )
}

export function LoadingScreen() { return <main className="loading-screen"><LoaderCircle className="spin" /><strong>Platforma hazırlanır...</strong></main> }
