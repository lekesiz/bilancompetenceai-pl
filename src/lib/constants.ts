export const APP_CONFIG = {
  name: 'BilanCompetence.AI',
  version: '1.0.0',
  description: 'Plateforme de bilans de compétences propulsée par l\'IA',
  supportEmail: 'support@bilancompetence.ai',
  contact: {
    phone: '+33 1 23 45 67 89',
    email: 'contact@bilancompetence.ai'
  }
} as const

export const BILAN_CONSTRAINTS = {
  minimumHours: 24,
  maximumHours: 40,
  minimumDurationMonths: 2,
  maximumDurationMonths: 6,
  phases: {
    preliminary: {
      label: 'Phase Préliminaire',
      minimumHours: 3,
      description: 'Analyse de la demande et définition du besoin'
    },
    investigation: {
      label: 'Phase d\'Investigation',
      minimumHours: 15,
      description: 'Exploration approfondie des compétences et motivations'
    },
    conclusion: {
      label: 'Phase de Conclusion',
      minimumHours: 3,
      description: 'Synthèse et élaboration du projet professionnel'
    }
  }
} as const

export const QUALIOPI_INDICATORS = {
  1: {
    title: 'Critère 1 - Information du public',
    description: 'Les conditions d\'information du public sur les prestations proposées, les délais pour y accéder et les résultats obtenus',
    evidenceRequired: ['Programme détaillé', 'Conditions générales de vente', 'Résultats statistiques']
  },
  2: {
    title: 'Critère 2 - Identification des objectifs',
    description: 'L\'identification précise des objectifs des prestations proposées et l\'adaptation de ces prestations aux publics bénéficiaires',
    evidenceRequired: ['Objectifs formalisés', 'Positionnement initial', 'Personnalisation']
  },
  3: {
    title: 'Critère 3 - Adaptation des prestations',
    description: 'L\'adaptation aux publics bénéficiaires des prestations et des modalités d\'accueil, d\'accompagnement, de formation et d\'évaluation',
    evidenceRequired: ['Questionnaire d\'entrée', 'Adaptation handicap', 'Modalités pédagogiques']
  },
  11: {
    title: 'Indicateur 11 - Recueil des appréciations',
    description: 'Le recueil des appréciations des parties prenantes',
    evidenceRequired: ['Enquête de satisfaction', 'Taux de réponse >80%', 'Plan d\'amélioration']
  },
  22: {
    title: 'Indicateur 22 - Veille légale et réglementaire',
    description: 'La réalisation d\'une veille légale et réglementaire',
    evidenceRequired: ['Processus de veille', 'Sources documentées', 'Mise à jour des pratiques']
  },
  23: {
    title: 'Indicateur 23 - Veille sur les évolutions',
    description: 'La réalisation d\'une veille sur les évolutions des compétences, des métiers et des emplois',
    evidenceRequired: ['Veille marché emploi', 'Actualisation ROME', 'Partenariats France Travail']
  },
  24: {
    title: 'Indicateur 24 - Mise en œuvre d\'une veille technologique',
    description: 'La mise en œuvre d\'une veille sur les innovations pédagogiques et technologiques',
    evidenceRequired: ['Innovations intégrées', 'Formation continue', 'Outils numériques']
  },
  25: {
    title: 'Indicateur 25 - Définition et ajustement de la prestation',
    description: 'La définition, le suivi et l\'ajustement de la prestation au regard de l\'évolution des apprentissages',
    evidenceRequired: ['Suivi individualisé', 'Ajustements documentés', 'Évaluation continue']
  }
} as const

export const SATISFACTION_CRITERIA = {
  clarity: {
    label: 'Clarté des informations et du déroulement',
    description: 'Les explications étaient claires et le processus bien organisé'
  },
  listening: {
    label: 'Qualité d\'écoute du consultant',
    description: 'Le consultant a su m\'écouter et comprendre mes besoins'
  },
  relevance: {
    label: 'Pertinence des recommandations',
    description: 'Les pistes professionnelles proposées correspondent à mon profil'
  },
  tools: {
    label: 'Qualité des outils et méthodes',
    description: 'Les outils d\'évaluation et la plateforme sont efficaces'
  },
  recommendation: {
    label: 'Recommanderiez-vous ce bilan ?',
    description: 'Je recommanderais ce bilan à mon entourage'
  },
  overall: {
    label: 'Satisfaction globale',
    description: 'Dans l\'ensemble, je suis satisfait de mon bilan de compétences'
  }
} as const

