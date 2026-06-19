const DOCUMENT_ROOTS = ["research/", "docs/", "content/", "ops/", "team/"]

export function normalizeDocumentPath(path: string) {
  return path.replace(/^\/+/, "").replace(/\\/g, "/")
}

export function isReadableDocumentPath(path: string) {
  const normalized = normalizeDocumentPath(path)
  if (!normalized || normalized.includes("..")) return false
  if (!DOCUMENT_ROOTS.some((root) => normalized.startsWith(root))) return false
  return /\.(md|mdx|txt|json)$/i.test(normalized)
}

export function documentViewHref(path: string) {
  const normalized = normalizeDocumentPath(path)
  return `/docs/view?path=${encodeURIComponent(normalized)}`
}
