import fs from "node:fs/promises"
import path from "node:path"

import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, ExternalLink, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { isReadableDocumentPath, normalizeDocumentPath } from "@/lib/document-links"

type PageProps = {
  searchParams?: Promise<{ path?: string }> | { path?: string }
}

async function resolveSearchParams(searchParams: PageProps["searchParams"]) {
  return await Promise.resolve(searchParams ?? {})
}

export default async function DocumentViewerPage({ searchParams }: PageProps) {
  const params = await resolveSearchParams(searchParams)
  const requestedPath = normalizeDocumentPath(params.path ?? "")

  if (!isReadableDocumentPath(requestedPath)) {
    notFound()
  }

  const absolutePath = path.join(process.cwd(), requestedPath)
  let content: string
  try {
    content = await fs.readFile(absolutePath, "utf8")
  } catch {
    notFound()
  }

  const fileName = requestedPath.split("/").at(-1) ?? requestedPath
  const isJson = requestedPath.toLowerCase().endsWith(".json")

  return (
    <main className="space-y-6 text-white">
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/review"><ArrowLeft className="mr-2 h-4 w-4" /> Terug naar review</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/locallead">LocalLead</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Link href="/portfolio">Portfolio</Link>
        </Button>
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,145,30,0.18),_transparent_28rem),rgba(24,24,27,0.92)] p-6 shadow-2xl md:p-8">
        <Badge className="border-[#F5911E]/25 bg-[#F5911E]/15 text-[#F5911E]">
          <FileText className="mr-1 h-3.5 w-3.5" /> Leesbaar document
        </Badge>
        <h1 className="mt-4 break-words text-3xl font-black md:text-5xl">{fileName}</h1>
        <p className="mt-3 break-words font-mono text-xs leading-6 text-zinc-400">{requestedPath}</p>
      </section>

      <article className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 text-zinc-100 shadow-2xl md:p-8">
        {isJson ? (
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-6 text-zinc-200">
            {content}
          </pre>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => <h1 className="mb-5 mt-2 text-3xl font-black text-white" {...props} />,
              h2: (props) => <h2 className="mb-4 mt-8 border-t border-white/10 pt-6 text-2xl font-black text-white" {...props} />,
              h3: (props) => <h3 className="mb-3 mt-6 text-xl font-black text-white" {...props} />,
              p: (props) => <p className="my-4 leading-7 text-zinc-200" {...props} />,
              ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-zinc-200" {...props} />,
              ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-zinc-200" {...props} />,
              li: (props) => <li className="leading-7" {...props} />,
              a: ({ href, children }) => (
                <a className="inline-flex items-center gap-1 text-[#F5911E] underline decoration-[#F5911E]/40 underline-offset-4" href={href} target="_blank" rel="noreferrer">
                  {children} <ExternalLink className="h-3 w-3" />
                </a>
              ),
              code: ({ children }) => <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-[#F5911E]">{children}</code>,
              pre: ({ children }) => <pre className="my-5 max-w-full overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-6 text-zinc-200">{children}</pre>,
              blockquote: (props) => <blockquote className="my-5 border-l-4 border-[#F5911E]/60 bg-[#F5911E]/10 px-4 py-2 text-zinc-200" {...props} />,
              table: (props) => <div className="my-5 overflow-x-auto"><table className="w-full border-collapse text-sm" {...props} /></div>,
              th: (props) => <th className="border border-white/10 bg-white/10 px-3 py-2 text-left text-white" {...props} />,
              td: (props) => <td className="border border-white/10 px-3 py-2 align-top text-zinc-200" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </article>
    </main>
  )
}
