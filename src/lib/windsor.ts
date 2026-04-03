/**
 * Windsor.ai REST API client for fetching GSC and GA4 data
 */

const WINDSOR_BASE_URL = 'https://connectors.windsor.ai';

interface WindsorGSCRow {
  query: string;
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  site?: string;
}

interface WindsorGA4Row {
  date?: string;
  source?: string;
  medium?: string;
  sessions?: number;
  users?: number;
  bounceRate?: number;
  pageviews?: number;
  avgSessionDuration?: number;
  pagePath?: string;
}

export interface GSCOpportunity {
  keyword: string;
  page: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
  siteDomain: string;
}

function getApiKey(): string {
  const key = process.env.WINDSOR_API_KEY;
  if (!key) throw new Error('WINDSOR_API_KEY environment variable not set');
  return key;
}

// Map CC site domains to Windsor GSC account IDs
const GSC_ACCOUNT_MAP: Record<string, string> = {
  'hondenpups.be': 'https://hondenpups.be/',
  'huizenopkoper.be': 'sc-domain:huizenopkoper.be',
  'airfryertijden.be': 'https://airfryertijden.be/',
  'budprofiles.com': 'https://budprofiles.com/',
  'loonberekening.be': 'https://loonberekening.be/',
  'datumberekenen.be': 'https://datumberekenen.be/',
};

// Map CC site domains to Windsor GA4 account IDs
const GA4_ACCOUNT_MAP: Record<string, string> = {
  'poxy.be': '523893327',
  'huurrendementcalculator.be': '522345205',
  'airfryertijden.be': '527495420',
  'daklekkages.be': '526246682',
  'budprofiles.com': '486536420',
  'hazier.be': '390604404',
  'luwaert.be': '528511392',
};

export function getGSCDomains(): string[] {
  return Object.keys(GSC_ACCOUNT_MAP);
}

export function getGA4Domains(): string[] {
  return Object.keys(GA4_ACCOUNT_MAP);
}

export async function fetchWindsorGSC(
  domain: string,
  datePreset: string = 'last_28d'
): Promise<WindsorGSCRow[]> {
  const apiKey = getApiKey();
  const accountId = GSC_ACCOUNT_MAP[domain];
  if (!accountId) throw new Error(`No GSC account found for domain: ${domain}`);

  const params = new URLSearchParams({
    api_key: apiKey,
    fields: 'query,page,impressions,clicks,ctr,position',
    date_preset: datePreset,
    accounts: accountId,
  });

  const res = await fetch(`${WINDSOR_BASE_URL}/searchconsole?${params}`);
  if (!res.ok) throw new Error(`Windsor GSC API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || data.result || [];
}

export async function fetchWindsorGA4(
  domain: string,
  datePreset: string = 'last_28d'
): Promise<WindsorGA4Row[]> {
  const apiKey = getApiKey();
  const accountId = GA4_ACCOUNT_MAP[domain];
  if (!accountId) throw new Error(`No GA4 account found for domain: ${domain}`);

  const params = new URLSearchParams({
    api_key: apiKey,
    fields: 'date,source,sessions,users,bounceRate,pageviews,pagePath',
    date_preset: datePreset,
    accounts: accountId,
  });

  const res = await fetch(`${WINDSOR_BASE_URL}/googleanalytics4?${params}`);
  if (!res.ok) throw new Error(`Windsor GA4 API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || data.result || [];
}

/**
 * Fetch GSC data and find SEO opportunities (low-hanging fruit)
 */
export async function findSEOOpportunities(
  domain: string,
  datePreset: string = 'last_28d'
): Promise<GSCOpportunity[]> {
  const rows = await fetchWindsorGSC(domain, datePreset);

  return rows
    .filter(row => {
      const pos = row.position || 0;
      const imp = row.impressions || 0;
      const ctr = (row.ctr || 0) * (row.ctr > 1 ? 1 : 100); // Handle both 0.05 and 5% formats
      // Filter out results from other domains (sc-domain properties include all subdomains)
      const page = row.page || '';
      const belongsToDomain = page.includes(domain);
      return belongsToDomain && pos >= 4 && pos <= 30 && imp >= 20 && ctr < 5;
    })
    .map(row => ({
      keyword: row.query,
      page: row.page,
      position: Math.round((row.position || 0) * 10) / 10,
      impressions: Math.round(row.impressions || 0),
      clicks: Math.round(row.clicks || 0),
      ctr: Math.round((row.ctr || 0) * (row.ctr > 1 ? 10 : 1000)) / 10, // Normalize to percentage
      siteDomain: domain,
    }))
    .sort((a, b) => b.impressions - a.impressions);
}

/**
 * Scan all connected GSC domains for opportunities
 */
export async function scanAllDomains(datePreset: string = 'last_28d'): Promise<GSCOpportunity[]> {
  const domains = getGSCDomains();
  const allOpportunities: GSCOpportunity[] = [];

  for (const domain of domains) {
    try {
      const opportunities = await findSEOOpportunities(domain, datePreset);
      allOpportunities.push(...opportunities);
    } catch (error) {
      console.error(`Error scanning ${domain}:`, error);
    }
  }

  return allOpportunities.sort((a, b) => b.impressions - a.impressions);
}
