import { ActiveAssignee } from './types';

export interface TeamMember {
  name: ActiveAssignee;
  displayName: string;
  role: string;
  description: string;
  specialties: string[];
  color: string;
  emoji: string;
}

export const TEAM: Record<ActiveAssignee, TeamMember> = {
  bart: {
    name: 'bart',
    displayName: 'Bart',
    role: 'CEO & beslisser',
    description: 'Eigenaar van de cockpit. Keurt outreach, prioriteiten, investeringen en partnerdeals goed.',
    specialties: ['beslissen', 'relaties', 'goedkeuring', 'focus'],
    color: '#F5911E',
    emoji: '👑',
  },
  hermes: {
    name: 'hermes',
    displayName: 'Hermes',
    role: 'Command Center operator',
    description: 'Coördineert uitvoering, code, research, agents, deployment en dagelijkse beslissingen.',
    specialties: ['orchestratie', 'development', 'research', 'deployments'],
    color: '#FFFFFF',
    emoji: '🧠',
  },
  lisa: {
    name: 'lisa',
    displayName: 'Lisa',
    role: 'Projectmanager',
    description: 'Bewaakt planning, taken, overdracht, deadlines en correcte opslag in Command Center.',
    specialties: ['planning', 'taken', 'overdracht', 'rapportage'],
    color: '#38BDF8',
    emoji: '📋',
  },
  wout: {
    name: 'wout',
    displayName: 'Wout',
    role: 'SEO & research',
    description: 'Doet SERP-checks, audits, keywordresearch en site-monitoring voor alle businessen.',
    specialties: ['SEO', 'research', 'audits', 'rank tracking'],
    color: '#34D399',
    emoji: '🔎',
  },
  'jean-cloud': {
    name: 'jean-cloud',
    displayName: 'Jean-Cloud',
    role: 'Cloud & automatisatie',
    description: 'Zorgt voor integraties, automations, APIs, deployment en technische workflows.',
    specialties: ['cloud', 'automation', 'APIs', 'ops'],
    color: '#A78BFA',
    emoji: '☁️',
  },
  copycat: {
    name: 'copycat',
    displayName: 'Copycat',
    role: 'Copy & outreach',
    description: 'Schrijft sitecopy, persoonlijke prospectmails, follow-ups en commerciële teksten.',
    specialties: ['copywriting', 'outreach', 'follow-up', 'conversie'],
    color: '#FB7185',
    emoji: '✍️',
  },
  beeldmaker: {
    name: 'beeldmaker',
    displayName: 'BeeldMaker',
    role: 'Visuals & assets',
    description: 'Maakt visuele assets, hero-afbeeldingen, thumbnails en campagnebeelden.',
    specialties: ['visuals', 'assets', 'OpenAI images', 'branding'],
    color: '#FACC15',
    emoji: '🎨',
  },
};

export const ACTIVE_ASSIGNEES: ActiveAssignee[] = ['bart', 'hermes', 'lisa', 'wout', 'jean-cloud', 'copycat', 'beeldmaker'];

export function getTeamMember(name: string): TeamMember | undefined {
  return TEAM[name as ActiveAssignee];
}

export function isActiveAssignee(name: string): name is ActiveAssignee {
  return ACTIVE_ASSIGNEES.includes(name as ActiveAssignee);
}

export function getAssigneeDisplay(name: string): { displayName: string; color: string; emoji: string; isLegacy?: boolean } {
  const member = TEAM[name as ActiveAssignee];
  if (member) return { displayName: member.displayName, color: member.color, emoji: member.emoji };
  if (name === 'system') return { displayName: 'System', color: '#6B7280', emoji: '⚙️' };
  return { displayName: name, color: '#6B7280', emoji: '•' };
}
