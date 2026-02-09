/**
 * API-based storage utilities for Command Center data persistence
 * Replaces localStorage with database API calls
 */

// Data Types (keep same interfaces for compatibility)
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'planned' | 'paused';
  category: 'directory' | 'leadgen' | 'tool' | 'client' | 'business' | 'event';
  description?: string;
  revenue?: number; // monthly estimate
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
  createdAt: string;
  updatedAt: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'directory' | 'leadgen' | 'tool' | 'client' | 'business' | 'feature';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
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