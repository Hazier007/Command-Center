/**
 * API-based storage utilities for Command Center data persistence
 * Replaces localStorage with database API calls
 */

// Data Types (keep same interfaces for compatibility)
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'planned' | 'paused';
  phase?: 'idea' | 'research' | 'build' | 'testing' | 'live' | 'optimizing';
  category: 'directory' | 'leadgen' | 'tool' | 'client' | 'business' | 'event';
  description?: string;
  revenue?: number; // monthly estimate
  scratchPad?: string;
  businessUnit?: string;
  ownerType?: string; // 'client' | 'own'
  clientName?: string;
  clientEmail?: string;
  contractType?: string; // 'retainer' | 'eenmalig' | 'mixed'
  monthlyFee?: number;
  contractStart?: string;
  contractEnd?: string;
  hoursPerMonth?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  domain: string;
  projectId?: string;
  status: 'live' | 'dev' | 'planned';
  techStack: string[];
  revenue?: number; // monthly estimate
  listings?: number; // for directories
  pages?: number; // for content sites
  notes?: string;
  lastContentDate?: string;
  monthlyRevenue?: number;
  seoStatus?: 'growing' | 'stable' | 'declining' | 'unknown';
  nextAction?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'directory' | 'leadgen' | 'tool' | 'client' | 'business' | 'feature';
  priority: 'low' | 'medium' | 'high';
  status: 'raw' | 'evaluating' | 'promising' | 'active' | 'archived';
  businessUnit?: string;
  revenueEstimate?: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  projectId?: string;
  siteId?: string; // linked site
  priority?: 'low' | 'medium' | 'high';
  assignee?: string; // 'bart' | 'atlas' | 'forge' | 'radar' | 'ink' | 'ledger' | 'spark' | 'cowork'
  dueDate?: string;
  notified?: boolean; // Track if assignee has been notified
  notifiedAt?: string; // When the notification was sent
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NowItem {
  id: string;
  title: string;
  meta: string;
  tag: string;
  description?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  title: string;
  body: string;
  priority: 'low' | 'medium' | 'high';
  resolved: boolean;
  snoozedUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cost {
  id: string;
  name: string;
  amount: number; // monthly amount in EUR
  category: string; // AI, Hosting, Database, Domains, Infrastructure, Tools, Other
  recurring: boolean; // monthly recurring or one-time
  notes?: string;
  billingDay?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string
  title: string
  body: string // the actual content (markdown)
  type: 'article' | 'product-review' | 'buyers-guide' | 'page' | 'other'
  status: 'draft' | 'review' | 'approved' | 'rejected' | 'live'
  author: string // 'bart' | 'atlas' | 'forge' | 'radar' | 'ink' | 'ledger' | 'spark' | 'cowork'
  targetSite?: string // e.g. 'preppedia.com', 'btw-calculator.be'
  targetPath?: string // e.g. '/guide/best-water-filters'
  projectId?: string
  feedback?: string // Bart's review notes
  createdAt: string
  updatedAt: string
}

export interface ResearchItem {
  id: string
  title: string
  body: string // full markdown content
  type: 'keyword-research' | 'market-analysis' | 'api-research' | 'oracle' | 'competitor' | 'technical' | 'other'
  author: string // 'bart' | 'atlas' | 'forge' | 'radar' | 'ink' | 'ledger' | 'spark' | 'cowork'
  projectId?: string
  tags?: string // comma-separated
  status: 'draft' | 'final' | 'outdated'
  createdAt: string
  updatedAt: string
}

export interface ActivityItem {
  id: string
  type: 'commit' | 'deploy' | 'task' | 'content' | 'research' | 'alert' | 'system'
  actor: string // 'bart' | 'atlas' | 'forge' | 'radar' | 'ink' | 'ledger' | 'spark' | 'cowork' | 'system'
  title: string
  description?: string
  url?: string // link to commit, deploy, etc
  projectId?: string
  metadata?: string // JSON string for extra data
  createdAt: string
}

export interface DomainOpportunity {
  id: string
  domain: string
  status: string // 'parking' | 'developing' | 'forsale' | 'expired-watching' | 'acquired'
  estimatedValue?: number
  niche?: string
  priority?: string // 'low' | 'medium' | 'high'
  notes?: string
  radarNotes?: string
  createdAt: string
  updatedAt: string
}

export interface RevenueEntry {
  id: string
  source: string // 'adsense' | 'agency' | 'affiliate' | 'domain' | 'leadgen'
  description: string
  amount: number
  month: string // '2026-01' format
  projectId?: string
  siteDomain?: string
  recurring: boolean
  createdAt: string
  updatedAt: string
}

// Generic API functions
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}

