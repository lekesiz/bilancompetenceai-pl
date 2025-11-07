export type BilanPhase = 'preliminary' | 'investigation' | 'conclusion'
export type BilanStatus = 'active' | 'completed' | 'archived'
export type SessionFormat = 'visio' | 'presentiel' | 'telephone'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type SkillFrequency = 'rarely' | 'sometimes' | 'often' | 'daily'
export type SkillPreference = 'dislike' | 'neutral' | 'like'

export interface Bilan {
  id: string
  beneficiaryId: string
  beneficiaryName: string
  consultantId: string
  consultantName: string
  phase: BilanPhase
  status: BilanStatus
  progress: number
  startDate: string
  endDate?: string
  nextSession?: string
  totalHours: number
  completedHours: number
  createdAt: string
  updatedAt: string
  objectives?: string[]
  contractSigned?: boolean
}

export interface Skill {
  id: string
  name: string
  category: string
  level: SkillLevel
  frequency: SkillFrequency
  preference: SkillPreference
  context: string
  yearsExperience?: number
  isTransferable?: boolean
}

export interface Session {
  id: string
  bilanId: string
  title: string
  description: string
  date: string
  duration: number
  format: SessionFormat
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  attendees: string[]
}

export interface Message {
  id: string
  bilanId: string
  senderId: string
  senderName: string
  senderRole: 'consultant' | 'beneficiary'
  content: string
  timestamp: string
  read: boolean
}

export interface CareerRecommendation {
  id: string
  jobTitle: string
  romeCode: string
  matchPercentage: number
  requiredSkills: string[]
  missingSkills: string[]
  salaryRange: string
  outlook: string
  trainingPath?: string[]
}

export interface JobOpportunity {
  id: string
  title: string
  company: string
  location: string
  contractType: string
  salary?: string
  romeCode: string
  skills: string[]
  description: string
  postedDate: string
  url?: string
}

export interface QualiopiIndicator {
  id: number
  title: string
  description: string
  status: 'compliant' | 'partial' | 'non-compliant'
  evidence: string[]
  lastAudit?: string
}

export interface SatisfactionSurvey {
  id: string
  bilanId: string
  beneficiaryId: string
  consultantId: string
  submittedAt: string
  ratings: {
    clarity: number
    listening: number
    relevance: number
    tools: number
    recommendation: number
    overall: number
  }
  feedback: {
    strengths: string
    improvements: string
    nextSteps: string
    testimonial?: string
  }
  npsScore: number
  consentTestimonial: boolean
  consentDataUse: boolean
}

export interface AuditLog {
  id: string
  timestamp: string
  userId: string
  action: string
  resource: string
  resourceId: string
  details?: Record<string, unknown>
}

export interface OrganismeStats {
  totalBilans: number
  activeBilans: number
  completedBilans: number
  totalConsultants: number
  averageSatisfaction: number
  qualiopiCompliance: number
  monthlyCompletions: number
  averageDuration: number
}

export interface Consultant {
  id: string
  name: string
  email: string
  phone?: string
  certifications: string[]
  specialties: string[]
  activeBilans: number
  completedBilans: number
  satisfaction: number
  certified: boolean
  joinedDate: string
}

export interface Beneficiary {
  id: string
  name: string
  email: string
  phone?: string
  currentJob?: string
  currentSector?: string
  motivation: string
  activeBilanId?: string
  completedBilans: number
  joinedDate: string
}

export interface ROMECode {
  code: string
  label: string
  jobFamily: string
  description: string
  requiredSkills: string[]
  relatedCodes: string[]
}

export interface ROMEReference {
  code: string
  label: string
  definition: string
  skills: string[]
  relatedCodes: string[]
}

export interface SynthesisDocument {
  bilanId: string
  beneficiaryName: string
  consultantName: string
  generatedAt: string
  sections: {
    introduction: string
    currentSituation: string
    skillsAnalysis: string
    motivations: string
    careerRecommendations: string
    actionPlan: string
    conclusion: string
  }
  skills: Skill[]
  recommendations: CareerRecommendation[]
  nextSteps: ActionItem[]
}

export interface ActionItem {
  id: string
  title: string
  description: string
  deadline?: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  category: 'formation' | 'recherche' | 'networking' | 'certification' | 'autre'
}
