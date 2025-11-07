import type { Bilan, SatisfactionSurvey, Consultant } from './types'

export interface AnalyticsMetrics {
  totalBilans: number
  activeBilans: number
  completedBilans: number
  averageDuration: number
  averageSatisfaction: number
  completionRate: number
  nps: number
  retentionRate: number
}

export interface RevenueMetrics {
  mrr: number
  arr: number
  averageRevenuePerBilan: number
  projectedAnnualRevenue: number
  growthRate: number
}

export interface QualityMetrics {
  averageSatisfaction: number
  nps: number
  completionRate: number
  averageResponseTime: number
  qualiopiCompliance: number
}

export function calculateBilanMetrics(bilans: Bilan[]): AnalyticsMetrics {
  const total = bilans.length
  const active = bilans.filter(b => b.status === 'active').length
  const completed = bilans.filter(b => b.status === 'completed').length
  
  const completedBilans = bilans.filter(b => b.status === 'completed' && b.startDate && b.endDate)
  const avgDuration = completedBilans.length > 0
    ? completedBilans.reduce((sum, b) => {
        const start = new Date(b.startDate)
        const end = new Date(b.endDate!)
        const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        return sum + days
      }, 0) / completedBilans.length
    : 0
  
  const completionRate = total > 0 ? (completed / total) * 100 : 0
  
  return {
    totalBilans: total,
    activeBilans: active,
    completedBilans: completed,
    averageDuration: Math.round(avgDuration),
    averageSatisfaction: 0,
    completionRate: Math.round(completionRate * 10) / 10,
    nps: 0,
    retentionRate: 0
  }
}

export function calculateSatisfactionMetrics(surveys: SatisfactionSurvey[]): {
  averageSatisfaction: number
  nps: number
  responseRate: number
} {
  if (surveys.length === 0) {
    return { averageSatisfaction: 0, nps: 0, responseRate: 0 }
  }
  
  const avgSatisfaction = surveys.reduce((sum, s) => sum + s.ratings.overall, 0) / surveys.length
  
  const promoters = surveys.filter(s => s.npsScore >= 9).length
  const detractors = surveys.filter(s => s.npsScore <= 6).length
  const nps = ((promoters - detractors) / surveys.length) * 100
  
  return {
    averageSatisfaction: Math.round(avgSatisfaction * 10) / 10,
    nps: Math.round(nps),
    responseRate: 0
  }
}

export function calculateRevenueMetrics(
  bilans: Bilan[],
  averageBilanPrice: number = 1800
): RevenueMetrics {
  const completedThisMonth = bilans.filter(b => {
    if (b.status !== 'completed' || !b.endDate) return false
    const endDate = new Date(b.endDate)
    const now = new Date()
    return endDate.getMonth() === now.getMonth() && endDate.getFullYear() === now.getFullYear()
  }).length
  
  const completedLastMonth = bilans.filter(b => {
    if (b.status !== 'completed' || !b.endDate) return false
    const endDate = new Date(b.endDate)
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return endDate.getMonth() === lastMonth.getMonth() && endDate.getFullYear() === lastMonth.getFullYear()
  }).length
  
  const mrr = completedThisMonth * averageBilanPrice
  const arr = mrr * 12
  const avgRevenuePerBilan = averageBilanPrice
  const projectedArr = arr
  
  const growthRate = completedLastMonth > 0 
    ? ((completedThisMonth - completedLastMonth) / completedLastMonth) * 100 
    : 0
  
  return {
    mrr,
    arr,
    averageRevenuePerBilan: avgRevenuePerBilan,
    projectedAnnualRevenue: projectedArr,
    growthRate: Math.round(growthRate * 10) / 10
  }
}

export function calculateConsultantPerformance(consultant: Consultant, bilans: Bilan[]): {
  activeBilans: number
  completedBilans: number
  averageProgress: number
  utilizationRate: number
} {
  const consultantBilans = bilans.filter(b => b.consultantId === consultant.id)
  const active = consultantBilans.filter(b => b.status === 'active').length
  const completed = consultantBilans.filter(b => b.status === 'completed').length
  
  const avgProgress = consultantBilans.length > 0
    ? consultantBilans.reduce((sum, b) => sum + b.progress, 0) / consultantBilans.length
    : 0
  
  const maxCapacity = 8
  const utilizationRate = (active / maxCapacity) * 100
  
  return {
    activeBilans: active,
    completedBilans: completed,
    averageProgress: Math.round(avgProgress),
    utilizationRate: Math.round(utilizationRate)
  }
}

