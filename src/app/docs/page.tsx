"use client"

import { useState, useEffect } from "react"
import { Plus, FileText, Search, Edit, Trash2, Eye, Tag, User, Filter, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { docsStorage, type Doc } from "@/lib/docs-storage"

type AuthorFilter = Doc['author'] | 'all'

const authorConfig = {
  lisa: { name: 'Lisa', emoji: '📋', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  jc: { name: 'JC', emoji: '🥊', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  wout: { name: 'Wout', emoji: '🔭', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  bart: { name: 'Bart', emoji: '👑', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
}

export default function DocsPage() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Doc | null>(null)
  const [viewingDoc, setViewingDoc] = useState<Doc | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [authorFilter, setAuthorFilter] = useState<AuthorFilter>('all')
  const [selectedTag, setSelectedTag] = useState<string>('')

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'bart' as Doc['author'],
    tags: [] as string[],
    newTag: '',
  })

  useEffect(() => {
    setDocs(docsStorage.getAll())
  }, [])

  const reload = () => setDocs(docsStorage.getAll())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingDoc) {
      docsStorage.update(editingDoc.id, {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        tags: formData.tags,
      })
      setEditingDoc(null)
    } else {
      docsStorage.create({
        title: formData.title,
        content: formData.content,
        author: formData.author,
        tags: formData.tags,
      })
    }
    
    reload()
    setIsDialogOpen(false)
    setFormData({ title: '', content: '', author: 'bart', tags: [], newTag: '' })
  }

  const handleEdit = (doc: Doc) => {
    setEditingDoc(doc)
    setFormData({
      title: doc.title,
      content: doc.content,
      author: doc.author,
      tags: doc.tags,
      newTag: '',
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Weet je zeker dat je dit document wilt verwijderen?')) {
      docsStorage.delete(id)
      reload()
    }
  }

  const addTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag],
        newTag: '',
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    })
  }

  // Get all unique tags for filtering
  const allTags = Array.from(
    new Set(docs.flatMap(doc => doc.tags))
  ).sort()

  // Filter docs
  const filteredDocs = docs
    .filter(doc => {
      if (searchQuery) {
        return (
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }
      return true
    })
    .filter(doc => {
      if (authorFilter !== 'all') {
        return doc.author === authorFilter
      }
      return true
    })
    .filter(doc => {
      if (selectedTag) {
        return doc.tags.includes(selectedTag)
      }
      return true
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) {
          return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.substring(2)}</h3>
        }
        if (line.startsWith('## ')) {
          return <h4 key={i} className="text-base font-semibold mt-3 mb-1">{line.substring(3)}</h4>
        }
        if (line.trim() === '') {
          return <br key={i} />
        }
        return <p key={i} className="mb-2">{line}</p>
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-7 w-7 text-[#F5911E]" />
              Team Docs
            </h1>
            <p className="text-muted-foreground mt-1">
              Interne wiki en documentatie systeem voor het team.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#F5911E] text-white hover:bg-[#e07f0e]"
                onClick={() => {
                  setEditingDoc(null)
                  setFormData({ title: '', content: '', author: 'bart', tags: [], newTag: '' })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nieuw Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDoc ? 'Document Bewerken' : 'Nieuw Document'}
                </DialogTitle>
                <DialogDescription>
                  {editingDoc ? 'Bewerk het bestaande document.' : 'Voeg een nieuw document toe aan de team wiki.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium">Titel</label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Document titel"
                    required
                    autoFocus
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="text-sm font-medium">Auteur</label>
                  <select
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value as Doc['author'] })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {Object.entries(authorConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.emoji} {config.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="content" className="text-sm font-medium">Content (Markdown)</label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="# Titel&#10;&#10;Content hier... Je kunt markdown gebruiken:&#10;&#10;## Subtitel&#10;- Bullet points&#10;**bold text**"
                    className="min-h-[200px] font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={formData.newTag}
                      onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                      placeholder="Voeg tag toe..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1 bg-[#F5911E] text-white hover:bg-[#e07f0e]">
                    {editingDoc ? 'Opslaan' : 'Document Aanmaken'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuleren
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek documenten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative w-[150px]">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value as AuthorFilter)}
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Alle auteurs</option>
                {Object.entries(authorConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.emoji} {config.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-[150px]">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Alle tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => {
            const config = authorConfig[doc.author]
            return (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingDoc(doc)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(doc)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(doc.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {doc.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={config.color}>
                        {config.emoji} {config.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(doc.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    {doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <h3 className="text-lg font-medium text-muted-foreground mt-4">Geen documenten gevonden</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {docs.length === 0 ? 'Maak je eerste document aan' : 'Pas je zoekopdracht aan'}
            </p>
          </div>
        )}

        {/* Document Viewer Dialog */}
        <Dialog open={!!viewingDoc} onOpenChange={(open) => !open && setViewingDoc(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {viewingDoc && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{viewingDoc.title}</DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className={authorConfig[viewingDoc.author].color}>
                      {authorConfig[viewingDoc.author].emoji} {authorConfig[viewingDoc.author].name}
                    </Badge>
                    <span>•</span>
                    <span>{new Date(viewingDoc.updatedAt).toLocaleDateString()}</span>
                    {viewingDoc.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-1">
                          {viewingDoc.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </DialogHeader>
                <div className="prose prose-sm max-w-none dark:prose-invert mt-4">
                  {formatContent(viewingDoc.content)}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}