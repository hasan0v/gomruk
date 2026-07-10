import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import type { Step } from 'react-joyride'
import Layout from './components/Layout'
import PageTour from './components/PageTour'
import Dashboard from './pages/Dashboard'
import Ships from './pages/Ships'
import Registration from './pages/Registration'
import Declarations from './pages/Declarations'
import HistoryPage from './pages/HistoryPage'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/SettingsPage'
import Operations from './pages/Operations'

const tours: Record<string, Step[]> = {
  '/': [
    { target: '.hero-map', content: 'Bu vizual xəritə vahid məlumat axınını göstərir: gəmi Xəzərdən Ələt limanına yaxınlaşarkən AIS vasitəsilə avtomatik tanınır.', placement: 'bottom' },
    { target: '.stats-cards', content: 'Cari əməliyyat göstəriciləri real vaxtda yenilənir: gəmilər, avtomobillər, bəyannamələr və yük həcmi.' },
    { target: '.map-card', content: 'Ələt, Kurık, Aktau və Türkmənbaşı arasında bütün gəmi hərəkətlərini buradan izləyin.' },
    { target: '.activity-feed', content: 'Sistemdə baş verən bütün əməliyyatlar real-vaxt jurnalına əlavə olunur.' },
    { target: '.process-banner', content: 'Platformanın əsas ideyası budur: üç ayrı qeydiyyat prosesi bir vahid ekrana çevrilir.' },
    { target: '.global-search', content: '⌘K və ya Ctrl+K ilə gəmi, avtomobil və GİB kodunu dərhal tapın.' },
  ],
  '/emeliyyatlar': [
    { target: '.ops-live-strip', content: 'Canlı hava, məzənnə, port çağırışları və təsdiq göstəriciləri internet mənbələrindən və əməliyyat modelindən birləşdirilir.' },
    { target: '.ops-queue', content: 'VAİS və Maritime Single Window sorğuları gəmi, ETA/ETD, status, icazə və risk göstəriciləri ilə vahid növbədədir.' },
    { target: '.ops-detail', content: 'Seçilmiş gəminin marşrutu, ekipajı, yükü və beş qurum üzrə elektron icazələri burada izlənir.' },
    { target: '.document-intelligence', content: 'Manifest, invoys, CMR və gömrük bəyannaməsi normallaşdırılmış sənəd modelində əlaqələndirilir.' },
  ],
  '/gemiler': [
    { target: '.radar-panel', content: 'AIS radar paneli gəmi mövqelərini sintetik real-vaxt məlumatı ilə göstərir.' },
    { target: '.auto-badge', content: 'Gəmi limana yaxınlaşdıqda IMO kodu ilə avtomatik tanınır və qeydiyyata düşür.' },
    { target: '.ship-kpis', content: 'Əməliyyat vəziyyətini bu göstəricilərdən izləyin.' },
    { target: '.ship-table-card', content: 'Gəmiləri ada, IMO koduna, yükə və statusa görə axtarın və süzgəcdən keçirin.' },
    { target: '.tour-button', content: 'Bu turu istənilən vaxt sual düyməsi ilə yenidən başlada bilərsiniz.' },
  ],
  '/qeydiyyat': [
    { target: '.value-ribbon', content: 'Əsas yenilik: əvvəl üç səhifədə görülən iş indi bir axında cəmi 3 dəqiqəyə tamamlanır.' },
    { target: '.registration-stepper', content: 'Addım göstəricisi prosesin cari vəziyyətini real vaxtda göstərir.' },
    { target: '.step-ship', content: '1-ci addım: AIS-in avtomatik qeydə aldığı limandakı gəmini seçin. Bütün gəmi sahələri özü dolur.' },
    { target: '.step-vehicle', content: '2-ci addım: avtomobil nömrəsini və ya 13 rəqəmli kodu yazın. Lupa əməliyyatı liman manifestində axtarış aparır.' },
    { target: '.step-goods', content: '3-cü addım: brokerin verdiyi aktiv GİB-lər avtomatik gətirilir; uyğun olanı bir kliklə seçin.' },
    { target: '.registration-summary', content: 'Sağdakı xülasə gəmi → avtomobil → mal → post qərarı əlaqəsini aydın göstərir.' },
    { target: '.confirm-btn', content: 'Bütün məlumatlar tamamlandıqdan sonra vahid təsdiq düyməsi post qərarını yaradır.' },
    { target: '.auto-mode', content: 'AIS, Liman Vahid Pəncərəsi və Gömrük sistemi arxa planda koordinasiyalı işləyir.' },
  ],
  '/beyannameler': [
    { target: '.mini-stats', content: 'Bəyannamələrin ümumi vəziyyəti və risk göstəriciləri.' },
    { target: '.declarations-table', content: 'Brokerdən gələn GİB-lər gömrük sistemindən avtomatik sinxronlaşdırılır.' },
    { target: '.table-tools', content: 'Tarix, broker, avtomobil və status üzrə sürətli axtarış edin.' },
    { target: '.row-action', content: 'Hər bəyannamənin mal, HS kodu, alıcı və satıcı detallarını açın.' },
  ],
  '/tarixce': [
    { target: '.timeline-card', content: 'Bütün giriş-çıxış əməliyyatları zaman xəttində görünür.' },
    { target: '.history-table', content: 'Post qərarları, operator və status məlumatları dəyişməz audit jurnalında saxlanır.' },
    { target: '.header-actions', content: 'Qeydləri PDF və CSV formatlarında ixrac edin.' },
  ],
  '/analitika': [
    { target: '.analytics-kpis', content: 'Əsas performans göstəriciləri: müddət, trafik, yük və avtomatlaşdırma səviyyəsi.' },
    { target: '.analytics-grid .wide', content: 'Aylıq gəmi trafikini və yük dinamikasını müqayisə edin.' },
    { target: '.port-legend', content: 'Ən aktiv tərəfdaş limanların marşrut payları.' },
    { target: '.insight-card', content: 'Sistem əməliyyat məlumatlarından rəhbərlik üçün avtomatik insayt hazırlayır.' },
  ],
  '/parametrler': [{ target: '.settings-grid', content: 'Profil, bildiriş, inteqrasiya və təhlükəsizlik seçimlərini buradan idarə edin.' }],
}

export default function App() {
  const location = useLocation(); const key = location.pathname; const steps = useMemo(() => tours[key] || tours['/'], [key]); const [run, setRun] = useState(false)
  useEffect(() => { setRun(false); const timer = setTimeout(() => { if (!localStorage.getItem(`vglp-tour-${key}`)) setRun(true) }, 650); return () => clearTimeout(timer) }, [key])
  return <Layout onTour={() => setRun(true)}><PageTour run={run} setRun={setRun} steps={steps} storageKey={key}/><Routes><Route path="/" element={<Dashboard/>}/><Route path="/emeliyyatlar" element={<Operations/>}/><Route path="/gemiler" element={<Ships/>}/><Route path="/qeydiyyat" element={<Registration/>}/><Route path="/beyannameler" element={<Declarations/>}/><Route path="/tarixce" element={<HistoryPage/>}/><Route path="/analitika" element={<Analytics/>}/><Route path="/parametrler" element={<SettingsPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Layout>
}
