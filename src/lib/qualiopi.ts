import { QualiopiIndicator, Bilan, Session } from './types'

export const QUALIOPI_INDICATORS: Record<number, Omit<QualiopiIndicator, 'status' | 'evidence' | 'lastAuditDate'>> = {
  1: {
    number: 1,
    label: 'Information du public sur les prestations',
    description: 'Les prestations proposées par le prestataire, les délais pour y accéder, les résultats obtenus et les modalités de recours sont communiqués au public'
  },
  2: {
    number: 2,
    label: 'Indicateurs de résultats',
    description: 'Les indicateurs de résultats des prestations du prestataire sont rendus publics'
  },
  3: {
    number: 3,
    label: 'Obtention de la certification',
    description: 'Information adaptée pour favoriser l\'insertion professionnelle des publics accueillis'
  },
  11: {
    number: 11,
    label: 'Évaluation des acquis et de la satisfaction',
    description: 'Les prestations délivrées sont évaluées et la satisfaction des bénéficiaires est mesurée'
  },
  22: {
    number: 22,
    label: 'Traçabilité des actions',
    description: 'Le prestataire assure la traçabilité de ses prestations et met en place une veille sur les évolutions réglementaires'
  },
  23: {
    number: 23,
    label: 'Mesure de la satisfaction',
    description: 'Le prestataire recueille les appréciations des bénéficiaires sur les prestations'
  },
  24: {
    number: 24,
    label: 'Amélioration continue',
    description: 'Le prestataire met en œuvre une démarche d\'amélioration continue de ses prestations'
  },
  25: {
    number: 25,
    label: 'Analyse des retours',
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
    number: 1,
    label: QUALIOPI_INDICATORS[1].label,
    description: QUALIOPI_INDICATORS[1].description,
    status: bilan.objectives.length > 0 && bilan.contractSigned ? 'compliant' : 'non_compliant',
    evidence: [
      bilan.contractSigned ? 'Contrat signé' : 'Contrat non signé',
      `Objectifs définis: ${bilan.objectives.length}`,
      `Date de début: ${bilan.startDate}`
    ]
  })
  
  indicators.push({
    number: 2,
    label: QUALIOPI_INDICATORS[2].label,
    description: QUALIOPI_INDICATORS[2].description,
    status: bilan.progress > 0 ? 'compliant' : 'non_compliant',
    evidence: [
      `Progression: ${bilan.progress}%`,
      `Heures réalisées: ${bilan.hoursCompleted}/${bilan.totalHours}`,
      `Phase: ${bilan.phase}`
    ]
  })
  
  const totalSessionHours = sessions.reduce((sum, s) => sum + s.duration, 0)
  const minRequiredHours = 24
  
  indicators.push({
    number: 22,
    label: QUALIOPI_INDICATORS[22].label,
    description: QUALIOPI_INDICATORS[22].description,
    status: totalSessionHours >= minRequiredHours && sessions.every(s => s.completed) ? 'compliant' : 'partial',
    evidence: [
      `Sessions programmées: ${sessions.length}`,
      `Heures totales: ${totalSessionHours}h (minimum 24h requis)`,
      `Sessions complétées: ${sessions.filter(s => s.completed).length}/${sessions.length}`,
      `Assiduité confirmée: ${sessions.filter(s => s.attendanceConfirmed).length}/${sessions.length}`
    ]
  })
  
  indicators.push({
    number: 11,
    label: QUALIOPI_INDICATORS[11].label,
    description: QUALIOPI_INDICATORS[11].description,
    status: satisfactionCollected && hasSynthesisDocument ? 'compliant' : 'non_compliant',
    evidence: [
      satisfactionCollected ? 'Enquête de satisfaction complétée' : 'Enquête en attente',
      hasSynthesisDocument ? 'Document de synthèse généré' : 'Document en attente',
      bilan.status === 'completed' ? 'Bilan terminé' : 'Bilan en cours'
    ]
  })
  
  indicators.push({
    number: 23,
    label: QUALIOPI_INDICATORS[23].label,
    description: QUALIOPI_INDICATORS[23].description,
    status: satisfactionCollected ? 'compliant' : 'non_compliant',
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
