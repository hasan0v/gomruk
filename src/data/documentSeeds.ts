/**
 * Imported document seed data.
 *
 * These records are intentionally local and versioned with the prototype.
 * `sourceScan` points to the original scan in ../../imgs so that the full
 * source document remains available when a field has not been transcribed.
 */
export type ManifestEntrySeed = {
  billOfLading: string
  cargo: string
  grossTons: number
  netTons: number
  vehicleOrder?: string
  /** Scandakı “vehicle marks and numbers” sütunu; bir qoşqu üçün bir neçə ID ola bilər. */
  vehicleIds: string[]
  sourceScan: string
}

const manifestPage = (file: string) => `../../imgs/${file}`

export const cargoDeclarationSeed = {
  id: 'CD-AZ-ALAT-KURIK-2026-06-13',
  type: 'Cargo declaration',
  shippingLine: 'Azerbaijan Caspian Shipping Company',
  vessel: 'AZƏRBAYCAN',
  nationality: 'Azərbaycan',
  master: 'Pirmuradov A.D.',
  port: 'Ələt',
  route: 'Ələt → Kurık',
  date: '2026-06-13',
  cargoUnits: 38,
  cargoDescription: 'Yük / müşayiətsiz qoşqu / göyərtə yükü',
  grossTons: 1187,
  sourceScan: manifestPage('RECTIFY_IMG_20260710_121821.jpg.jpeg'),
}

