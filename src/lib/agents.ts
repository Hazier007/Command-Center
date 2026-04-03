import { AgentName } from './types';

export interface AgentProfile {
  name: AgentName;
  displayName: string;
  role: string;
  description: string;
  specialties: string[];
  color: string; // hex color for UI
  emoji: string;
}

export const AGENTS: Record<AgentName, AgentProfile> = {
  atlas: {
    name: 'atlas',
    displayName: 'ATLAS (VPZI)',
    role: 'Strategist & Operator',
    description: 'Business partner. Dirigeert het team, stelt prioriteiten, bewaakt de grote lijnen.',
    specialties: ['strategie', 'planning', 'prioriteiten', 'team coördinatie'],
    color: '#3B82F6', // blue
    emoji: '🗺️',
  },
  forge: {
    name: 'forge',
    displayName: 'FORGE (JKLQ)',
    role: 'Full-Stack Developer',
    description: 'Bouwt en onderhoudt alle technische systemen. Van frontend tot API tot database.',
    specialties: ['Next.js', 'React', 'Prisma', 'API development', 'deployment'],
    color: '#EF4444', // red
    emoji: '🔨',
  },
  radar: {
    name: 'radar',
    displayName: 'RADAR (JKWF)',
    role: 'SEO & Domain Intelligence',
    description: 'Scant de markt, vindt kansen, analyseert domeinen en zoekverkeer.',
    specialties: ['SEO analyse', 'domein research', 'keyword research', 'concurrentie analyse'],
    color: '#10B981', // green
    emoji: '📡',
  },
  ink: {
    name: 'ink',
    displayName: 'INK (HWHF)',
    role: 'Content & Copywriter',
    description: 'Schrijft alle content. Van blogposts tot productreviews tot landingspaginas.',
    specialties: ['copywriting', 'SEO content', 'productreviews', 'landingspaginas'],
    color: '#8B5CF6', // purple
    emoji: '✒️',
  },
  ledger: {
    name: 'ledger',
    displayName: 'LEDGER (FXSB)',
    role: 'Finance & Analytics',
    description: 'Beheert financiën, analyseert data, maakt rapporten en forecasts.',
    specialties: ['financiële analyse', 'rapportage', 'forecasting', 'KPI tracking'],
    color: '#F59E0B', // amber
    emoji: '📊',
  },
  spark: {
    name: 'spark',
    displayName: 'SPARK (SJGU)',
    role: 'Growth & Acquisitions',
    description: 'Evalueert business ideas, zoekt groei-kansen, analyseert acquisities.',
    specialties: ['business development', 'idee evaluatie', 'groei strategie', 'acquisities'],
    color: '#EC4899', // pink
    emoji: '⚡',
  },
};

export const BART = {
  name: 'bart' as const,
  displayName: 'Bart',
  role: 'Eigenaar & Operator',
  description: 'Oprichter van Hazier. Beslist, keurt goed, stuurt bij.',
  color: '#F5911E', // Hazier orange
  emoji: '👤',
};

export const ALL_ASSIGNEES = ['bart', ...Object.keys(AGENTS), 'cowork'] as const;

export function getAgentProfile(name: string): AgentProfile | undefined {
  return AGENTS[name as AgentName];
}

export function getAssigneeDisplay(name: string): { displayName: string; color: string; emoji: string } {
  if (name === 'bart') return BART;
  if (name === 'cowork') return { displayName: 'Cowork', color: '#6B7280', emoji: '🖥️' };
  if (name === 'system') return { displayName: 'System', color: '#6B7280', emoji: '⚙️' };
  const agent = AGENTS[name as AgentName];
  if (agent) return { displayName: agent.displayName, color: agent.color, emoji: agent.emoji };
  return { displayName: name, color: '#6B7280', emoji: '❓' };
}
