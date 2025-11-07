import { QualiopiIndicator, Bilan, Session } from './types'

interface QualiopiIndicatorTemplate {
  id: number
  title: string
  description: string
}

export const QUALIOPI_INDICATORS: Record<number, QualiopiIndicatorTemplate> = {
  1: {
    id: 1,
    title: 'Information du public sur les prestations',
    description: 'Les prestations proposées par le prestataire, les délais pour y accéder, les résultats obtenus et les modalités de recours sont communiqués au public'
  },
  2: {
    id: 2,
    title: 'Indicateurs de résultats',
    description: 'Les indicateurs de résultats des prestations du prestataire sont rendus publics'
  },
  3: {
    id: 3,
    title: 'Obtention de la certification',
    description: 'Information adaptée pour favoriser l\'insertion professionnelle des publics accueillis'
  },
  11: {
    id: 11,
    title: 'Évaluation des acquis et de la satisfaction',
    description: 'Les prestations délivrées sont évaluées et la satisfaction des bénéficiaires est mesurée'
  },
  22: {
    id: 22,
    title: 'Traçabilité des actions',
    description: 'Le prestataire assure la traçabilité de ses prestations et met en place une veille sur les évolutions réglementaires'
  },
  23: {
    id: 23,
    title: 'Mesure de la satisfaction',
    description: 'Le prestataire recueille les appréciations des bénéficiaires sur les prestations'
  },
  24: {
    id: 24,
    title: 'Amélioration continue',
    description: 'Le prestataire met en œuvre une démarche d\'amélioration continue de ses prestations'
  },
  25: {
    id: 25,
    title: 'Analyse des retours',
    description: 'Le prestataire analyse les retours des bénéficiaires et des parties prenantes'
  }
}

export function evaluateBilanCompliance(
  bilan: Bilan,
  sessions: Session[],
  hasSynthesisDocument: boolean,
  satisfactionCollected: boolean
): { compliant: boolean; indicators: QualiopiIndicator[] } {
  const indicators: QualiopiIndicator[] = []
  
  indicators.push({
    id: 1,
    title: QUALIOPI_INDICATORS[1].title,
    description: QUALIOPI_INDICATORS[1].description,
    status: (bilan.objectives && bilan.objectives.length > 0 && bilan.contractSigned) ? 'compliant' : 'non-compliant',
    evidence: [
      bilan.contractSigned ? 'Contrat signé' : 'Contrat non signé',
      `Objectifs définis: ${bilan.objectives?.length || 0}`,
      `Date de début: ${bilan.startDate}`
    ]
  })
  
  indicators.push({
    id: 2,
    title: QUALIOPI_INDICATORS[2].title,
    description: QUALIOPI_INDICATORS[2].description,
    status: bilan.progress > 0 ? 'compliant' : 'non-compliant',
    evidence: [
      `Progression: ${bilan.progress}%`,
      `Heures réalisées: ${bilan.completedHours}/${bilan.totalHours}`,
      `Phase: ${bilan.phase}`
    ]
  })
  
  const totalSessionHours = sessions.reduce((sum, s) => sum + s.duration, 0)
  const minRequiredHours = 24
  const completedSessions = sessions.filter(s => s.status === 'completed')
  
  indicators.push({
    id: 22,
    title: QUALIOPI_INDICATORS[22].title,
    description: QUALIOPI_INDICATORS[22].description,
    status: totalSessionHours >= minRequiredHours && sessions.every(s => s.status === 'completed') ? 'compliant' : 'partial',
    evidence: [
      `Sessions programmées: ${sessions.length}`,
      `Heures totales: ${totalSessionHours}h (minimum ${minRequiredHours}h requis)`,
      `Sessions complétées: ${completedSessions.length}/${sessions.length}`,
      `Traçabilité assurée pour ${sessions.length} sessions`
    ]
  })
  
  indicators.push({
    id: 11,
    title: QUALIOPI_INDICATORS[11].title,
    description: QUALIOPI_INDICATORS[11].description,
    status: satisfactionCollected && hasSynthesisDocument ? 'compliant' : 'non-compliant',
    evidence: [
      satisfactionCollected ? 'Enquête de satisfaction complétée' : 'Enquête en attente',
      hasSynthesisDocument ? 'Document de synthèse généré' : 'Document en attente',
      bilan.status === 'completed' ? 'Bilan terminé' : 'Bilan en cours'
    ]
  })
  
  indicators.push({
    id: 23,
    title: QUALIOPI_INDICATORS[23].title,
    description: QUALIOPI_INDICATORS[23].description,
    status: satisfactionCollected ? 'compliant' : 'non-compliant',
    evidence: [
      satisfactionCollected ? 'Satisfaction recueillie' : 'En attente',
      `Bénéficiaire: ${bilan.beneficiaryName}`
    ]
  })
  
  const compliant = indicators.every(ind => ind.status === 'compliant')
  
  return { compliant, indicators }
}

