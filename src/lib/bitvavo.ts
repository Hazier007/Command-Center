import crypto from "crypto"

// ─── Bitvavo API Client ──────────────────────────────────────────
const API_KEY = process.env.BITVAVO_API_KEY || ""
const API_SECRET = process.env.BITVAVO_API_SECRET || ""
const BASE_URL = "https://api.bitvavo.com/v2"

function sign(timestamp: number, method: string, path: string, body = "") {
  const msg = timestamp + method + "/v2" + path + body
  return crypto.createHmac("sha256", API_SECRET).update(msg).digest("hex")
}

async function request<T = unknown>(method: string, path: string, body?: object): Promise<T> {
  const ts = Date.now()
  const bodyStr = body ? JSON.stringify(body) : ""
  const headers: Record<string, string> = {
    "Bitvavo-Access-Key": API_KEY,
    "Bitvavo-Access-Timestamp": String(ts),
    "Bitvavo-Access-Signature": sign(ts, method, path, bodyStr),
    "Content-Type": "application/json",
  }
  const res = await fetch(BASE_URL + path, {
    method,
    headers,
    body: bodyStr || undefined,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Bitvavo ${method} ${path}: ${res.status} — ${err}`)
  }
  return res.json() as Promise<T>
}

// ─── Public endpoints (no auth needed) ────────────────────────────

export interface TickerPrice {
  market: string
  price: string
}

export async function getPrice(market: string): Promise<TickerPrice> {
  const res = await fetch(`${BASE_URL}/ticker/price?market=${market}`)
  if (!res.ok) throw new Error(`getPrice ${market}: ${res.status}`)
  return res.json() as Promise<TickerPrice>
}

export async function getAllPrices(): Promise<TickerPrice[]> {
  const res = await fetch(`${BASE_URL}/ticker/price`)
  return res.json() as Promise<TickerPrice[]>
}

export interface Ticker24h {
  market: string
  open: string
  high: string
  low: string
  last: string
  volume: string
  volumeQuote: string
  bid: string
  ask: string
  timestamp: number
}

export async function getTicker24h(market: string): Promise<Ticker24h> {
  const res = await fetch(`${BASE_URL}/ticker/24h?market=${market}`)
  if (!res.ok) throw new Error(`getTicker24h ${market}: ${res.status}`)
  return res.json() as Promise<Ticker24h>
}

// ─── Authenticated endpoints ──────────────────────────────────────

export interface Balance {
  symbol: string
  available: string
  inOrder: string
}

export async function getBalance(): Promise<Balance[]> {
  return request<Balance[]>("GET", "/balance")
}

export interface OrderResult {
  orderId: string
  market: string
  created: number
  updated: number
  status: string
  side: string
  orderType: string
  amount: string
  amountRemaining: string
  price: string
  filledAmount: string
  filledAmountQuote: string
  fills: Array<{ price: string; amount: string; fee: string; feeCurrency: string }>
}

// Operator ID voor Bitvavo (verplicht sinds 2025) — identificeert onze CC bot
const OPERATOR_ID = 1000001

export async function buyMarket(market: string, amountEur: number): Promise<OrderResult> {
  return request<OrderResult>("POST", "/order", {
    market,
    side: "buy",
    orderType: "market",
    amountQuote: String(amountEur),
    operatorId: OPERATOR_ID,
  })
}

export async function sellMarket(market: string, amountCoin: number): Promise<OrderResult> {
  return request<OrderResult>("POST", "/order", {
    market,
    side: "sell",
    orderType: "market",
    amount: String(amountCoin),
    operatorId: OPERATOR_ID,
  })
}

export async function sellAll(market: string, symbol: string): Promise<OrderResult | null> {
  const balances = await getBalance()
  const bal = balances.find((b) => b.symbol === symbol)
  if (!bal || parseFloat(bal.available) <= 0) return null
  return sellMarket(market, parseFloat(bal.available))
}

// ─── Trade history ───────────────────────────────────────────────
export interface TradeHistoryItem {
  id: string
  orderId: string
  timestamp: number
  market: string
  side: "buy" | "sell"
  amount: string       // base currency amount
  price: string        // quote currency per unit
  taker: boolean
  fee: string
  feeCurrency: string
  settled: boolean
}

// Haalt authenticated trade history op voor een specifieke markt
export async function getTrades(market: string, limit = 500): Promise<TradeHistoryItem[]> {
  const path = `/trades?market=${market}&limit=${limit}`
  return request<TradeHistoryItem[]>("GET", path)
}

// ─── Market data helpers ──────────────────────────────────────────

export interface Candle {
  timestamp: number
  open: string
  high: string
  low: string
  close: string
  volume: string
}

export async function getCandles(market: string, interval = "1h", limit = 100): Promise<Candle[]> {
  const res = await fetch(`${BASE_URL}/${market}/candles?interval=${interval}&limit=${limit}`)
  const data = await res.json() as number[][]
  return data.map(([timestamp, open, high, low, close, volume]) => ({
    timestamp: timestamp as number,
    open: String(open),
    high: String(high),
    low: String(low),
    close: String(close),
    volume: String(volume),
  }))
}

// RSI berekening op basis van candles
export function calculateRSI(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50 // default neutral
  const changes = closes.slice(1).map((c, i) => c - closes[i])
  const recent = changes.slice(-period)
  const gains = recent.filter((c) => c > 0)
  const losses = recent.filter((c) => c < 0).map((c) => Math.abs(c))
  const avgGain = gains.length ? gains.reduce((a, b) => a + b, 0) / period : 0
  const avgLoss = losses.length ? losses.reduce((a, b) => a + b, 0) / period : 0
  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - 100 / (1 + rs)
}

// ─── Fear & Greed Index (alternative.me) ─────────────────────────
export interface FearGreedData {
  value: number           // 0-100
  classification: string  // "Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed"
}

export async function getFearGreed(): Promise<FearGreedData> {
  try {
    const res = await fetch("https://api.alternative.me/fng/?limit=1", { next: { revalidate: 3600 } })
    const json = await res.json() as { data: Array<{ value: string; value_classification: string }> }
    const entry = json.data?.[0]
    return {
      value: entry ? parseInt(entry.value) : 50,
      classification: entry?.value_classification || "Neutral",
    }
  } catch {
    return { value: 50, classification: "Neutral" }
  }
}

// ─── Volume analyse ──────────────────────────────────────────────
// Vergelijk 24h volume met gemiddelde van afgelopen 7 dagen (via dagcandles)
export async function getVolumeRatio(market: string): Promise<number> {
  try {
    // Haal 8 dag-candles op (7 dagen + vandaag)
    const candles = await getCandles(market, "1d", 8)
    if (candles.length < 2) return 1

    // Huidige 24h volume
    const ticker = await getTicker24h(market)
    const currentVolume = parseFloat(ticker.volumeQuote)

    // Gemiddeld volume over de vorige 7 dagen (exclusief vandaag)
    const historicalVolumes = candles.slice(1).map((c) => parseFloat(c.volume))
    const avgVolume = historicalVolumes.length > 0
      ? historicalVolumes.reduce((a, b) => a + b, 0) / historicalVolumes.length
      : currentVolume

    return avgVolume > 0 ? currentVolume / avgVolume : 1
  } catch {
    return 1 // fallback: neutraal
  }
}

// ─── Check if API is configured ──────────────────────────────────
export function isConfigured(): boolean {
  return Boolean(API_KEY && API_SECRET)
}