export const PRICING_TIERS = {
  starter: {
    name: 'Starter',
    price: 49,
    period: 'mois',
    description: 'Pour les consultants indépendants qui débutent',
    features: [
      'Jusqu\'à 5 bilans actifs simultanés',
      'Tableaux de bord et statistiques',
      'Messagerie sécurisée',
      'Génération de documents de synthèse',
      'Support par email',
      'Espace de stockage : 2 GB'
    ],
    limits: {
      maxActiveBilans: 5,
      maxConsultants: 1,
      storage: 2
    }
  },
  professional: {
    name: 'Professional',
    price: 149,
    period: 'mois',
    description: 'Pour les organismes et consultants établis',
    features: [
      'Bilans actifs illimités',
      'Analyse IA des compétences',
      'Intégration France Travail',
      'Tableau de bord Qualiopi',
      'Multi-consultants (jusqu\'à 5)',
      'Support prioritaire',
      'Espace de stockage : 20 GB',
      'Visioconférence intégrée (à venir)'
    ],
    limits: {
      maxActiveBilans: Infinity,
      maxConsultants: 5,
      storage: 20
    },
    popular: true
  },
  enterprise: {
    name: 'Enterprise',
    price: null,
    period: 'sur devis',
    description: 'Solution sur-mesure pour grandes structures',
    features: [
      'Toutes les fonctionnalités Professional',
      'Consultants illimités',
      'White-label personnalisé',
      'API et intégrations sur-mesure',
      'Account manager dédié',
      'SLA garantie 99.9%',
      'Formation équipe incluse',
      'Espace de stockage illimité'
    ],
    limits: {
      maxActiveBilans: Infinity,
      maxConsultants: Infinity,
      storage: Infinity
    }
  }
} as const

export const CPF_CONFIG = {
  averageAmount: 1800,
  commissionRate: 0.075,
  processingTimeDays: 45,
  approvalRate: 0.964,
  eligibilityCriteria: [
    'Bilan de compétences d\'au moins 24 heures',
    'Organisme certifié Qualiopi',
    'Personne active (salarié, indépendant, demandeur d\'emploi)',
    'Compte CPF suffisamment approvisionné'
  ]
} as const

export const MARKET_DATA = {
  annualBilansInFrance: 50000,
  averageBilanPrice: 1800,
  totalMarketSize: 90000000,
  targetMarketShare: {
    year1: 0.001,
    year3: 0.05,
    year5: 0.15
  },
  growthRate: 0.08
} as const

export const BUSINESS_OBJECTIVES = {
  year1: {
    clients: 50,
    arr: 300000,
    bilans: 5000,
    satisfaction: 4.5,
    completionRate: 85,
    qualiopiCompliance: 100
  },
  year3: {
    clients: 200,
    arr: 2400000,
    bilans: 25000,
    satisfaction: 4.7,
    completionRate: 90,
    qualiopiCompliance: 100
  },
  year5: {
    clients: 500,
    arr: 9000000,
    bilans: 75000,
    satisfaction: 4.8,
    completionRate: 92,
    qualiopiCompliance: 100
  }
} as const

export const SKILL_CATEGORIES = [
  'Communication',
  'Management',
  'Technique',
  'Créativité',
  'Analyse',
  'Organisation',
  'Commercial',
  'Relationnel',
  'Numérique',
  'Langues'
] as const

export const JOB_SECTORS = [
  'Ressources Humaines',
  'Informatique',
  'Marketing & Communication',
  'Commerce & Vente',
  'Finance & Comptabilité',
  'Production & Logistique',
  'Santé & Social',
  'Éducation & Formation',
  'Juridique',
  'Recherche & Développement'
] as const

export const SESSION_FORMATS = {
  visio: {
    label: 'Visioconférence',
    icon: '💻',
    description: 'Séance en ligne via visioconférence'
  },
  presentiel: {
    label: 'Présentiel',
    icon: '🏢',
    description: 'Séance en face à face dans nos locaux'
  },
  telephone: {
    label: 'Téléphone',
    icon: '📞',
    description: 'Entretien téléphonique'
  }
} as const

export const NOTIFICATION_SETTINGS = {
  emailEnabled: true,
  pushEnabled: false,
  reminderDaysBefore: [7, 3, 1],
  inactivityReminderDays: 7
} as const

export const DATA_RETENTION = {
  activeBilanMonths: 24,
  completedBilanYears: 10,
  auditLogYears: 5,
  anonymizationAfterDays: 90
} as const

export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  },
  message: {
    minLength: 1,
    maxLength: 5000
  },
  feedback: {
    minLength: 10,
    maxLength: 2000
  },
  skill: {
    minSkillsForAnalysis: 5,
    maxSkillsPerCategory: 20
  }
} as const

export const URLS = {
  franceTravail: 'https://www.francetravail.fr',
  romeAPI: 'https://www.francetravail.fr/emploi/rome',
  qualiopi: 'https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/article/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation',
  codeduTravail: 'https://code.travail.gouv.fr',
  monCompteFormation: 'https://www.moncompteformation.gouv.fr'
} as const

export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/,
  romeCode: /^[A-N][0-9]{4}$/,
  siret: /^\d{14}$/,
  postalCode: /^[0-9]{5}$/
} as const