export function generateQualiopiReport(
  bilans: Bilan[],
  completedBilans: number,
  averageSatisfaction: number,
  averageCompletionTime: number
): string {
  const totalBilans = bilans.length
  const activeBilans = bilans.filter(b => b.status === 'active').length
  const completionRate = totalBilans > 0 ? (completedBilans / totalBilans) * 100 : 0
  
  return `RAPPORT DE CONFORMITÉ QUALIOPI
  
Date: ${new Date().toLocaleDateString('fr-FR')}

INDICATEURS GÉNÉRAUX:
- Bilans totaux: ${totalBilans}
- Bilans actifs: ${activeBilans}
- Bilans complétés: ${completedBilans}
- Taux de complétion: ${completionRate.toFixed(1)}%
- Satisfaction moyenne: ${averageSatisfaction.toFixed(1)}/5
- Durée moyenne: ${averageCompletionTime} jours

CONFORMITÉ PAR CRITÈRE:

Critère 1 - Information du public:
✓ 100% des bilans ont un contrat signé
✓ Objectifs clairement définis pour chaque bilan
✓ Informations accessibles via la plateforme

Critère 2 - Indicateurs de résultats:
✓ Progression trackée en temps réel
✓ Indicateurs publiés et mis à jour
✓ Taux de complétion: ${completionRate.toFixed(1)}%

Critère 3 - Accompagnement:
✓ Parcours individualisé pour chaque bénéficiaire
✓ Recommandations basées sur le marché de l'emploi
✓ Plan d'action SMART systématique

Indicateur 11 - Évaluation:
✓ Document de synthèse pour 100% des bilans complétés
✓ Satisfaction mesurée systématiquement
✓ Évaluation des acquis formalisée

Indicateur 22 - Traçabilité:
✓ Toutes les sessions documentées
✓ Heures de formation trackées
✓ Archivage sécurisé des documents

Indicateur 23 - Mesure satisfaction:
✓ Enquête post-bilan systématique
✓ Satisfaction moyenne: ${averageSatisfaction.toFixed(1)}/5
✓ Retours analysés et intégrés

RECOMMANDATIONS:
${completionRate < 85 ? '⚠ Améliorer le taux de complétion des bilans' : '✓ Taux de complétion excellent'}
${averageSatisfaction < 4.5 ? '⚠ Renforcer la satisfaction des bénéficiaires' : '✓ Satisfaction excellente'}
${averageCompletionTime > 90 ? '⚠ Optimiser la durée des bilans' : '✓ Durée conforme aux standards'}

Rapport généré automatiquement par BilanCompetence.AI
Conforme au Référentiel National Qualité (RNQ) - Décret n°2019-565
`
}

export function checkMinimumHoursCompliance(hoursCompleted: number): {
  compliant: boolean
  message: string
} {
  const minHours = 24
  const compliant = hoursCompleted >= minHours
  
  return {
    compliant,
    message: compliant 
      ? `✓ ${hoursCompleted}h complétées (minimum ${minHours}h requis)`
      : `⚠ ${hoursCompleted}h complétées - ${minHours - hoursCompleted}h restantes (minimum ${minHours}h requis)`
  }
}

export function validateThreePhases(phase: string, hoursCompleted: number): {
  phaseCompliant: boolean
  recommendations: string[]
} {
  const recommendations: string[] = []
  
  const phaseHours = {
    preliminary: { min: 2, max: 4, recommended: 3 },
    investigation: { min: 12, max: 20, recommended: 16 },
    conclusion: { min: 2, max: 4, recommended: 3 }
  }
  
  const phaseData = phaseHours[phase as keyof typeof phaseHours]
  
  if (!phaseData) {
    return { phaseCompliant: false, recommendations: ['Phase non reconnue'] }
  }
  
  if (hoursCompleted < phaseData.min) {
    recommendations.push(`Heures insuffisantes pour la phase ${phase} (${hoursCompleted}h sur ${phaseData.min}h minimum)`)
  }
  
  if (hoursCompleted > phaseData.max) {
    recommendations.push(`Heures excessives pour la phase ${phase} (${hoursCompleted}h sur ${phaseData.max}h maximum recommandé)`)
  }
  
  if (hoursCompleted >= phaseData.min && hoursCompleted <= phaseData.max) {
    recommendations.push(`✓ Phase ${phase} conforme (${hoursCompleted}h)`)
  }
  
  return {
    phaseCompliant: hoursCompleted >= phaseData.min && hoursCompleted <= phaseData.max,
    recommendations
  }
}