export function calculateQualiopiCompliance(bilans: Bilan[]): {
  compliantBilans: number
  complianceRate: number
  indicators: Record<string, number>
} {
  const completed = bilans.filter(b => b.status === 'completed')
  
  const indicator1 = completed.filter(b => b.contractSigned === true).length
  const indicator2 = completed.filter(b => b.totalHours >= 24).length
  const indicator11 = completed.length
  
  const compliantBilans = completed.filter(b => 
    b.contractSigned === true && 
    b.totalHours >= 24
  ).length
  
  const complianceRate = completed.length > 0 
    ? (compliantBilans / completed.length) * 100 
    : 100
  
  return {
    compliantBilans,
    complianceRate: Math.round(complianceRate),
    indicators: {
      indicator1: completed.length > 0 ? Math.round((indicator1 / completed.length) * 100) : 100,
      indicator2: completed.length > 0 ? Math.round((indicator2 / completed.length) * 100) : 100,
      indicator11: 100
    }
  }
}

export function predictChurnRisk(bilan: Bilan): 'low' | 'medium' | 'high' {
  const now = new Date()
  const start = new Date(bilan.startDate)
  const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  
  const expectedProgress = Math.min((daysSinceStart / 90) * 100, 100)
  const progressGap = expectedProgress - bilan.progress
  
  if (progressGap > 30) return 'high'
  if (progressGap > 15) return 'medium'
  return 'low'
}

export function calculateCohortAnalysis(bilans: Bilan[]): Array<{
  cohort: string
  totalBilans: number
  completedBilans: number
  retentionRate: number
}> {
  const cohorts = new Map<string, { total: number; completed: number }>()
  
  bilans.forEach(bilan => {
    const cohortKey = bilan.startDate.substring(0, 7)
    const existing = cohorts.get(cohortKey) || { total: 0, completed: 0 }
    existing.total++
    if (bilan.status === 'completed') existing.completed++
    cohorts.set(cohortKey, existing)
  })
  
  return Array.from(cohorts.entries())
    .map(([cohort, data]) => ({
      cohort,
      totalBilans: data.total,
      completedBilans: data.completed,
      retentionRate: Math.round((data.completed / data.total) * 100)
    }))
    .sort((a, b) => b.cohort.localeCompare(a.cohort))
}

export function generateInsights(bilans: Bilan[], surveys: SatisfactionSurvey[]): string[] {
  const insights: string[] = []
  
  const metrics = calculateBilanMetrics(bilans)
  const satMetrics = calculateSatisfactionMetrics(surveys)
  
  if (metrics.completionRate < 75) {
    insights.push(`⚠️ Taux d'achèvement de ${metrics.completionRate}% - En dessous de l'objectif de 85%`)
  }
  
  if (satMetrics.averageSatisfaction >= 4.5) {
    insights.push(`✅ Excellente satisfaction moyenne de ${satMetrics.averageSatisfaction}/5`)
  }
  
  if (satMetrics.nps >= 50) {
    insights.push(`✅ NPS excellent de ${satMetrics.nps} - Vos bénéficiaires sont vos meilleurs ambassadeurs`)
  } else if (satMetrics.nps < 30) {
    insights.push(`⚠️ NPS de ${satMetrics.nps} - Amélioration de l'expérience nécessaire`)
  }
  
  if (metrics.activeBilans > metrics.completedBilans * 1.5) {
    insights.push(`📊 Forte croissance - ${metrics.activeBilans} bilans actifs vs ${metrics.completedBilans} terminés`)
  }
  
  if (metrics.averageDuration > 100) {
    insights.push(`⏱️ Durée moyenne élevée de ${metrics.averageDuration} jours - Optimisation possible`)
  }
  
  return insights
}

export function calculateLTV(
  averageBilanPrice: number = 1800,
  averageBilansPerClient: number = 1.2,
  retentionYears: number = 2
): number {
  return averageBilanPrice * averageBilansPerClient * retentionYears
}

export function calculateCAC(
  marketingSpend: number,
  newClients: number
): number {
  return newClients > 0 ? marketingSpend / newClients : 0
}

export function calculatePaybackPeriod(cac: number, mrr: number): number {
  return mrr > 0 ? cac / mrr : 0
}
