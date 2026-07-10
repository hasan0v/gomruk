export type GemiStatus = 'Yanaşıb' | 'Yaxınlaşır' | 'Manevrdə' | 'Yola çıxıb'

export const gemiler = [
  { id: 'IMO9345678', ad: 'Bəxtiyar', novu: 'Konteyner gəmisi', bayraq: 'Azərbaycan', yuk: 'Qarışıq yük', tonaj: 12500, status: 'Yanaşıb' as GemiStatus, kanal: 'Kanal 3', girisTarixi: '2026-06-25T14:30', cixisTarixi: '2026-06-26T09:15', menshe: 'Aktau, Qazaxıstan', lat: 39.4823, lng: 49.4056, suret: 0.2 },
  { id: 'IMO9251845', ad: 'Şah İsmayıl', novu: 'Ro-Ro gəmisi', bayraq: 'Azərbaycan', yuk: 'Avtomobillər', tonaj: 9800, status: 'Yaxınlaşır' as GemiStatus, kanal: 'Kanal 1', girisTarixi: '2026-07-10T12:40', cixisTarixi: '2026-07-11T08:00', menshe: 'Kurık, Qazaxıstan', lat: 40.12, lng: 49.96, suret: 12.4 },
  { id: 'IMO9472102', ad: 'Nizami Gəncəvi', novu: 'Quru yük gəmisi', bayraq: 'Azərbaycan', yuk: 'Taxıl', tonaj: 14200, status: 'Manevrdə' as GemiStatus, kanal: 'Kanal 2', girisTarixi: '2026-07-10T09:15', cixisTarixi: '2026-07-11T14:00', menshe: 'Türkmənbaşı, Türkmənistan', lat: 39.61, lng: 49.57, suret: 3.1 },
  { id: 'IMO9187342', ad: 'Xəzər-1', novu: 'Bərə', bayraq: 'Azərbaycan', yuk: 'TIR və sərnişin', tonaj: 8100, status: 'Yola çıxıb' as GemiStatus, kanal: '—', girisTarixi: '2026-07-09T16:00', cixisTarixi: '2026-07-10T07:35', menshe: 'Ələt, Azərbaycan', lat: 40.41, lng: 50.44, suret: 14.8 },
  { id: 'IMO9654201', ad: 'Aktau Star', novu: 'Ro-Ro gəmisi', bayraq: 'Qazaxıstan', yuk: 'Sənaye avadanlığı', tonaj: 11800, status: 'Yaxınlaşır' as GemiStatus, kanal: 'Gözləmə zonası', girisTarixi: '2026-07-10T18:20', cixisTarixi: '2026-07-11T17:00', menshe: 'Aktau, Qazaxıstan', lat: 41.48, lng: 50.62, suret: 11.2 },
  { id: 'IMO9531188', ad: 'Türkmən Ulduzu', novu: 'Quru yük gəmisi', bayraq: 'Türkmənistan', yuk: 'Tekstil və polimer', tonaj: 10600, status: 'Yaxınlaşır' as GemiStatus, kanal: 'Gözləmə zonası', girisTarixi: '2026-07-11T02:10', cixisTarixi: '2026-07-12T06:00', menshe: 'Türkmənbaşı, Türkmənistan', lat: 40.28, lng: 51.94, suret: 10.6 },
  { id: 'IMO9012844', ad: 'Qarabağ', novu: 'Konteyner gəmisi', bayraq: 'Azərbaycan', yuk: 'Konteyner', tonaj: 15200, status: 'Yanaşıb' as GemiStatus, kanal: 'Kanal 5', girisTarixi: '2026-07-10T06:10', cixisTarixi: '2026-07-10T22:00', menshe: 'Kurık, Qazaxıstan', lat: 39.49, lng: 49.42, suret: 0 },
  { id: 'IMO9725100', ad: 'Caspian Bridge', novu: 'Bərə', bayraq: 'Qazaxıstan', yuk: 'Avtomobillər', tonaj: 8900, status: 'Manevrdə' as GemiStatus, kanal: 'Kanal 4', girisTarixi: '2026-07-10T11:40', cixisTarixi: '2026-07-11T05:00', menshe: 'Aktau, Qazaxıstan', lat: 39.56, lng: 49.49, suret: 2.6 },
  { id: 'IMO9447621', ad: 'Odlar Yurdu', novu: 'Tanker', bayraq: 'Azərbaycan', yuk: 'Maye yük', tonaj: 17600, status: 'Yola çıxıb' as GemiStatus, kanal: '—', girisTarixi: '2026-07-08T21:00', cixisTarixi: '2026-07-10T03:20', menshe: 'Ələt, Azərbaycan', lat: 41.1, lng: 51.1, suret: 13.5 },
  { id: 'IMO9633014', ad: 'Kuryk Express', novu: 'Ro-Ro gəmisi', bayraq: 'Qazaxıstan', yuk: 'TIR', tonaj: 10300, status: 'Yaxınlaşır' as GemiStatus, kanal: 'Gözləmə zonası', girisTarixi: '2026-07-11T07:40', cixisTarixi: '2026-07-12T02:00', menshe: 'Kurık, Qazaxıstan', lat: 42.12, lng: 50.88, suret: 11.9 },
  { id: 'IMO9507732', ad: 'Balkan', novu: 'Quru yük gəmisi', bayraq: 'Türkmənistan', yuk: 'Gübrə', tonaj: 13100, status: 'Yola çıxıb' as GemiStatus, kanal: '—', girisTarixi: '2026-07-08T13:20', cixisTarixi: '2026-07-09T19:10', menshe: 'Ələt, Azərbaycan', lat: 40.02, lng: 52.2, suret: 12.8 },
  { id: 'IMO9205173', ad: 'Zəfər', novu: 'Konteyner gəmisi', bayraq: 'Azərbaycan', yuk: 'Qarışıq yük', tonaj: 14700, status: 'Yanaşıb' as GemiStatus, kanal: 'Kanal 6', girisTarixi: '2026-07-09T22:10', cixisTarixi: '2026-07-10T19:00', menshe: 'Aktau, Qazaxıstan', lat: 39.47, lng: 49.39, suret: 0 },
]

