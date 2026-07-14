export type LiveWeather = {
  temperature: number
  windSpeed: number
  windDirection: number
  weatherCode: number
  fetchedAt: string
}

export type LiveRates = {
  usdToAzn: number
  usdToEur: number
  /** 1 vahid valyuta → AZN */
  toAzn: Record<string, number>
  fetchedAt: string
}

const FALLBACK_USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  TRY: 34.5,
  RUB: 92,
  CNY: 7.25,
  AZN: 1.7,
}

const timeout = (ms: number) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  return { signal: controller.signal, clear: () => clearTimeout(id) }
}

export async function fetchAlatWeather(): Promise<LiveWeather> {
  const request = timeout(7000)
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=39.4823&longitude=49.4056&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=Asia%2FBaku', { signal: request.signal })
    if (!response.ok) throw new Error('Hava API cavab vermədi')
    const data = await response.json() as { current: Record<string, number> }
    return {
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      weatherCode: data.current.weather_code,
      fetchedAt: new Date().toISOString(),
    }
  } finally { request.clear() }
}

function buildRates(usdBase: Record<string, number>): LiveRates {
  const aznPerUsd = usdBase.AZN
  if (!aznPerUsd) throw new Error('AZN məzənnəsi yoxdur')
  const codes = ['USD', 'EUR', 'GBP', 'TRY', 'RUB', 'CNY'] as const
  const toAzn: Record<string, number> = {}
  for (const code of codes) {
    const perUsd = code === 'USD' ? 1 : usdBase[code]
    if (!perUsd) continue
    // 1 unit of foreign currency in AZN
    toAzn[code] = code === 'USD' ? aznPerUsd : aznPerUsd / perUsd
  }
  return {
    usdToAzn: aznPerUsd,
    usdToEur: usdBase.EUR ? aznPerUsd / usdBase.EUR : toAzn.EUR,
    toAzn,
    fetchedAt: new Date().toISOString(),
  }
}

export async function fetchExchangeRates(): Promise<LiveRates> {
  const request = timeout(7000)
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', { signal: request.signal })
    if (!response.ok) throw new Error('Məzənnə API cavab vermədi')
    const data = await response.json() as { rates: Record<string, number> }
    if (!data.rates.AZN || !data.rates.EUR) throw new Error('Məzənnə məlumatı natamamdır')
    return buildRates(data.rates)
  } catch {
    return buildRates(FALLBACK_USD_RATES)
  } finally {
    request.clear()
  }
}
