/**
 * localStorage utilities for Command Center data persistence
 */

// Data Types
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

// Storage Keys
const STORAGE_KEYS = {
  PROJECTS: 'command-center-projects',
  SITES: 'command-center-sites',
  IDEAS: 'command-center-ideas',
  TASKS: 'command-center-tasks',
  NOTES: 'command-center-notes',
  NOW_ITEMS: 'command-center-now-items',
  ALERTS: 'command-center-alerts',
} as const;

// Generic localStorage functions
function getFromStorage<T>(key: string, defaultValue: T[] = []): T[] {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// CRUD operations for each data type
export const projectsStorage = {
  getAll: (): Project[] => getFromStorage<Project>(STORAGE_KEYS.PROJECTS),
  
  create: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const projects = projectsStorage.getAll();
    projects.push(newProject);
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },
  
  update: (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null => {
    const projects = projectsStorage.getAll();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    return projects[index];
  },
  
  delete: (id: string): boolean => {
    const projects = projectsStorage.getAll();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (filteredProjects.length === projects.length) return false;
    
    saveToStorage(STORAGE_KEYS.PROJECTS, filteredProjects);
    return true;
  },
};

export const sitesStorage = {
  getAll: (): Site[] => getFromStorage<Site>(STORAGE_KEYS.SITES),
  
  create: (site: Omit<Site, 'id' | 'createdAt' | 'updatedAt'>): Site => {
    const newSite: Site = {
      ...site,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const sites = sitesStorage.getAll();
    sites.push(newSite);
    saveToStorage(STORAGE_KEYS.SITES, sites);
    return newSite;
  },
  
  update: (id: string, updates: Partial<Omit<Site, 'id' | 'createdAt'>>): Site | null => {
    const sites = sitesStorage.getAll();
    const index = sites.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    sites[index] = {
      ...sites[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.SITES, sites);
    return sites[index];
  },
  
  delete: (id: string): boolean => {
    const sites = sitesStorage.getAll();
    const filteredSites = sites.filter(s => s.id !== id);
    
    if (filteredSites.length === sites.length) return false;
    
    saveToStorage(STORAGE_KEYS.SITES, filteredSites);
    return true;
  },
};

export const ideasStorage = {
  getAll: (): Idea[] => getFromStorage<Idea>(STORAGE_KEYS.IDEAS),
  
  create: (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>): Idea => {
    const newIdea: Idea = {
      ...idea,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const ideas = ideasStorage.getAll();
    ideas.push(newIdea);
    saveToStorage(STORAGE_KEYS.IDEAS, ideas);
    return newIdea;
  },
  
  update: (id: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>): Idea | null => {
    const ideas = ideasStorage.getAll();
    const index = ideas.findIndex(i => i.id === id);
    
    if (index === -1) return null;
    
    ideas[index] = {
      ...ideas[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.IDEAS, ideas);
    return ideas[index];
  },
  
  delete: (id: string): boolean => {
    const ideas = ideasStorage.getAll();
    const filteredIdeas = ideas.filter(i => i.id !== id);
    
    if (filteredIdeas.length === ideas.length) return false;
    
    saveToStorage(STORAGE_KEYS.IDEAS, filteredIdeas);
    return true;
  },
};

export const tasksStorage = {
  getAll: (): Task[] => getFromStorage<Task>(STORAGE_KEYS.TASKS),
  
  create: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const tasks = tasksStorage.getAll();
    tasks.push(newTask);
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return newTask;
  },
  
  update: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null => {
    const tasks = tasksStorage.getAll();
    const index = tasks.findIndex(t => t.id === id);
    
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return tasks[index];
  },
  
  delete: (id: string): boolean => {
    const tasks = tasksStorage.getAll();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    saveToStorage(STORAGE_KEYS.TASKS, filteredTasks);
    return true;
  },
};

export const notesStorage = {
  getAll: (): Note[] => getFromStorage<Note>(STORAGE_KEYS.NOTES),
  
  create: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const notes = notesStorage.getAll();
    notes.push(newNote);
    saveToStorage(STORAGE_KEYS.NOTES, notes);
    return newNote;
  },
  
  update: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Note | null => {
    const notes = notesStorage.getAll();
    const index = notes.findIndex(n => n.id === id);
    
    if (index === -1) return null;
    
    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.NOTES, notes);
    return notes[index];
  },
  
  delete: (id: string): boolean => {
    const notes = notesStorage.getAll();
    const filteredNotes = notes.filter(n => n.id !== id);
    
    if (filteredNotes.length === notes.length) return false;
    
    saveToStorage(STORAGE_KEYS.NOTES, filteredNotes);
    return true;
  },
};

export const nowItemsStorage = {
  getAll: (): NowItem[] => getFromStorage<NowItem>(STORAGE_KEYS.NOW_ITEMS),
  
  create: (item: Omit<NowItem, 'id' | 'createdAt' | 'updatedAt'>): NowItem => {
    const newItem: NowItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const items = nowItemsStorage.getAll();
    items.push(newItem);
    saveToStorage(STORAGE_KEYS.NOW_ITEMS, items);
    return newItem;
  },
  
  update: (id: string, updates: Partial<Omit<NowItem, 'id' | 'createdAt'>>): NowItem | null => {
    const items = nowItemsStorage.getAll();
    const index = items.findIndex(i => i.id === id);
    
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.NOW_ITEMS, items);
    return items[index];
  },
  
  delete: (id: string): boolean => {
    const items = nowItemsStorage.getAll();
    const filteredItems = items.filter(i => i.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    saveToStorage(STORAGE_KEYS.NOW_ITEMS, filteredItems);
    return true;
  },
};

export const alertsStorage = {
  getAll: (): Alert[] => getFromStorage<Alert>(STORAGE_KEYS.ALERTS),
  
  create: (alert: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>): Alert => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const alerts = alertsStorage.getAll();
    alerts.push(newAlert);
    saveToStorage(STORAGE_KEYS.ALERTS, alerts);
    return newAlert;
  },
  
  update: (id: string, updates: Partial<Omit<Alert, 'id' | 'createdAt'>>): Alert | null => {
    const alerts = alertsStorage.getAll();
    const index = alerts.findIndex(a => a.id === id);
    
    if (index === -1) return null;
    
    alerts[index] = {
      ...alerts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveToStorage(STORAGE_KEYS.ALERTS, alerts);
    return alerts[index];
  },
  
  delete: (id: string): boolean => {
    const alerts = alertsStorage.getAll();
    const filteredAlerts = alerts.filter(a => a.id !== id);
    
    if (filteredAlerts.length === alerts.length) return false;
    
    saveToStorage(STORAGE_KEYS.ALERTS, filteredAlerts);
    return true;
  },
};