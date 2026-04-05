/**
 * Bulk Import Script: docs/ + research/ → Research database
 *
 * Usage:
 *   npx tsx scripts/import-research.ts              # dry run
 *   npx tsx scripts/import-research.ts --execute     # actual import
 *
 * Requires DATABASE_URL in .env
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const prisma = new PrismaClient()
const DRY_RUN = !process.argv.includes('--execute')

// ── Type Mapping ──────────────────────────────────────────────
type ResearchType = 'keyword-research' | 'market-analysis' | 'api-research' | 'oracle' | 'competitor' | 'technical' | 'seo-strategy' | 'completion-report' | 'roadmap' | 'data-dataset' | 'business-case' | 'governance' | 'other'

interface FileMapping {
  filePath: string
  title: string
  type: ResearchType
  author: string
  status: 'draft' | 'final' | 'outdated'
  tags: string[]
  siteKeyword: string | null  // for auto-linking
  skip: boolean
  skipReason?: string
}

const TYPE_PATTERNS: [RegExp, ResearchType][] = [
  [/keyword|longtail|keywords/i, 'keyword-research'],
  [/backlink|outreach|rank-tracking|rank_tracking/i, 'seo-strategy'],
  [/roadmap/i, 'roadmap'],
  [/COMPLETION|completed/i, 'completion-report'],
  [/business-case|flip-strategie|rental-business|groeilening/i, 'business-case'],
  [/data-batch|dataset|enrichment|\.json$|\.csv$/i, 'data-dataset'],
  [/domaining|apis-research/i, 'api-research'],
  [/governance|best-practices|FOUTEN|structure\.md$|veiligheid|workflow|optimization-tools/i, 'governance'],
  [/niche-tools|opportuniteiten|sponsorship/i, 'market-analysis'],
  [/briefing|faq|content-upgrade|mvp|premie|velux|regionale|template|quick-wins|index-quick-scan/i, 'technical'],
  [/guide_|preppedia-guide/i, 'technical'],
  [/audit|adsense/i, 'technical'],
]

// Site keyword → domain substring for matching
const SITE_KEYWORDS: [RegExp, string][] = [
  [/loonberekening/i, 'loonberekening'],
  [/btw-calculator|btw_calculator/i, 'btw-calculator'],
  [/kleurcodes/i, 'kleurcodes'],
  [/poxy/i, 'poxy'],
  [/kmvergoeding/i, 'kmvergoeding'],
  [/datumberekenen/i, 'datumberekenen'],
  [/goedkoopstroom/i, 'goedkoopstroom'],
  [/registratiekosten/i, 'registratiekosten'],
  [/zolderramen/i, 'zolderramen'],
  [/tankkosten/i, 'tankkosten'],
  [/timmerwerk/i, 'timmerwerk'],
  [/airfryer/i, 'airfryer'],
  [/festival-finder|festival_finder/i, 'festival'],
  [/interesten/i, 'interesten'],
  [/huizenopkoper/i, 'huizenopkoper'],
  [/aankoopkosten/i, 'aankoopkosten'],
  [/opblaasbareboot/i, 'opblaasbareboot'],
  [/preppedia/i, 'preppedia'],
  [/vloerverwarming/i, 'vloerverwarming'],
  [/huurrendement/i, 'huurrendement'],
  [/zwangerschap/i, 'zwangerschap'],
  [/iban/i, 'iban'],
  [/buitendrogen/i, 'buitendrogen'],
  [/aquarium/i, 'aquarium'],
  [/kluscalculator/i, 'kluscalculator'],
  [/hondenverzekering|hondenpups/i, 'hondenverzekering'],
  [/notaris/i, 'notaris'],
  [/vastgoed/i, 'vastgoed'],
  [/chaletverhuur/i, 'chaletverhuur'],
  [/dakkapel/i, 'dakkapel'],
  [/suikerspin/i, 'suikerspin'],
  [/openclaw/i, 'openclaw'],
  [/elektrik/i, 'elektrik'],
]

// Known duplicates: skip the less specific or older version
const SKIP_FILES = new Set([
  // Duplicates in seo/ that exist in root
  'research/seo/loonberekening-keyword-research.md',
  'research/seo/loonberekening-backlink-strategie.md',
  'research/seo/loonberekening-rank-tracking-strategie.md',
  'research/seo/huizenopkoper-keyword-research.md',
  // Older versions superseded by dated versions
  'research/loonberekening-rebuild-COMPLETION.md',      // superseded by -2026-02-28 version
  'research/interesten-keywords.md',                     // superseded by -2026 version
  'research/loonberekening-faq.md',                      // superseded by -faq-pagina.md
  // Renamed duplicates (original guide_ versions are kept)
  'research/projects/packs/preppedia-guides/renamed/best-emergency-radios-off-grid.md',
  'research/projects/packs/preppedia-guides/renamed/best-first-aid-kits-outdoor.md',
  'research/projects/packs/preppedia-guides/renamed/best-survival-food-storage.md',
  'research/projects/packs/preppedia-guides/renamed/best-tactical-flashlights-edc.md',
  'research/projects/packs/preppedia-guides/renamed/best-water-filters-hiking-backpacking-2026.md',
  // README not useful
  'docs/research/README.md',
  // Extract scripts, not research
  'research/adsense/adsense-keywords/extract.js',
  'research/adsense/adsense-keywords/make_report.py',
  'research/adsense/adsense-keywords/make_report_filled.py',
])

function detectType(filename: string, dirPath: string): ResearchType {
  const combined = `${dirPath}/${filename}`
  for (const [pattern, type] of TYPE_PATTERNS) {
    if (pattern.test(combined)) return type
  }
  // Fallback based on directory
  if (dirPath.includes('docs/governance') || dirPath.includes('docs/operations')) return 'governance'
  if (dirPath.includes('docs/marketing')) return 'market-analysis'
  if (dirPath.includes('docs/seo')) return 'keyword-research'
  if (dirPath.includes('business-cases')) return 'business-case'
  if (dirPath.includes('domains')) return 'api-research'
  return 'other'
}

function detectSiteKeyword(filename: string, dirPath: string): string | null {
  const combined = `${dirPath}/${filename}`
  for (const [pattern, keyword] of SITE_KEYWORDS) {
    if (pattern.test(combined)) return keyword
  }
  return null
}

function extractTitle(content: string, filename: string): string {
  // Try first # heading
  const headingMatch = content.match(/^#\s+(.+)$/m)
  if (headingMatch) return headingMatch[1].trim()

  // Derive from filename
  return filename
    .replace(/\.(md|json|csv)$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}[-_]?/, '') // strip date prefix
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase()) // capitalize words
    .trim()
}

function extractTags(filename: string, dirPath: string): string[] {
  const tags: string[] = []

  // Add directory as tag
  const dirs = dirPath.split('/').filter(d => d && d !== '.' && d !== 'research' && d !== 'docs')
  tags.push(...dirs)

  // Add date if present
  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/)
  if (dateMatch) tags.push(dateMatch[1])

  // Add site keyword as tag
  const siteKw = detectSiteKeyword(filename, dirPath)
  if (siteKw) tags.push(siteKw)

  return [...new Set(tags)].filter(Boolean)
}

function detectAuthor(content: string, dirPath: string): string {
  // Check content for agent attribution
  const agentMatch = content.match(/\*\*(?:Agent|Auteur|Author|Bron)\s*:?\*\*\s*(\w+)/i)
  if (agentMatch) {
    const agent = agentMatch[1].toLowerCase()
    if (['bart', 'atlas', 'forge', 'radar', 'ink', 'ledger', 'spark', 'cowork'].includes(agent)) {
      return agent
    }
  }

  // Governance/operations docs → atlas
  if (dirPath.includes('governance') || dirPath.includes('operations')) return 'atlas'
  // Marketing → spark
  if (dirPath.includes('marketing')) return 'spark'
  // Default: radar (research agent)
  return 'radar'
}

function detectStatus(filename: string, type: ResearchType): 'draft' | 'final' | 'outdated' {
  if (type === 'completion-report') return 'final'
  if (type === 'roadmap') return 'final'
  if (type === 'governance') return 'final'
  if (type === 'data-dataset') return 'final'
  return 'final' // Most imported files are finished research
}

// ── AdSense JSON grouping ──────────────────────────────────────
const ADSENSE_OUT_DIR = 'research/adsense/adsense-keywords/out'

function groupAdSenseFiles(files: string[]): Map<string, string[]> {
  const groups = new Map<string, string[]>()
  const adsenseFiles = files.filter(f => f.startsWith(ADSENSE_OUT_DIR) && f.endsWith('.json'))

  for (const f of adsenseFiles) {
    const basename = path.basename(f, '.json')
    // e.g., btw-calculator_be_be → btw-calculator
    const siteName = basename.replace(/_be_(be|nl)$/, '').replace(/_/g, '-')
    if (!groups.has(siteName)) groups.set(siteName, [])
    groups.get(siteName)!.push(f)
  }

  return groups
}

// ── Main ────────────────────────────────────────────────────────

async function scanFiles(baseDir: string): Promise<string[]> {
  const results: string[] = []

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (/\.(md|json|csv)$/.test(entry.name)) {
        // Normalize to forward slashes and relative path
        results.push(path.relative(baseDir, fullPath).replace(/\\/g, '/'))
      }
    }
  }

  walk(baseDir)
  return results
}

async function main() {
  console.log(`\n🔬 Research Import Script ${DRY_RUN ? '(DRY RUN)' : '(EXECUTING)'}\n`)

  const repoRoot = path.resolve(__dirname, '..')
  const allFiles = [
    ...await scanFiles(path.join(repoRoot, 'docs')).then(f => f.map(p => `docs/${p}`)),
    ...await scanFiles(path.join(repoRoot, 'research')).then(f => f.map(p => `research/${p}`)),
  ]

  // Filter out non-content files
  const contentFiles = allFiles.filter(f => !f.endsWith('.js') && !f.endsWith('.py'))

  console.log(`Found ${contentFiles.length} files total`)

  // Load sites and domains for linking
  const [sites, domains] = await Promise.all([
    prisma.site.findMany({ select: { id: true, domain: true } }),
    prisma.domainOpportunity.findMany({ select: { id: true, domain: true } }),
  ])

  console.log(`Loaded ${sites.length} sites, ${domains.length} domains for linking\n`)

  // Build lookup maps
  const siteMap = new Map<string, string>() // keyword → siteId
  for (const site of sites) {
    const domainLower = site.domain.toLowerCase()
    // Store multiple lookup keys
    siteMap.set(domainLower, site.id)
    // Extract domain name without TLD
    const nameOnly = domainLower.replace(/\.(be|nl|com|net|org)$/, '')
    siteMap.set(nameOnly, site.id)
  }

  const domainMap = new Map<string, string>()
  for (const d of domains) {
    const domainLower = d.domain.toLowerCase()
    domainMap.set(domainLower, d.id)
    const nameOnly = domainLower.replace(/\.(be|nl|com|net|org)$/, '')
    domainMap.set(nameOnly, d.id)
  }

  // Check existing research titles to avoid duplicates
  const existingTitles = new Set(
    (await prisma.research.findMany({ select: { title: true } })).map(r => r.title.toLowerCase())
  )

  // Group AdSense JSON files
  const adsenseGroups = groupAdSenseFiles(contentFiles)
  const adsenseGroupedFiles = new Set(
    Array.from(adsenseGroups.values()).flat()
  )

  // Process files
  const mappings: FileMapping[] = []
  const contentHashes = new Map<string, string>() // hash → filePath (for dedup)

  for (const relPath of contentFiles) {
    const filename = path.basename(relPath)
    const dirPath = path.dirname(relPath)
    const fullPath = path.join(repoRoot, relPath)

    // Skip known duplicates/non-content
    if (SKIP_FILES.has(relPath)) {
      mappings.push({ filePath: relPath, title: '', type: 'other', author: 'radar', status: 'final', tags: [], siteKeyword: null, skip: true, skipReason: 'Known duplicate/non-content' })
      continue
    }

    // Skip AdSense grouped files (handled separately)
    if (adsenseGroupedFiles.has(relPath)) continue

    // Skip the keywords.json master file
    if (relPath === 'research/adsense/adsense-keywords/keywords.json') {
      mappings.push({ filePath: relPath, title: '', type: 'data-dataset', author: 'radar', status: 'final', tags: [], siteKeyword: null, skip: true, skipReason: 'Master keyword file (grouped by site)' })
      continue
    }

    // Read file
    let content: string
    try {
      content = fs.readFileSync(fullPath, 'utf-8')
    } catch {
      mappings.push({ filePath: relPath, title: '', type: 'other', author: 'radar', status: 'final', tags: [], siteKeyword: null, skip: true, skipReason: 'Could not read file' })
      continue
    }

    // Content hash dedup
    const hash = crypto.createHash('md5').update(content).digest('hex')
    if (contentHashes.has(hash)) {
      mappings.push({ filePath: relPath, title: '', type: 'other', author: 'radar', status: 'final', tags: [], siteKeyword: null, skip: true, skipReason: `Exact duplicate of ${contentHashes.get(hash)}` })
      continue
    }
    contentHashes.set(hash, relPath)

    // Detect fields
    const type = detectType(filename, dirPath)
    const title = extractTitle(content, filename)
    const author = detectAuthor(content, dirPath)
    const status = detectStatus(filename, type)
    const tags = extractTags(filename, dirPath)
    const siteKeyword = detectSiteKeyword(filename, dirPath)

    // Check existing
    if (existingTitles.has(title.toLowerCase())) {
      mappings.push({ filePath: relPath, title, type, author, status, tags, siteKeyword, skip: true, skipReason: 'Title already exists in DB' })
      continue
    }

    mappings.push({ filePath: relPath, title, type, author, status, tags, siteKeyword, skip: false })
  }

  // Add AdSense grouped entries
  for (const [siteName, files] of adsenseGroups) {
    const title = `AdSense Keywords: ${siteName}`
    if (existingTitles.has(title.toLowerCase())) {
      mappings.push({ filePath: files[0], title, type: 'data-dataset', author: 'radar', status: 'final', tags: ['adsense', siteName], siteKeyword: siteName, skip: true, skipReason: 'Title already exists in DB' })
      continue
    }
    mappings.push({ filePath: files.join(', '), title, type: 'data-dataset', author: 'radar', status: 'final', tags: ['adsense', siteName], siteKeyword: siteName, skip: false })
  }

  // Print summary
  const toImport = mappings.filter(m => !m.skip)
  const skipped = mappings.filter(m => m.skip)

  console.log(`\n📊 Summary:`)
  console.log(`   To import: ${toImport.length}`)
  console.log(`   Skipped:   ${skipped.length}`)

  // Type breakdown
  const typeBreakdown: Record<string, number> = {}
  for (const m of toImport) {
    typeBreakdown[m.type] = (typeBreakdown[m.type] || 0) + 1
  }
  console.log(`\n📁 Types:`)
  for (const [type, count] of Object.entries(typeBreakdown).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${type}: ${count}`)
  }

  // Skipped reasons
  if (skipped.length > 0) {
    console.log(`\n⏭️  Skipped files:`)
    for (const m of skipped) {
      console.log(`   ${m.filePath} → ${m.skipReason}`)
    }
  }

  // Print import plan
  console.log(`\n📋 Import plan:`)
  for (const m of toImport) {
    const siteLabel = m.siteKeyword ? ` [→ ${m.siteKeyword}]` : ''
    console.log(`   ${m.type.padEnd(20)} | ${m.title.substring(0, 60).padEnd(60)} | ${m.author}${siteLabel}`)
  }

  if (DRY_RUN) {
    console.log(`\n🏁 Dry run complete. Run with --execute to import.\n`)
    await prisma.$disconnect()
    return
  }

  // ── Execute import ──────────────────────────────────────────

  console.log(`\n🚀 Importing ${toImport.length} records...\n`)

  let imported = 0
  let errors = 0

  for (const mapping of toImport) {
    try {
      let body: string

      // Handle AdSense grouped files
      if (mapping.filePath.includes(', ')) {
        const files = mapping.filePath.split(', ')
        const parts: string[] = [`# ${mapping.title}\n\nAdSense keyword data voor ${mapping.tags.find(t => t !== 'adsense') || 'unknown'}.\n`]
        for (const f of files) {
          const fullPath = path.join(repoRoot, f)
          const content = fs.readFileSync(fullPath, 'utf-8')
          const region = path.basename(f, '.json').split('_').slice(1).join('_')
          parts.push(`## ${region}\n\n\`\`\`json\n${content.substring(0, 5000)}${content.length > 5000 ? '\n... (truncated)' : ''}\n\`\`\`\n`)
        }
        body = parts.join('\n')
      } else {
        const fullPath = path.join(repoRoot, mapping.filePath)
        const raw = fs.readFileSync(fullPath, 'utf-8')

        if (mapping.filePath.endsWith('.json')) {
          body = `# ${mapping.title}\n\n\`\`\`json\n${raw.substring(0, 10000)}${raw.length > 10000 ? '\n... (truncated, full file: ' + raw.length + ' chars)' : ''}\n\`\`\`\n`
        } else if (mapping.filePath.endsWith('.csv')) {
          body = `# ${mapping.title}\n\n\`\`\`csv\n${raw.substring(0, 10000)}${raw.length > 10000 ? '\n... (truncated)' : ''}\n\`\`\`\n`
        } else {
          body = raw
        }
      }

      // Resolve site/domain linking
      let linkedSiteId: string | undefined
      let linkedDomainId: string | undefined

      if (mapping.siteKeyword) {
        const kw = mapping.siteKeyword.toLowerCase()
        // Try sites first
        for (const [key, id] of siteMap) {
          if (key.includes(kw) || kw.includes(key)) {
            linkedSiteId = id
            break
          }
        }
        // If no site found, try domains
        if (!linkedSiteId) {
          for (const [key, id] of domainMap) {
            if (key.includes(kw) || kw.includes(key)) {
              linkedDomainId = id
              break
            }
          }
        }
      }

      await prisma.research.create({
        data: {
          title: mapping.title,
          body,
          type: mapping.type,
          author: mapping.author,
          status: mapping.status,
          tags: mapping.tags.join(', '),
          linkedSiteId,
          linkedDomainId,
        },
      })

      imported++
      const linkInfo = linkedSiteId ? ` → site` : linkedDomainId ? ` → domain` : ''
      console.log(`  ✅ ${mapping.title.substring(0, 70)}${linkInfo}`)
    } catch (error) {
      errors++
      console.error(`  ❌ ${mapping.title}: ${error}`)
    }
  }

  console.log(`\n🏁 Import complete: ${imported} imported, ${errors} errors\n`)
  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