// CRUD operations for each data type
export const projectsStorage = {
  getAll: async (): Promise<Project[]> => {
    return apiCall('/api/projects')
  },
  
  create: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    return apiCall('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> => {
    try {
      return await apiCall(`/api/projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating project:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      return false
    }
  },
};

export const sitesStorage = {
  getAll: async (): Promise<Site[]> => {
    return apiCall('/api/sites')
  },
  
  create: async (site: Omit<Site, 'id' | 'createdAt' | 'updatedAt'>): Promise<Site> => {
    return apiCall('/api/sites', {
      method: 'POST',
      body: JSON.stringify(site),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Site, 'id' | 'createdAt'>>): Promise<Site | null> => {
    try {
      return await apiCall(`/api/sites/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating site:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/sites/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting site:', error)
      return false
    }
  },
};

export const ideasStorage = {
  getAll: async (): Promise<Idea[]> => {
    return apiCall('/api/ideas')
  },
  
  create: async (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>): Promise<Idea> => {
    return apiCall('/api/ideas', {
      method: 'POST',
      body: JSON.stringify(idea),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>): Promise<Idea | null> => {
    try {
      return await apiCall(`/api/ideas/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating idea:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/ideas/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting idea:', error)
      return false
    }
  },
};

export const tasksStorage = {
  getAll: async (): Promise<Task[]> => {
    return apiCall('/api/tasks')
  },
  
  create: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    return apiCall('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task | null> => {
    try {
      return await apiCall(`/api/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating task:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting task:', error)
      return false
    }
  },
};

export const notesStorage = {
  getAll: async (): Promise<Note[]> => {
    return apiCall('/api/notes')
  },
  
  create: async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    return apiCall('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> => {
    try {
      return await apiCall(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating note:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/notes/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting note:', error)
      return false
    }
  },
};

export const nowItemsStorage = {
  getAll: async (): Promise<NowItem[]> => {
    return apiCall('/api/now-items')
  },
  
  create: async (item: Omit<NowItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<NowItem> => {
    return apiCall('/api/now-items', {
      method: 'POST',
      body: JSON.stringify(item),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<NowItem, 'id' | 'createdAt'>>): Promise<NowItem | null> => {
    try {
      return await apiCall(`/api/now-items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating now item:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/now-items/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting now item:', error)
      return false
    }
  },
};

export const alertsStorage = {
  getAll: async (): Promise<Alert[]> => {
    return apiCall('/api/alerts')
  },
  
  create: async (alert: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>): Promise<Alert> => {
    return apiCall('/api/alerts', {
      method: 'POST',
      body: JSON.stringify(alert),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Alert, 'id' | 'createdAt'>>): Promise<Alert | null> => {
    try {
      return await apiCall(`/api/alerts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating alert:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/alerts/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting alert:', error)
      return false
    }
  },
};

export const costsStorage = {
  getAll: async (): Promise<Cost[]> => {
    return apiCall('/api/costs')
  },
  
  create: async (cost: Omit<Cost, 'id' | 'createdAt' | 'updatedAt'>): Promise<Cost> => {
    return apiCall('/api/costs', {
      method: 'POST',
      body: JSON.stringify(cost),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<Cost, 'id' | 'createdAt'>>): Promise<Cost | null> => {
    try {
      return await apiCall(`/api/costs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating cost:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/costs/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting cost:', error)
      return false
    }
  },
};

export const contentStorage = {
  getAll: async (): Promise<ContentItem[]> => {
    return apiCall('/api/content')
  },
  
  create: async (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> => {
    return apiCall('/api/content', {
      method: 'POST',
      body: JSON.stringify(content),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<ContentItem, 'id' | 'createdAt'>>): Promise<ContentItem | null> => {
    try {
      return await apiCall(`/api/content/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating content:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/content/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting content:', error)
      return false
    }
  },
};

export const researchStorage = {
  getAll: async (): Promise<ResearchItem[]> => {
    return apiCall('/api/research')
  },
  
  create: async (research: Omit<ResearchItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResearchItem> => {
    return apiCall('/api/research', {
      method: 'POST',
      body: JSON.stringify(research),
    })
  },
  
  update: async (id: string, updates: Partial<Omit<ResearchItem, 'id' | 'createdAt'>>): Promise<ResearchItem | null> => {
    try {
      return await apiCall(`/api/research/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating research:', error)
      return null
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/research/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting research:', error)
      return false
    }
  },
};

export const activityStorage = {
  getAll: async (params?: { limit?: number; actor?: string }): Promise<ActivityItem[]> => {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.actor) searchParams.set('actor', params.actor)
    
    const url = `/api/activity${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return apiCall(url)
  },
  
  create: async (activity: Omit<ActivityItem, 'id' | 'createdAt'>): Promise<ActivityItem> => {
    return apiCall('/api/activity', {
      method: 'POST',
      body: JSON.stringify(activity),
    })
  },
};

export const domainsStorage = {
  getAll: async (params?: { status?: string }): Promise<DomainOpportunity[]> => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)

    const url = `/api/domains${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return apiCall(url)
  },

  create: async (domain: Omit<DomainOpportunity, 'id' | 'createdAt' | 'updatedAt'>): Promise<DomainOpportunity> => {
    return apiCall('/api/domains', {
      method: 'POST',
      body: JSON.stringify(domain),
    })
  },

  update: async (id: string, updates: Partial<Omit<DomainOpportunity, 'id' | 'createdAt'>>): Promise<DomainOpportunity | null> => {
    try {
      return await apiCall(`/api/domains/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating domain:', error)
      return null
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/domains/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting domain:', error)
      return false
    }
  },
};

export const revenueStorage = {
  getAll: async (params?: { source?: string; month?: string }): Promise<RevenueEntry[]> => {
    const searchParams = new URLSearchParams()
    if (params?.source) searchParams.set('source', params.source)
    if (params?.month) searchParams.set('month', params.month)

    const url = `/api/revenue${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return apiCall(url)
  },

  create: async (entry: Omit<RevenueEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<RevenueEntry> => {
    return apiCall('/api/revenue', {
      method: 'POST',
      body: JSON.stringify(entry),
    })
  },

  update: async (id: string, updates: Partial<Omit<RevenueEntry, 'id' | 'createdAt'>>): Promise<RevenueEntry | null> => {
    try {
      return await apiCall(`/api/revenue/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      })
    } catch (error) {
      console.error('Error updating revenue entry:', error)
      return null
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await apiCall(`/api/revenue/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting revenue entry:', error)
      return false
    }
  },
};