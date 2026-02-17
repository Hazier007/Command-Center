/**
 * LocalStorage utilities for Team Docs
 * Simple localStorage wrapper for document management
 */

export interface Doc {
  id: string;
  title: string;
  content: string;
  author: 'lisa' | 'jc' | 'wout' | 'bart';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'team-docs'

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const docsStorage = {
  getAll: (): Doc[] => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading docs from localStorage:', error)
      return []
    }
  },

  create: (doc: Omit<Doc, 'id' | 'createdAt' | 'updatedAt'>): Doc => {
    const newDoc: Doc = {
      ...doc,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    const existing = docsStorage.getAll()
    const updated = [...existing, newDoc]
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return newDoc
    } catch (error) {
      console.error('Error saving doc to localStorage:', error)
      throw error
    }
  },

  update: (id: string, updates: Partial<Omit<Doc, 'id' | 'createdAt'>>): Doc | null => {
    const existing = docsStorage.getAll()
    const index = existing.findIndex(doc => doc.id === id)
    
    if (index === -1) return null
    
    const updatedDoc = {
      ...existing[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    
    existing[index] = updatedDoc
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
      return updatedDoc
    } catch (error) {
      console.error('Error updating doc in localStorage:', error)
      return null
    }
  },

  delete: (id: string): boolean => {
    const existing = docsStorage.getAll()
    const filtered = existing.filter(doc => doc.id !== id)
    
    if (filtered.length === existing.length) return false
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      return true
    } catch (error) {
      console.error('Error deleting doc from localStorage:', error)
      return false
    }
  },

  search: (query: string): Doc[] => {
    const docs = docsStorage.getAll()
    const searchTerm = query.toLowerCase()
    
    return docs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm) ||
      doc.content.toLowerCase().includes(searchTerm) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  },

  filterByAuthor: (author: Doc['author']): Doc[] => {
    return docsStorage.getAll().filter(doc => doc.author === author)
  },

  filterByTag: (tag: string): Doc[] => {
    return docsStorage.getAll().filter(doc => doc.tags.includes(tag))
  },
}