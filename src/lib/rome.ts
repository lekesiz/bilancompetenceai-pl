import { ROMEReference } from './types'

export const ROME_CODES: Record<string, ROMEReference> = {
  'M1502': {
    code: 'M1502',
    label: 'Développement des ressources humaines',
    definition: 'Conçoit et met en œuvre la politique de développement des compétences et de formation',
    skills: [
      'Gestion de projet',
      'Formation d\'adultes',
      'Ingénierie pédagogique',
      'Gestion des compétences',
      'Conseil en évolution professionnelle'
    ],
    relatedCodes: ['M1503', 'K2112', 'K2111']
  },
  'M1503': {
    code: 'M1503',
    label: 'Management des ressources humaines',
    definition: 'Pilote et coordonne la politique des ressources humaines',
    skills: [
      'Gestion administrative du personnel',
      'Droit du travail',
      'Relations sociales',
      'Recrutement',
      'Gestion de la paie'
    ],
    relatedCodes: ['M1502', 'M1501', 'K1903']
  },
  'K2112': {
    code: 'K2112',
    label: 'Orientation et développement professionnel',
    definition: 'Accompagne les personnes dans leur orientation professionnelle et projet de formation',
    skills: [
      'Bilan de compétences',
      'Conseil en évolution professionnelle',
      'Connaissance du marché de l\'emploi',
      'Techniques d\'entretien',
      'Psychologie du travail'
    ],
    relatedCodes: ['K2111', 'M1502', 'K1801']
  },
  'K2111': {
    code: 'K2111',
    label: 'Formation professionnelle',
    definition: 'Organise et réalise des actions de formation',
    skills: [
      'Animation de formation',
      'Ingénierie pédagogique',
      'Évaluation des acquis',
      'Conception de supports pédagogiques',
      'Gestion de groupe'
    ],
    relatedCodes: ['K2112', 'K2106', 'M1502']
  },
  'M1401': {
    code: 'M1401',
    label: 'Contrôle de gestion',
    definition: 'Élabore des outils de pilotage et d\'aide à la décision',
    skills: [
      'Analyse financière',
      'Tableaux de bord',
      'Reporting',
      'Contrôle budgétaire',
      'Maîtrise d\'Excel'
    ],
    relatedCodes: ['M1402', 'M1403', 'M1205']
  },
  'M1705': {
    code: 'M1705',
    label: 'Marketing',
    definition: 'Définit et met en œuvre la stratégie marketing',
    skills: [
      'Études de marché',
      'Stratégie marketing',
      'Marketing digital',
      'Analyse de données',
      'Gestion de projet marketing'
    ],
    relatedCodes: ['M1706', 'M1707', 'E1103']
  },
  'M1805': {
    code: 'M1805',
    label: 'Études et développement informatique',
    definition: 'Conçoit et développe des applications informatiques',
    skills: [
      'Programmation',
      'Architecture logicielle',
      'Base de données',
      'Méthodes agiles',
      'Tests et qualité logicielle'
    ],
    relatedCodes: ['M1806', 'M1810', 'I1401']
  },
  'H1206': {
    code: 'H1206',
    label: 'Management et ingénierie études, recherche et développement industriel',
    definition: 'Dirige et coordonne des projets de R&D',
    skills: [
      'Gestion de projet R&D',
      'Innovation',
      'Veille technologique',
      'Management d\'équipe',
      'Analyse technique'
    ],
    relatedCodes: ['H1402', 'H1102', 'M1402']
  },
  'D1406': {
    code: 'D1406',
    label: 'Management en force de vente',
    definition: 'Organise et développe l\'activité commerciale',
    skills: [
      'Management commercial',
      'Techniques de vente',
      'Négociation',
      'Animation d\'équipe',
      'Analyse des performances'
    ],
    relatedCodes: ['D1407', 'D1402', 'M1707']
  },
  'E1103': {
    code: 'E1103',
    label: 'Communication',
    definition: 'Conçoit et met en œuvre la stratégie de communication',
    skills: [
      'Communication digitale',
      'Relations presse',
      'Rédaction',
      'Community management',
      'Événementiel'
    ],
    relatedCodes: ['E1104', 'E1106', 'M1705']
  }
}

export function findROMEBySkills(skills: string[]): ROMEReference[] {
  const matches: Array<{ code: string; score: number }> = []
  
  Object.values(ROME_CODES).forEach((rome) => {
    let score = 0
    skills.forEach((skill) => {
      rome.skills.forEach((romeSkill) => {
        if (romeSkill.toLowerCase().includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(romeSkill.toLowerCase())) {
          score += 1
        }
      })
    })
    
    if (score > 0) {
      matches.push({ code: rome.code, score })
    }
  })
  
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(match => ROME_CODES[match.code])
}

export function getROMEByCode(code: string): ROMEReference | undefined {
  return ROME_CODES[code]
}

export function getAllROMECodes(): ROMEReference[] {
  return Object.values(ROME_CODES)
}
