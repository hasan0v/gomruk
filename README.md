# Vahid Gömrük-Liman Platforması (VGLP)

## Layihə haqqında

Ələt Beynəlxalq Dəniz Ticarət Limanı ilə Azərbaycan gömrük sisteminin koordinasiyalı işini vizual şəkildə göstərən rəhbərlik təqdimatı üçün prototipdir. Layihənin əsas ideyası gəmi qeydiyyatı, avtomobilin gəmi manifestinə bağlanması və mal bəyannaməsinin əlavə edilməsi proseslərini üç ayrı səhifədən bir vahid əməliyyat ekranına çevirməkdir.

Prototip 2026-cı ilə aid tam sintetik məlumatlardan istifadə edir. Heç bir real gömrük və ya şəxsi məlumat saxlanılmır.

## Tamamlanmış funksiyalar

- Azərbaycan dilində tam adaptiv idarəetmə paneli
- Yığılan glassmorphism yan menyu və mobil menyu
- AIS əsaslı sintetik canlı gəmi xəritəsi: Ələt, Kurık, Aktau və Türkmənbaşı
- Gəmi, avtomobil və GİB üzrə `Cmd/Ctrl + K` sürətli axtarış
- Gəmi → avtomobil → bəyannamə → post qərarı vahid qeydiyyat axını
- 13 rəqəmli avtomobil kodu və nömrə ilə manifest axtarışı
- “Bill of” əlaqəsinin avtomatik yaradılmasının vizual nümayişi
- Konfeti, toast bildirişləri, count-up və Framer Motion animasiyaları
- Bəyannamə cədvəli, HS kodları və ətraflı modal
- Post qərarları tarixçəsi, CSV ixracı və çap/PDF görünüşü
- Recharts ilə trafik, yük, liman payı və səmərəlilik analitikası
- Hər səhifə üçün Azərbaycan dilində React Joyride turu
- Tur vəziyyətinin `localStorage`-da saxlanması
- İşıqlı və qaranlıq mövzu
- Playwright avtomatik screenshot skripti
- Vercel və Cloudflare Pages üçün SPA yönləndirmələri

## Funksional ünvanlar

| Ünvan | Təyinat |
|---|---|
| `/` | Əməliyyat mərkəzi, statistika, canlı xəritə və fəaliyyət axını |
| `/gemiler` | AIS radar, gəmi cədvəli, filter və gəmi detalları |
| `/qeydiyyat` | Əsas vahid qeydiyyat demosu |
| `/beyannameler` | Elektron GİB idarəetməsi və mal detalları |
| `/tarixce` | Post qərarları, audit timeline, CSV/PDF |
| `/analitika` | Trafik, yük və proses səmərəliliyi qrafikləri |
| `/parametrler` | Profil, bildiriş, inteqrasiya və təhlükəsizlik parametrləri |

## Texniki stack

- React 18, TypeScript, Vite
- TailwindCSS 3 və xüsusi komponent dizayn sistemi
- Framer Motion, Lucide React, Zustand, Sonner
- Leaflet və React Leaflet
- Recharts, React CountUp, Canvas Confetti
- React Joyride
- Playwright

## Data arxitekturası

Bütün demo məlumatları `src/data/mockData.ts` faylındadır:

- 12 sintetik gəmi
- 36 sintetik avtomobil
- 24 sintetik bəyannamə
- 18 sintetik post qərarı
- Liman koordinatları və aylıq analitika məlumatları

Bu versiyada backend və daimi yaddaş yoxdur. İstehsal mərhələsində AIS/MarineTraffic tipli gəmi məlumat mənbəyi, Liman Vahid Pəncərəsi və Dövlət Gömrük Komitəsinin strukturlaşdırılmış API-ləri server tərəfli inteqrasiya edilməlidir.

## Quraşdırma və işə salma

```bash
npm install
npm run dev
```

İstehsal build-i:

```bash
npm run build
npm run preview
```

Brauzer ünvanı: `http://localhost:3000`

## Screenshotların hazırlanması

Əvvəlcə preview serverini işə salın, sonra başqa terminalda:

```bash
npm run screenshot
```

Nəticələr `screenshots/` qovluğunda saxlanılır.

## İstifadə qaydası

1. Əsas paneldə ümumi əməliyyat vəziyyətini və gəmi xəritəsini izləyin.
2. `Vahid qeydiyyat` səhifəsində gəmi seçin.
3. Demo üçün `15 AA 859` avtomobil nömrəsini axtarın.
4. Sistem avtomobili liman manifestindən tapıb gəmiyə bağlayacaq.
5. Aktiv GİB-i seçin və `Yoxla və təsdiq et` düyməsini basın.
6. Səhifənin sağ üstündəki `?` düyməsi ilə interaktiv turu istənilən vaxt başladın.

## Hələ real sistemdə tələb olunan işlər

- Liman Vahid Pəncərəsi üçün API icazəsi və sənədləşməsi
- AIS provayderi ilə kommersiya məlumat müqaviləsi
- Gömrük GİB və post qərar API inteqrasiyası
- Dövlət SSO/RBAC və elektron imza
- Audit jurnalının D1 və ya təşkilatın mövcud verilənlər bazasında saxlanması
- Penetrasiya testi, hüquqi uyğunluq və istehsal monitorinqi

## Tövsiyə olunan növbəti addımlar

1. Limandan manifest, gəmi, yük və avtomobil sahələrinin nümunə strukturunu almaq.
2. Gömrük və liman sistemləri arasında vahid məlumat xəritəsi hazırlamaq.
3. Məhdud istifadəçi qrupu ilə Ələt limanında pilot sınaq aparmaq.
4. Orta emal müddəti, təkrar daxil etmə sayı və səhv faizini pilot KPI kimi ölçmək.

## Deployment

- Platformalar: Vercel və Cloudflare Pages uyğun
- Build qovluğu: `dist`
- Framework preset: Vite
- Status: Lokal prototip hazırdır, istehsala yerləşdirilməyib
- Son yenilənmə: 10 iyul 2026
