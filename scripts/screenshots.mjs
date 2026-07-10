import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const baseURL = process.env.BASE_URL || 'http://localhost:3000'
const pages = [
  ['dashboard', '/'], ['emeliyyatlar', '/emeliyyatlar'], ['gemiler', '/gemiler'], ['qeydiyyat', '/qeydiyyat'],
  ['beyannameler', '/beyannameler'], ['tarixce', '/tarixce'], ['analitika', '/analitika'],
]
await mkdir('screenshots', { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
for (const [name, path] of pages) {
  await page.goto(`${baseURL}${path}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('vglp-tour-')).forEach(k => localStorage.setItem(k, 'seen')))
  await page.reload({ waitUntil: 'networkidle' })
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true })
  console.log(`Hazırlandı: screenshots/${name}.png`)
}
await browser.close()
