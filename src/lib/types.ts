// Agent & Assignee Types
export type AgentName = 'atlas' | 'forge' | 'radar' | 'ink' | 'ledger' | 'spark';
export type Assignee = 'bart' | AgentName | 'cowork';
export type ActorType = Assignee | 'system';

// Owner Types
export type OwnerType = 'client' | 'own';

// Business Units
export type BusinessUnit = 'agency' | 'rankrent' | 'affiliate' | 'tools' | 'leadgen' | 'festival';

// Contract Types
export type ContractType = 'retainer' | 'eenmalig' | 'mixed';

// Revenue Sources
export type RevenueSource = 'adsense' | 'agency' | 'affiliate' | 'domain' | 'leadgen';

// SEO Status
export type SeoStatus = 'growing' | 'stable' | 'declining' | 'unknown';

// Domain Opportunity Status
export type DomainStatus = 'parking' | 'developing' | 'forsale' | 'expired-watching' | 'acquired';

// Idea Status (Oracle)
export type IdeaStatus = 'raw' | 'evaluating' | 'promising' | 'active' | 'archived';

// Task Source
export type TaskSource = 'manual' | 'agent' | 'cron';

// Content Workflow Status
export type ContentStatus = 'briefing' | 'draft' | 'review' | 'approved' | 'rejected' | 'published';

// Notification Levels
export type NotifyLevel = 'info' | 'alert' | 'urgent';

// Agent API Actions
export type AgentAction = 'task' | 'idea' | 'alert' | 'note' | 'decision' | 'context';

// Note Types (extended with feedback/analysis)
export type NoteType = 'progress' | 'decision' | 'blocker' | 'review' | 'general' | 'feedback' | 'analysis' | 'lesson-learned';

// Feedback Sentiment
export type Sentiment = 'positive' | 'negative' | 'neutral' | 'mixed';

// Decision Outcome
export type DecisionOutcome = 'approved' | 'rejected' | 'deferred' | 'adjusted';

// Decision Category
export type DecisionCategory = 'idea-eval' | 'project-direction' | 'resource' | 'technical' | 'financial' | 'general';

// Decision Result Status
export type DecisionResultStatus = 'pending' | 'implemented' | 'superseded' | 'reversed';
