export type BilanPhase = 'preliminary' | 'investigation' | 'conclusion'
export type BilanStatus = 'pending' | 'active' | 'completed' | 'archived'
export type UserRole = 'consultant' | 'beneficiary' | 'admin'
export type ContractType = 'CDI' | 'CDD' | 'Interim' | 'Alternance' | 'Stage'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type SkillFrequency = 'daily' | 'weekly' | 'monthly' | 'rarely'
export type SkillPreference = 'love' | 'neutral' | 'dislike'
export type SessionFormat = 'visio' | 'presentiel' | 'telephone'

export interface User {
  id: string
  role: UserRole
  firstName: string
  lastName: string
  email: string
  phone?: string
  organization?: string
  createdAt: string
}

export interface Bilan {
  id: string
  beneficiaryId: string
  beneficiaryName: string
  consultantId: string
  consultantName: string
  organizationId?: string
  phase: BilanPhase
  status: BilanStatus
  progress: number
  startDate: string
  endDate?: string
  nextSession?: string
  objectives: string[]
  contractSigned: boolean
  contractSignedDate?: string
  hoursCompleted: number
  totalHours: number
  qualiopi: {
    informed: boolean
    satisfactionCollected: boolean
    resultsTracked: boolean
    documentsArchived: boolean
  }
}

export interface Skill {
  id: string
  name: string
  category: string
  description: string
  romeCode?: string
  level: SkillLevel
  frequency: SkillFrequency
  preference: SkillPreference
  context: 'professional' | 'personal' | 'training'
  yearsExperience?: number
  transferable: boolean
}

export interface SkillAssessment {
  bilanId: string
  beneficiaryId: string
  skills: Skill[]
  completedAt?: string
  consultantValidated: boolean
  aiAnalysisCompleted: boolean
}

export interface CareerRecommendation {
  id: string
  bilanId: string
  jobTitle: string
  romeCode: string
  matchScore: number
  requiredSkills: string[]
  skillGaps: string[]
  salaryRange?: string
  marketDemand: 'high' | 'medium' | 'low'
  transitionDifficulty: 'easy' | 'moderate' | 'difficult'
  trainingPath: string[]
  estimatedDuration: string
  generatedAt: string
}

export interface Session {
  id: string
  bilanId: string
  beneficiaryId: string
  consultantId: string
  title: string
  phase: BilanPhase
  date: string
  startTime: string
  endTime: string
  duration: number
  format: SessionFormat
  location?: string
  notes?: string
  objectives?: string[]
  completed: boolean
  attendanceConfirmed: boolean
  documentUrl?: string
}

export interface Message {
  id: string
  bilanId: string
  senderId: string
  senderName: string
  senderRole: UserRole
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

export interface SynthesisDocument {
  bilanId: string
  beneficiaryId: string
  consultantId: string
  sections: {
    presentation: string
    professionalHistory: string
    skillsMapping: string
    motivationsValues: string
    professionalProject: string
    actionPlan: string
    trainingRecommendations: string
  }
  generatedAt: string
  consultantReviewedAt?: string
  beneficiaryReceivedAt?: string
  digitalSignature?: string
  qualiopi: {
    compliant: boolean
    indicators: string[]
  }
}

export interface ActionPlan {
  bilanId: string
  objectives: ActionPlanObjective[]
  createdAt: string
  updatedAt: string
}

export interface ActionPlanObjective {
  id: string
  description: string
  specific: string
  measurable: string
  achievable: string
  realistic: string
  timebound: string
  status: 'not_started' | 'in_progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
  resources: string[]
}

export interface ROMEReference {
  code: string
  label: string
  definition: string
  skills: string[]
  relatedCodes: string[]
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId: string
  timestamp: string
  ipAddress?: string
  metadata?: Record<string, any>
}

export interface QualiopiIndicator {
  number: number
  label: string
  description: string
  status: 'compliant' | 'partial' | 'non_compliant'
  evidence: string[]
  lastAuditDate?: string
}

export interface OrganizationStats {
  totalBilans: number
  activeBilans: number
  completedBilans: number
  totalConsultants: number
  averageCompletionTime: number
  satisfactionRate: number
  qualiopiCompliance: number
}
