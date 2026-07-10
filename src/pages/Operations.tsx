import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Anchor, BadgeCheck, Boxes, ChevronRight, CircleDollarSign, CloudSun, Download, FileScan, RefreshCw, Search, ShieldAlert, Ship, Users, Waves, Wind, X } from 'lucide-react'
import { toast } from 'sonner'
import { agencies, cargoDocuments, dataSources, portCalls, type PortCall } from '../data/operationalData'
import { fetchAlatWeather, fetchExchangeRates, type LiveRates, type LiveWeather } from '../services/liveData'
import { Button, Card, PageHeader, StatusBadge } from '../components/UI'
import ShipScene3D from '../components/ShipScene3D'

const clearanceTone = { approved: 'approved', pending: 'pending', review: 'review' } as const

export default function Operations() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PortCall | null>(portCalls[0])
  const [weather, setWeather] = useState<LiveWeather | null>(null)
  const [rates, setRates] = useState<LiveRates | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  const loadLiveData = async () => {
    setLoading(true)
    const [weatherResult, rateResult] = await Promise.allSettled([fetchAlatWeather(), fetchExchangeRates()])
    if (weatherResult.status === 'fulfilled') setWeather(weatherResult.value)
    if (rateResult.status === 'fulfilled') setRates(rateResult.value)
    if (weatherResult.status === 'rejected' || rateResult.status === 'rejected') toast.warning('Canlı mənbələrdən biri əlçatan deyil — son məlumat göstərilir')
    setUpdatedAt(new Date()); setLoading(false)
  }

  useEffect(() => { void loadLiveData() }, [])
  const rows = useMemo(() => portCalls.filter(call => `${call.id} ${call.vessel} ${call.callSign} ${call.imo} ${call.registrationNo}`.toLocaleLowerCase('az').includes(query.toLocaleLowerCase('az'))), [query])
  const totalCargo = portCalls.reduce((sum, item) => sum + item.cargoTons, 0)
  const approvals = portCalls.flatMap(item => Object.values(item.clearances)).filter(item => item === 'approved').length
  const approvalRate = Math.round(approvals / (portCalls.length * 5) * 100)

  const exportCsv = () => {
    const header = 'ID,Gəmi,Çağırış işarəsi,IMO,Məkan,ETA,ETD,Status,Risk\n'
    const content = portCalls.map(item => [item.id, item.vessel, item.callSign, item.imo, item.location, item.eta, item.etd, item.status, item.riskScore].map(value => `"${value}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([header + content], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = 'liman-emeliyyatlari-2026.csv'; link.click(); URL.revokeObjectURL(url)
    toast.success('Əməliyyat siyahısı CSV formatında ixrac edildi')
  }

  return <>
    <PageHeader eyebrow="MARITIME SINGLE WINDOW · VAİS" title="Əməliyyat komandası" description="Gəmi, icazə, manifest və bəyannamələrin vahid canlı idarəetmə ekranı" action={<div className="header-actions"><button className="source-sync" onClick={() => void loadLiveData()}><RefreshCw className={loading ? 'spin' : ''}/><span>{loading ? 'Sinxronlaşdırılır' : updatedAt ? `${updatedAt.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })} yeniləndi` : 'Yenilə'}</span></button><Button onClick={exportCsv}><Download/> Excel / CSV</Button></div>} />

    <section className="ops-live-strip">
      <article><span className="ops-live-icon"><CloudSun/></span><div><small>Ələt · canlı hava</small><strong>{weather ? `${weather.temperature}°C` : '—'}</strong><em><Wind/> {weather ? `${weather.windSpeed} km/saat` : 'Gözlənilir'}</em></div></article>
      <article><span className="ops-live-icon mint"><CircleDollarSign/></span><div><small>USD / AZN</small><strong>{rates ? rates.usdToAzn.toFixed(4) : '—'}</strong><em>İnternet məzənnəsi</em></div></article>
      <article><span className="ops-live-icon amber"><Waves/></span><div><small>Aktiv port çağırışı</small><strong>{portCalls.length}</strong><em>{portCalls.filter(item => item.status === 'Gözləmədə').length} gözləmədə</em></div></article>
      <article><span className="ops-live-icon violet"><Boxes/></span><div><small>Manifest yükü</small><strong>{totalCargo.toLocaleString('az-AZ', { maximumFractionDigits: 0 })} t</strong><em>{cargoDocuments.length} əlaqəli sənəd</em></div></article>
      <article><span className="ops-live-icon green"><BadgeCheck/></span><div><small>Qurum təsdiqləri</small><strong>{approvalRate}%</strong><em>5 qurum üzrə</em></div></article>
    </section>

    <section className="ops-layout">
      <Card className="ops-queue" hover={false}>
        <header className="ops-card-header"><div><span className="pulse-title"><i/> CANLI NÖVBƏ</span><h2>Yeni sorğular</h2><p>VAİS qeydiyyatı və liman çağırışları</p></div><label className="ops-search"><Search/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Gəmi, IMO, qeydiyyat kodu..."/></label></header>
        <div className="ops-table-wrap"><table className="ops-table"><thead><tr><th>Gəmi</th><th>ETA / ETD</th><th>Status</th><th>İcazələr</th><th>Risk</th><th></th></tr></thead><tbody>{rows.map((call, index) => <motion.tr key={call.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }} className={selected?.id === call.id ? 'selected' : ''} onClick={() => setSelected(call)}><td><div className="ops-vessel"><span><Ship/></span><div><strong>{call.vessel}</strong><small>#{call.id} · {call.callSign} · IMO {call.imo}</small></div></div></td><td><strong>{call.eta.split(' ')[1]}</strong><small>{call.eta.split(' ')[0]} → {call.etd.split(' ')[1]}</small></td><td><StatusBadge status={call.status}/></td><td><div className="agency-dots">{Object.entries(call.clearances).map(([agency, state]) => <i key={agency} className={clearanceTone[state]} title={`${agencies[agency as keyof typeof agencies].name}: ${state}`}>{agency.slice(0, 1)}</i>)}</div></td><td><span className={`risk-meter ${call.riskScore > 35 ? 'high' : call.riskScore > 20 ? 'medium' : 'low'}`}><i style={{ width: `${call.riskScore}%` }}/><b>{call.riskScore}</b></span></td><td><ChevronRight/></td></motion.tr>)}</tbody></table></div>
      </Card>

      <AnimatePresence mode="wait">{selected && <motion.aside key={selected.id} className="ops-detail" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
        <Card hover={false}>
          <header className="detail-hero"><div><span className="detail-kicker">PORT CALL #{selected.id}</span><h2>{selected.vessel}</h2><p>{selected.type} · {selected.flag} · IMO {selected.imo}</p></div><button onClick={() => setSelected(null)} aria-label="Detal panelini bağla"><X/></button><span className="detail-live"><i/> AIS LIVE</span></header>
          <div className="ops-ship-visual"><ShipScene3D compact name={selected.vessel} course="074°"/></div>
          <div className="detail-route"><article><small>Əvvəlki liman</small><strong>{selected.previousPort}</strong></article><span><i/><b>AZBAK</b><i/></span><article><small>Növbəti liman</small><strong>{selected.nextPort}</strong></article></div>
          <div className="detail-metrics"><article><Users/><span><small>Ekipaj / sərnişin</small><strong>{selected.crew} / {selected.passengers}</strong></span></article><article><Boxes/><span><small>Yük / avtomobil</small><strong>{selected.cargoTons.toLocaleString()} t / {selected.vehicles}</strong></span></article><article><FileScan/><span><small>Bəyannamə</small><strong>{selected.declarations}</strong></span></article></div>
          <section className="clearance-panel"><header><div><ShieldAlert/><span><strong>Qurumlararası icazələr</strong><small>Elektron təsdiq matrisi</small></span></div><b>{Object.values(selected.clearances).filter(item => item === 'approved').length}/5</b></header>{Object.entries(selected.clearances).map(([agency, state]) => <div className="clearance-row" key={agency}><span className={`agency-logo ${state}`}>{agency}</span><div><strong>{agencies[agency as keyof typeof agencies].name}</strong><small>{state === 'approved' ? 'Elektron təsdiq alınıb' : state === 'review' ? 'Əlavə yoxlama tələb olunur' : 'Qurum cavabı gözlənilir'}</small></div><em className={state}>{state === 'approved' ? 'Təsdiq' : state === 'review' ? 'Yoxlama' : 'Gözləyir'}</em></div>)}</section>
          <Button className="detail-primary" onClick={() => toast.success(`${selected.vessel} üzrə vahid əməliyyat başladıldı`)}><Activity/> Vahid əməliyyatı aç <ChevronRight/></Button>
        </Card>
      </motion.aside>}</AnimatePresence>
    </section>

    <section className="document-intelligence">
      <header><div><span className="title-icon"><FileScan/></span><div><h2>Sənəd intellekti</h2><p>Gömrük bəyannaməsi, manifest, invoys və CMR vahid modeldə</p></div></div><span className="ai-chip"><i/> OCR + DATA MATCHING</span></header>
      <div className="document-grid">{cargoDocuments.map((document, index) => <motion.article key={document.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><header><span>{document.type === 'CMR' ? 'CMR' : String(index + 1).padStart(2, '0')}</span><div><small>{document.type}</small><strong>{document.reference}</strong></div><em className={document.state === 'Doğrulanıb' ? 'verified' : 'processing'}>{document.state}</em></header><dl><div><dt>Marşrut</dt><dd>{document.origin} → {document.destination}</dd></div><div><dt>HS kod</dt><dd>{document.hsCode}</dd></div><div><dt>Ümumi / xalis</dt><dd>{document.grossKg.toLocaleString()} / {document.netKg.toLocaleString()} kq</dd></div><div><dt>Dəyər</dt><dd>{document.value.toLocaleString()} {document.currency}</dd></div></dl><footer><span>{document.consignor}</span><ChevronRight/></footer></motion.article>)}</div>
    </section>

    <section className="source-ribbon"><div><Anchor/><span><strong>Məlumat mənbələri</strong><small>Canlı internet məlumatı ilə normallaşdırılmış əməliyyat modeli</small></span></div>{dataSources.map(source => <article key={source.name}><i/><span><strong>{source.name}</strong><small>{source.description}</small></span><em>{source.kind}</em></article>)}</section>
  </>
}