const adlar = ['Elçin Məmmədov', 'Rəşad Əliyev', 'Tural Hüseynov', 'Samir Quliyev', 'Namiq Rzayev', 'Orxan İsmayılov']
const yukler = ['Elektronika', 'Tekstil', 'Avtomobil hissələri', 'Qida məhsulları', 'Sənaye avadanlığı', 'Tikinti materialları']
export const avtomobiller = Array.from({ length: 36 }, (_, i) => ({
  kod: String(1234567890123 + i),
  nomre: i === 0 ? '15 AA 859' : i === 1 ? '45 AA 589' : `${10 + (i % 80)} ${['AB', 'CD', 'EF', 'GH'][i % 4]} ${String(120 + i * 17).slice(-3)}`,
  surucu: adlar[i % adlar.length], marka: ['Volvo FH16', 'Mercedes Actros', 'DAF XF', 'MAN TGX'][i % 4],
  gemi: gemiler[i % 8].id, yuk: yukler[i % yukler.length], menshe: ['Aktau', 'Kurık', 'Türkmənbaşı'][i % 3], teyinat: ['Bakı', 'Gəncə', 'Tbilisi'][i % 3], status: i % 5 === 0 ? 'Yoxlanılır' : 'Qeydiyyatda',
}))

export const beyannameler = Array.from({ length: 24 }, (_, i) => ({
  kod: i === 0 ? '3-33-3900/2-001059' : `3-33-${3901 + i}/2-${String(1059 + i).padStart(6, '0')}`,
  tarix: `2026-07-${String((i % 10) + 1).padStart(2, '0')}`, broker: ['Kaspian Logistics MMC', 'TransCaspian Broker', 'İpək Yolu Gömrük MMC'][i % 3],
  avtomobil: avtomobiller[i % avtomobiller.length].nomre,
  mallar: [{ hsKod: ['8517.12.00', '8471.30.00', '8708.99.00'][i % 3], ad: yukler[i % yukler.length], miqdar: 100 + i * 25, olcuVahidi: i % 2 ? 'kq' : 'ədəd', deyer: 45000 + i * 8200 }],
  umumiDeyer: 45000 + i * 8200, valyuta: 'USD', alici: ['TechShop MMC', 'AzTicarət ASC', 'Baku Industrial MMC'][i % 3], satici: ['Kazakh Export LLP', 'Turkmen Trade AS', 'Steppe Logistics LLP'][i % 3], status: i % 4 === 0 ? 'Yoxlamada' : i % 7 === 0 ? 'Risk nəzarəti' : 'Təsdiqlənib',
}))

export const postQerarlar = Array.from({ length: 18 }, (_, i) => ({
  tarix: `2026-07-${String(10 - (i % 10)).padStart(2, '0')}`, kod: i % 3 === 0 ? '545' : String(540 + (i % 9)), gemi: gemiler[i % gemiler.length].ad, novu: i % 2 ? 'Çıxış' : 'Giriş', status: i % 5 === 0 ? 'Gözləmədə' : 'Təsdiqləndi', operator: ['A. Məmmədli', 'N. Hüseynov', 'Sistem'][i % 3],
}))

export const limanlar = [
  { ad: 'Ələt', olke: 'Azərbaycan', lat: 39.4823, lng: 49.4056, esas: true },
  { ad: 'Kurık', olke: 'Qazaxıstan', lat: 43.1958, lng: 51.6633 },
  { ad: 'Aktau', olke: 'Qazaxıstan', lat: 43.652, lng: 51.1972 },
  { ad: 'Türkmənbaşı', olke: 'Türkmənistan', lat: 40.01, lng: 52.97 },
]

export const ayliqStatistika = [
  { ay: 'Yan', gemi: 81, yuk: 88, avtomobil: 1420 }, { ay: 'Fev', gemi: 75, yuk: 76, avtomobil: 1310 },
  { ay: 'Mar', gemi: 94, yuk: 101, avtomobil: 1680 }, { ay: 'Apr', gemi: 108, yuk: 112, avtomobil: 1920 },
  { ay: 'May', gemi: 116, yuk: 126, avtomobil: 2110 }, { ay: 'İyn', gemi: 128, yuk: 139, avtomobil: 2340 },
  { ay: 'İyl', gemi: 72, yuk: 81, avtomobil: 1280 },
]

export const activities = [
  { text: '“Şah İsmayıl” gəmisi Ələt limanına yaxınlaşır', time: 'İndi', type: 'gemi' },
  { text: '15 AA 859 nömrəli avtomobil avtomatik tanındı', time: '2 dəq əvvəl', type: 'avtomobil' },
  { text: 'GİB 3-33-3900/2-001059 sistemə inteqrasiya edildi', time: '5 dəq əvvəl', type: 'beyanname' },
  { text: '“Qarabağ” gəmisi Kanal 5-ə yanaşdı', time: '9 dəq əvvəl', type: 'gemi' },
  { text: '545 nömrəli giriş post qərarı təsdiqləndi', time: '13 dəq əvvəl', type: 'qerar' },
]
