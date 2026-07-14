import { motion, useReducedMotion } from 'framer-motion'
import { Activity, Radio, ShieldCheck } from 'lucide-react'
import ShipScene3D from './ShipScene3D'

export default function ShipHero() {
  const reduceMotion = useReducedMotion()
  return <section className="ship-hero hero-map cinematic-hero">
    <div className="hero-aurora" aria-hidden="true"><i/><i/><i/></div>
    <motion.div className="hero-copy" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65 }}>
      <span className="eyebrow light">VAHİD RƏQƏMSAL KOORDİNASİYA</span>
      <h1>Limandan gömrüyə —<br/><em>vahid məlumat axını</em></h1>
      <p>AIS, liman manifesti və gömrük bəyannaməsi ağıllı əməliyyat nüvəsində birləşir.</p>
      <div className="hero-pills"><span><Activity/> 3 proses → 1 ekran</span><span><ShieldCheck/> Kağızsız əməliyyat</span><span><Radio/> Vahid nəzarət</span></div>
    </motion.div>
    <motion.div className="hero-ship-stage" initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15, duration: .8 }}>
      <ShipScene3D name="SHAHDAG RORO" course="074°"/>
      <motion.div className="alat-beacon" animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}><i/><span><small>TƏYİNAT</small><strong>ƏLƏT LİMANI</strong></span></motion.div>
    </motion.div>
  </section>
}
