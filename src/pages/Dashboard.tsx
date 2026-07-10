import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { Anchor, CarFront, ClipboardList, ExternalLink, PackageCheck, Radio, Ship, Sparkles } from 'lucide-react'
import { activities as initialActivities } from '../data/mockData'
import ShipHero from '../components/ShipHero'
import SeaMap from '../components/SeaMap'
import { Card, PageHeader } from '../components/UI'

const stats = [
  { label: 'Bu gün limanda olan gəmilər', value: 12, icon: Ship, color: 'blue', suffix: '' },
  { label: 'Qeydiyyatda olan avtomobillər', value: 347, icon: CarFront, color: 'aqua', suffix: '' },
  { label: 'Aktiv bəyannamələr', value: 89, icon: ClipboardList, color: 'amber', suffix: '' },
  { label: 'Sərhəddən keçən yük', value: 12450, icon: PackageCheck, color: 'green', suffix: ' ton' },
]
export default function Dashboard() {
  const [activities, setActivities] = useState(initialActivities)
  useEffect(() => { const timer = setInterval(() => setActivities(a => [{ text: 'AIS şəbəkəsindən yeni mövqe məlumatı qəbul edildi', time: 'İndi', type: 'gemi' }, ...a.slice(0, 5)]), 12000); return () => clearInterval(timer) }, [])
  return <>
    <PageHeader eyebrow="10 İYUL 2026 · CÜMƏ" title="Əməliyyat mərkəzi" description="Ələt limanı və gömrük əməliyyatlarının vahid real-vaxt görünüşü" action={<div className="system-online"><i /> Bütün sistemlər işləyir</div>} />
    <ShipHero />
    <section className="stats-cards stats-grid">{stats.map((s, i) => <motion.div key={s.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .09 }}><Card className="stat-card"><span className={`stat-icon ${s.color}`}><s.icon /></span><div><small>{s.label}</small><strong><CountUp end={s.value} separator="," duration={1.8} />{s.suffix}</strong><span className="trend">↑ {4 + i * 3}.2% <em>ötən həftəyə görə</em></span></div></Card></motion.div>)}</section>
    <section className="dashboard-grid"><Card className="map-card" hover={false}><header className="card-heading"><div><span className="title-icon"><Radio /></span><div><h2>Canlı gəmi hərəkəti</h2><p>Xəzər dənizi · AIS məlumat axını</p></div></div><button className="link-btn">Tam ekran <ExternalLink size={15} /></button></header><SeaMap compact /></Card>
      <Card className="activity-feed" hover={false}><header className="card-heading"><div><span className="title-icon amber"><Sparkles /></span><div><h2>Son fəaliyyətlər</h2><p>Real-vaxt sistem jurnalı</p></div></div><span className="live-label"><i /> CANLI</span></header><div className="feed-list">{activities.slice(0, 6).map((a, i) => <motion.article initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} key={`${a.text}-${i}`}><span className={`feed-icon ${a.type}`}>{a.type === 'gemi' ? <Ship /> : a.type === 'avtomobil' ? <CarFront /> : a.type === 'beyanname' ? <ClipboardList /> : <Anchor />}</span><div><strong>{a.text}</strong><small>{a.time}</small></div></motion.article>)}</div></Card>
    </section>
    <section className="process-banner"><div className="process-copy"><span>ƏSAS DƏYƏR TƏKLİFİ</span><h2>Əvvəl 3 ayrı proses idi. İndi bir axındır.</h2><p>Gəmi qeydiyyatı, avtomobilin “Bill of” əlaqəsi və mal bəyannaməsi artıq təkrar məlumat daxil etmədən vahid ekranda tamamlanır.</p></div><div className="process-flow"><article><b>1</b><span>Gəmi<br/><small>Avtomatik AIS</small></span></article><i>→</i><article><b>2</b><span>Avtomobil<br/><small>Manifestdən</small></span></article><i>→</i><article><b>3</b><span>Mal<br/><small>GİB-dən</small></span></article><strong>1 ekran</strong></div></section>
  </>
}
