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
  fetchedAt: string
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

export async function fetchExchangeRates(): Promise<LiveRates> {
  const request = timeout(7000)
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', { signal: request.signal })
    if (!response.ok) throw new Error('Məzənnə API cavab vermədi')
    const data = await response.json() as { rates: Record<string, number> }
    if (!data.rates.AZN || !data.rates.EUR) throw new Error('Məzənnə məlumatı natamamdır')
    return { usdToAzn: data.rates.AZN, usdToEur: data.rates.EUR, fetchedAt: new Date().toISOString() }
  } finally { request.clear() }
}
