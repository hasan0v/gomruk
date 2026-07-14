import { useEffect, useState } from 'react'
import type { Declaration } from '../data/mockData'
import { fetchExchangeRates, type LiveRates } from '../services/liveData'

const RATE_CODES = ['USD', 'EUR', 'GBP', 'TRY', 'RUB', 'CNY'] as const

const num = (value: number, digits = 2) =>
  new Intl.NumberFormat('az-AZ', { maximumFractionDigits: digits }).format(value)

function formatDate(d: Declaration) {
  if (d.qeydiyyatTarixi) return d.qeydiyyatTarixi
  if (/^\d{4}-\d{2}-\d{2}$/.test(d.tarix)) {
    const [y, m, day] = d.tarix.split('-')
    return `${day}.${m}.${y}`
  }
  return d.tarix
}

type Row = { label: string; value: string }

function InfoTable({ rows }: { rows: Row[] }) {
  return (
    <table className="decl-info-table">
      <tbody>
        {rows.map(row => (
          <tr key={row.label}>
            <th>{row.label}</th>
            <td>{row.value || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function DeclarationDocumentView({
  declaration: d,
  compact = false,
  /** Qeydiyyatdakı maşın nömrəsi — bəyannamə ilə eyni olmalıdır */
  vehiclePlate,
}: {
  declaration: Declaration
  compact?: boolean
  vehiclePlate?: string
}) {
  const [rates, setRates] = useState<LiveRates | null>(null)

  useEffect(() => {
    let alive = true
    void fetchExchangeRates().then(data => {
      if (alive) setRates(data)
    })
    return () => { alive = false }
  }, [])

  const item = d.mallar[0]
  const gonderen = d.gonderen ?? d.satici
  const gonderenOlke = d.gonderenOlke ?? d.saticiOlke
  const brokerLine = [
    d.broker,
    d.brokerVun ? `(VÖEN: ${d.brokerVun})` : '',
  ].filter(Boolean).join(' ')
  const operatorLine = [
    d.gomrukResmilikAparan,
    d.attestatNo ? `(Attestat №: ${d.attestatNo}${d.attestatTarixi ? `, Tarix: ${d.attestatTarixi}` : ''})` : '',
  ].filter(Boolean).join(' ')

  const adminRows: Row[] = [
    { label: 'Sənədin növü', value: d.senedNovu ?? 'Gömrük bəyannaməsi' },
    { label: 'Bəyannamə №', value: d.kod },
    { label: 'Tarix', value: formatDate(d) },
    { label: 'Göndərən', value: gonderen ? `"${gonderen}"${gonderenOlke ? `, ${gonderenOlke.toUpperCase()}` : ''}` : '—' },
    { label: 'Alıcı', value: d.alici ? `"${d.alici}"${d.aliciOlke ? `, ${d.aliciOlke}` : ''}` : '—' },
    { label: 'Bəyannaməçi / Təmsilçi', value: [brokerLine, d.brokerUnvan].filter(Boolean).join('\n') },
    { label: 'Ticarət edən ölkə', value: d.ticaretolke ? `${d.ticaretolke}${d.ticaretolkeKodu ? ` (${d.ticaretolkeKodu})` : ''}` : '—' },
    { label: 'Mənşə ölkəsi', value: d.menseOlke ?? item.menşe ?? '—' },
    {
      label: 'Sərhəddəki nəqliyyat vasitəsi',
      // Yalnız maşın nömrəsi — liman mətni göstərilmir
      value: (vehiclePlate || d.avtomobil || '').trim() || '—',
    },
    { label: 'Sərhədi keçmə məntəqəsi', value: d.serhedKecmeMentegesi ?? '—' },
    { label: 'Gömrük rəsmiləşdirilməsini aparan şəxs', value: operatorLine || '—' },
    { label: 'Bill of Lading', value: d.billOfLading ?? '—' },
    { label: 'Təyinat gömrük orqanı', value: d.teyinatGomrukOrqani ?? '—' },
  ]

  const goodsRows: Row[] = [
    { label: 'Malın adı və təsviri', value: item.ad },
    { label: 'Yer sayı', value: `${item.miqdar} ${item.olcuVahidi}` },
    { label: 'XİF MN kodu', value: (item.xifMnKodu ?? item.hsKod).replace(/(\d{6})(\d+)/, '$1 $2') },
    { label: 'Brutto çəki (kq)', value: item.bruttoCeki != null ? num(item.bruttoCeki) : '—' },
    { label: 'Netto çəki (kq)', value: item.netCeki != null ? num(item.netCeki) : '—' },
    { label: 'Malın mənşə ölkəsi', value: item.menşe ?? d.menseOlke ?? '—' },
  ]

  return (
    <div className={`decl-doc-view${compact ? ' compact' : ''}`}>
      <div className="fx-rate-line" aria-label="Anlıq valyuta məzənnələri">
        <span className="fx-rate-label">Anlıq məzənnə · AZN</span>
        <div className="fx-rate-items">
          {RATE_CODES.map(code => (
            <span key={code} className="fx-rate-item">
              <b>{code}</b>
              <em>{rates?.toAzn[code] != null ? num(rates.toAzn[code], 4) : '…'}</em>
            </span>
          ))}
        </div>
      </div>

      <header className="decl-doc-head">
        <div>
          <small>GÖMRÜK BƏYANNAMƏSİ · TEMPLATE</small>
          <strong>{d.kod}</strong>
          <span>{d.source ?? 'Elektron gömrük sənədi'}</span>
        </div>
        <em className="decl-status-pill">{d.status}</em>
      </header>

      <section className="decl-doc-section">
        <h3><span>01</span> Ümumi və inzibati məlumatlar</h3>
        <InfoTable rows={adminRows} />
      </section>

      <section className="decl-doc-section">
        <h3><span>02</span> Mal və yük haqqında məlumat</h3>
        {d.mallar.length > 1 && (
          <div className="decl-goods-list">
            {d.mallar.map((mal, idx) => (
              <article key={`${mal.hsKod}-${idx}`}>
                <b>{idx + 1}. {mal.ad}</b>
                <small>XİF {mal.xifMnKodu ?? mal.hsKod} · {mal.miqdar} {mal.olcuVahidi}</small>
              </article>
            ))}
          </div>
        )}
        <InfoTable rows={goodsRows} />
      </section>

      <footer className="decl-doc-note">
        Qeyd: Bəyannamə sistem tərəfindən {formatDate(d)} tarixində buraxılmışdır.
      </footer>
    </div>
  )
}