/** 40 sətirli Ələt–Kurık manifestinin normallaşdırılmış indeksidir. */
export const alatKurikManifestSeed: ManifestEntrySeed[] = [
  { billOfLading: '245263', cargo: 'Weight material in oilwell cement', grossTons: 33.216, netTons: 18.216, vehicleOrder: '4472', vehicleIds: ['77JK093', '99YM093'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245275', cargo: 'Frozen salmon', grossTons: 27.018, netTons: 20.618, vehicleOrder: '4513', vehicleIds: ['MF222YA', 'SS343B'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245276', cargo: 'Frozen salmon', grossTons: 37, netTons: 21, vehicleOrder: '4514', vehicleIds: ['TT032HT', 'LI500Z'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245282', cargo: 'IBC tanks', grossTons: 22.291, netTons: 7.291, vehicleOrder: '4204', vehicleIds: ['YY561ZZ', 'LL613V'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245283', cargo: 'Medicaments', grossTons: 25.843, netTons: 9.843, vehicleOrder: '4482', vehicleIds: ['AE7178IK', 'AE6970XM'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245284', cargo: 'New tyres', grossTons: 25.499, netTons: 10.499, vehicleOrder: '4483', vehicleIds: ['IS60TIR', 'CJ63AIG'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245286', cargo: 'Spare parts', grossTons: 28.462, netTons: 13.462, vehicleOrder: '4487', vehicleIds: ['ME025RA', 'BS285B'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121830.jpg.jpeg') },
  { billOfLading: '245287', cargo: 'Carts', grossTons: 21.975, netTons: 5.975, vehicleOrder: '4488', vehicleIds: ['K1959NG', 'K1969G'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245288', cargo: 'Advertising equipment', grossTons: 24.9, netTons: 9.9, vehicleOrder: '4490', vehicleIds: ['VS45ZZ', 'VS46ZZ'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245289', cargo: 'Mineral curb (online payment)', grossTons: 36.93, netTons: 21.93, vehicleOrder: '4495', vehicleIds: ['PF275PP', 'BB850D'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245293', cargo: 'Veterinary medicines', grossTons: 34.3, netTons: 19.3, vehicleOrder: '4506', vehicleIds: ['VV656VU', 'KI959G'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245320', cargo: 'Izelia Sanitarno equipment', grossTons: 26.766, netTons: 10.366, vehicleOrder: '4504', vehicleIds: ['KA9341KE', 'AA9662XF'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245321', cargo: 'Izelia Sanitarno equipment', grossTons: 23.797, netTons: 10.397, vehicleOrder: '4503', vehicleIds: ['KA6930IK', 'AA9630XF'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245324', cargo: 'Elementary reducing tee 90 degrees', grossTons: 39.075, netTons: 10.075, vehicleOrder: '4437', vehicleIds: ['QY018YQ', 'HH255T'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245325', cargo: 'Chemical Versamul emulsifier', grossTons: 31.12, netTons: 16.12, vehicleOrder: '4330', vehicleIds: ['GE110NO', 'TE1100'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245327', cargo: 'Control room', grossTons: 45.05, netTons: 23.35, vehicleOrder: '4477', vehicleIds: ['06CFF656', '06EZC480'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245329', cargo: 'Electrodes', grossTons: 34.756, netTons: 19.756, vehicleOrder: '3841', vehicleIds: ['B6588AQ', 'BN734'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245333', cargo: 'Extruder parts', grossTons: 18.47, netTons: 3.47, vehicleOrder: '4332', vehicleIds: ['KAQ1487', 'KAQ1475'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245336', cargo: 'Parts for pipings', grossTons: 25.754, netTons: 10.754, vehicleOrder: '4336', vehicleIds: ['KAA8783', 'KAA8759'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121836.jpg.jpeg') },
  { billOfLading: '245339', cargo: 'Cars', grossTons: 26.651, netTons: 5.651, vehicleOrder: '4565', vehicleIds: ['99SH820', '99ZB089'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245342', cargo: 'Range Rover cars', grossTons: 20.064, netTons: 5.064, vehicleOrder: '4566', vehicleIds: ['77XL409', '99YC449'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245343', cargo: 'Mobil screen', grossTons: 20, netTons: 20, vehicleOrder: '4407', vehicleIds: ['06G84164'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245344', cargo: 'Yogurt', grossTons: 31.738, netTons: 15.738, vehicleOrder: '4549', vehicleIds: ['90CY711', '99ZB883'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245345', cargo: 'Sredstvo po ukhodu za volosami', grossTons: 37.189, netTons: 21.789, vehicleOrder: '4481', vehicleIds: ['CE7784BT', 'CE9949XX'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245346', cargo: 'New tyres', grossTons: 26.264, netTons: 11.264, vehicleOrder: '4515', vehicleIds: ['VS90TIR', 'CJ60AIG'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245347', cargo: 'Sac kremi – Deterjan', grossTons: 36.588, netTons: 21.588, vehicleOrder: '4520', vehicleIds: ['27AUD295', '27ARJ621'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245348', cargo: 'Deterjan', grossTons: 35.819, netTons: 20.819, vehicleOrder: '4521', vehicleIds: ['27BEE210', '27BD815'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245349', cargo: 'Sampuan – Deterjan', grossTons: 35.134, netTons: 20.134, vehicleOrder: '4522', vehicleIds: ['27BFT373', '27BFT362'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245350', cargo: 'Deodorant – Sampuan', grossTons: 32.227, netTons: 17.227, vehicleOrder: '4523', vehicleIds: ['27AVL229', '27AVG223'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245351', cargo: 'Protein-fat product', grossTons: 37.374, netTons: 20.674, vehicleOrder: '4526', vehicleIds: ['AX3669PB', 'AX9972XX'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245352', cargo: 'Fuel filter', grossTons: 17.473, netTons: 2.473, vehicleOrder: '3173', vehicleIds: ['77JL804', '99YH248'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245353', cargo: 'Mясное product', grossTons: 37.046, netTons: 2.046, vehicleOrder: '4510', vehicleIds: ['77JY946', '99YK946'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121844.jpg.jpeg') },
  { billOfLading: '245354', cargo: 'Protein-fat product', grossTons: 36.747, netTons: 20.747, vehicleOrder: '4532', vehicleIds: ['AX4677KP', 'AX1578XO'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245355', cargo: 'Protein-fat product', grossTons: 36.735, netTons: 20.735, vehicleOrder: '4533', vehicleIds: ['AX3570MC', 'AX8260XT'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245356', cargo: 'Myasnaya produktsiya', grossTons: 36.495, netTons: 21.495, vehicleOrder: '4534', vehicleIds: ['BH0936TT', 'BH1187XG'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245357', cargo: 'Frozen salmon', grossTons: 35.022, netTons: 19.022, vehicleOrder: '4557', vehicleIds: ['CC848WW', 'AA590V'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245360', cargo: 'Boat Navan C30', grossTons: 20.888, netTons: 3.888, vehicleOrder: '4607', vehicleIds: ['HF8471', 'A892G'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245361', cargo: 'Silindr val', grossTons: 1.965, netTons: 1.965, vehicleIds: [], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245362', cargo: 'Spare parts', grossTons: 33.7, netTons: 18.7, vehicleOrder: '4489', vehicleIds: ['FT822FT', 'GG364G'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
  { billOfLading: '245446', cargo: 'Material for manufacture of tobacco products', grossTons: 36.037, netTons: 20.888, vehicleOrder: '4015', vehicleIds: ['LLU1683E', '2630BV'], sourceScan: manifestPage('RECTIFY_IMG_20260710_121856.jpg.jpeg') },
]

export const commercialDocumentSeeds = [
  {
    id: 'INV-139-1', type: 'Invoice', reference: '139/1', date: '2026-06-20', seller: 'EURO Plywood LLP', buyer: 'LTD IBG', origin: 'Qazaxıstan', destination: 'Ukrayna', terms: 'FCA Uralsk', goods: 'Plywood E-0,5', hsCode: '4412330000', packages: 33, grossKg: 19833, netKg: 18777, currency: 'EUR', value: 16462.05, sourceScan: manifestPage('RECTIFY_IMG_20260710_122015.jpg.jpeg'),
  },
  {
    id: 'INV-126', type: 'Invoice', reference: '126', date: '2026-05-20', seller: 'Zolotonosha Butter-Making Combine LLC', buyer: 'LLP Mercury food', origin: 'Ukrayna', destination: 'Qazaxıstan', goods: 'Dairy products', currency: 'USD', value: 60474.80, sourceScan: manifestPage('RECTIFY_IMG_20260710_122044.jpg.jpeg'),
  },
  {
    id: 'CMR-DA-1401307', type: 'CMR', reference: 'DA 1401307', date: '2026-06-25', sourceScan: manifestPage('RECTIFY_IMG_20260710_121909.jpg.jpeg'),
  },
  {
    id: 'CMR-AX4677-KP', type: 'CMR', reference: 'AX4677KP / AX1578XO', date: '2026-06-29', sourceScan: manifestPage('RECTIFY_IMG_20260710_122024.jpg.jpeg'),
  },
]

export const importedScanIndex = [
  'RECTIFY_IMG_20260710_121821.jpg.jpeg', 'RECTIFY_IMG_20260710_121830.jpg.jpeg', 'RECTIFY_IMG_20260710_121836.jpg.jpeg',
  'RECTIFY_IMG_20260710_121844.jpg.jpeg', 'RECTIFY_IMG_20260710_121856.jpg.jpeg', 'RECTIFY_IMG_20260710_121909.jpg.jpeg',
  'RECTIFY_IMG_20260710_121925.jpg.jpeg', 'RECTIFY_IMG_20260710_121937.jpg.jpeg', 'RECTIFY_IMG_20260710_122015.jpg.jpeg',
  'RECTIFY_IMG_20260710_122024.jpg.jpeg', 'RECTIFY_IMG_20260710_122044.jpg.jpeg',
].map(manifestPage)
