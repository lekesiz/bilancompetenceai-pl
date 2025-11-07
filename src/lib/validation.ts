import { z } from 'zod'
import type { BilanPhase, BilanStatus, SessionFormat, SkillLevel, SkillFrequency, SkillPreference } from './types'

export const emailSchema = z.string().email('Email invalide')
export const phoneSchema = z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone français invalide').optional()

export const bilanSchema = z.object({
  id: z.string(),
  beneficiaryId: z.string(),
  beneficiaryName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  consultantId: z.string(),
  consultantName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phase: z.enum(['preliminary', 'investigation', 'conclusion'] as const),
  status: z.enum(['active', 'completed', 'archived'] as const),
  progress: z.number().min(0).max(100),
  startDate: z.string(),
  endDate: z.string().optional(),
  nextSession: z.string().optional(),
  totalHours: z.number().min(24, 'Un bilan de compétences doit durer au minimum 24 heures'),
  completedHours: z.number().min(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  objectives: z.array(z.string()).optional(),
  contractSigned: z.boolean().optional()
})

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Le nom de la compétence doit contenir au moins 2 caractères'),
  category: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert'] as const),
  frequency: z.enum(['rarely', 'sometimes', 'often', 'daily'] as const),
  preference: z.enum(['dislike', 'neutral', 'like'] as const),
  context: z.string().min(10, 'Le contexte doit contenir au moins 10 caractères'),
  yearsExperience: z.number().min(0).max(50).optional(),
  isTransferable: z.boolean().optional()
})

export const sessionSchema = z.object({
  id: z.string(),
  bilanId: z.string(),
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string(),
  date: z.string(),
  duration: z.number().min(30, 'Une séance doit durer au minimum 30 minutes').max(480, 'Une séance ne peut pas dépasser 8 heures'),
  format: z.enum(['visio', 'presentiel', 'telephone'] as const),
  status: z.enum(['scheduled', 'completed', 'cancelled'] as const),
  notes: z.string().optional(),
  attendees: z.array(z.string())
})

export const messageSchema = z.object({
  id: z.string(),
  bilanId: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  senderRole: z.enum(['consultant', 'beneficiary'] as const),
  content: z.string().min(1, 'Le message ne peut pas être vide').max(5000, 'Le message ne peut pas dépasser 5000 caractères'),
  timestamp: z.string(),
  read: z.boolean()
})

export const satisfactionSurveySchema = z.object({
  id: z.string(),
  bilanId: z.string(),
  beneficiaryId: z.string(),
  consultantId: z.string(),
  submittedAt: z.string(),
  ratings: z.object({
    clarity: z.number().min(1).max(5),
    listening: z.number().min(1).max(5),
    relevance: z.number().min(1).max(5),
    tools: z.number().min(1).max(5),
    recommendation: z.number().min(1).max(5),
    overall: z.number().min(1).max(5)
  }),
  feedback: z.object({
    strengths: z.string().min(10, 'Merci de détailler vos réponses (minimum 10 caractères)'),
    improvements: z.string().min(10, 'Merci de détailler vos réponses (minimum 10 caractères)'),
    nextSteps: z.string().min(10, 'Merci de détailler vos réponses (minimum 10 caractères)'),
    testimonial: z.string().optional()
  }),
  npsScore: z.number().min(0).max(10),
  consentTestimonial: z.boolean(),
  consentDataUse: z.boolean()
})

export function validateBilan(data: unknown) {
  return bilanSchema.safeParse(data)
}

export function validateSkill(data: unknown) {
  return skillSchema.safeParse(data)
}

export function validateSession(data: unknown) {
  return sessionSchema.safeParse(data)
}

export function validateMessage(data: unknown) {
  return messageSchema.safeParse(data)
}

export function validateSatisfactionSurvey(data: unknown) {
  return satisfactionSurveySchema.safeParse(data)
}

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success
}

export function validatePhoneNumber(phone: string): boolean {
  return phoneSchema.safeParse(phone).success
}

export function validateDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return end >= start
}

export function validateBilanDuration(startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  return diffMonths >= 2 && diffMonths <= 6
}

export function validateProgress(completedHours: number, totalHours: number): number {
  if (totalHours === 0) return 0
  const progress = (completedHours / totalHours) * 100
  return Math.min(Math.max(progress, 0), 100)
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '')
}

export function validateROMECode(code: string): boolean {
  return /^[A-N][0-9]{4}$/.test(code)
}

export function validateSIRET(siret: string): boolean {
  const cleaned = siret.replace(/\s/g, '')
  if (!/^\d{14}$/.test(cleaned)) return false
  
  let sum = 0
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(cleaned[i])
    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }
  return sum % 10 === 0
}

export const formatters = {
  date: (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date)
  },
  
  dateTime: (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  },
  
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
    }
    return phone
  },
  
  currency: (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  },
  
  percentage: (value: number): string => {
    return `${Math.round(value)}%`
  },
  
  duration: (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}min`
    if (mins === 0) return `${hours}h`
    return `${hours}h${mins}`
  }
}
