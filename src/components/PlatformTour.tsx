import { useState } from 'react'
import { Brain, X, ArrowRight, ArrowLeft, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

interface PlatformTourProps {
  onClose: () => void
  userRole: 'consultant' | 'beneficiary' | 'admin'
}

interface TourStep {
  title: string
  description: string
  feature: string
  image?: string
  highlights: string[]
}

const CONSULTANT_TOUR: TourStep[] = [
  {
    title: 'Bienvenue sur votre tableau de bord',
    description: 'Gérez tous vos bilans de compétences depuis une interface centralisée et intuitive.',
    feature: 'Vue d\'ensemble',
    highlights: [
      'Visualisez tous vos bilans actifs en un coup d\'œil',
      'Suivez la progression de chaque bénéficiaire',
      'Accédez rapidement aux prochaines sessions'
    ]
  },
  {
    title: 'Analyse IA des compétences',
    description: 'L\'intelligence artificielle vous assiste dans l\'identification des compétences transférables et la génération de recommandations.',
    feature: 'Assistant IA',
    highlights: [
      'Extraction automatique des compétences depuis les expériences',
      'Identification des soft skills cachées',
      'Matching avec le référentiel ROME de France Travail'
    ]
  },
  {
    title: 'Recommandations personnalisées',
    description: 'Proposez des pistes professionnelles basées sur des données réelles du marché de l\'emploi.',
    feature: 'France Travail',
    highlights: [
      'Accès à 500 000+ offres d\'emploi réelles',
      'Suggestions de métiers selon le profil',
      'Recommandations de formations adaptées'
    ]
  },
  {
    title: 'Génération automatique de synthèse',
    description: 'Créez des documents de synthèse professionnels en quelques clics, conformes Qualiopi.',
    feature: 'Synthèse',
    highlights: [
      'Templates conformes aux exigences légales',
      'Rédaction assistée par IA',
      'Export PDF professionnel en 1 clic'
    ]
  },
  {
    title: 'Conformité Qualiopi automatique',
    description: 'Tous les indicateurs de qualité sont collectés automatiquement pour faciliter vos audits.',
    feature: 'Qualiopi',
    highlights: [
      'Traçabilité complète des actions',
      'Indicateurs 1, 2, 3, 11, 22, 23, 24, 25 suivis',
      'Rapports d\'audit générés automatiquement'
    ]
  }
]

const BENEFICIARY_TOUR: TourStep[] = [
  {
    title: 'Bienvenue dans votre espace personnel',
    description: 'Suivez l\'avancement de votre bilan de compétences et accédez à tous vos documents.',
    feature: 'Tableau de bord',
    highlights: [
      'Visualisez votre progression en temps réel',
      'Consultez vos prochains rendez-vous',
      'Communiquez facilement avec votre consultant'
    ]
  },
  {
    title: 'Auto-évaluation guidée',
    description: 'Évaluez vos compétences de manière structurée avec notre interface intuitive.',
    feature: 'Évaluation',
    highlights: [
      'Évaluation par niveau de maîtrise',
      'Indication de vos préférences',
      'Sauvegarde automatique à chaque étape'
    ]
  },
  {
    title: 'Découvrez vos opportunités',
    description: 'L\'IA analyse vos compétences et vous propose des pistes professionnelles adaptées.',
    feature: 'Recommandations',
    highlights: [
      'Métiers correspondant à votre profil',
      'Score de compatibilité personnalisé',
      'Parcours de transition détaillé'
    ]
  },
  {
    title: 'Offres d\'emploi en temps réel',
    description: 'Accédez aux opportunités du marché grâce à l\'intégration France Travail.',
    feature: 'Emploi',
    highlights: [
      'Offres filtrées selon vos compétences',
      'Recherche par région',
      'Détails sur les salaires et contrats'
    ]
  },
  {
    title: 'Vos données, vos droits',
    description: 'Exercez vos droits RGPD en toute transparence : consultation, export, suppression.',
    feature: 'RGPD',
    highlights: [
      'Export complet de vos données',
      'Transparence sur l\'utilisation',
      'Droit à l\'oubli respecté'
    ]
  }
]

const ADMIN_TOUR: TourStep[] = [
  {
    title: 'Pilotez votre organisme',
    description: 'Vue d\'ensemble de tous les bilans et consultants de votre organisation.',
    feature: 'Vue globale',
    highlights: [
      'Statistiques en temps réel',
      'Performance de chaque consultant',
      'Suivi de la conformité Qualiopi'
    ]
  },
  {
    title: 'Business Analytics',
    description: 'Suivez vos KPIs stratégiques et comparez-vous aux objectifs du Cahier des Charges.',
    feature: 'Analytics',
    highlights: [
      'ARR et MRR en temps réel',
      'Projections financières Années 1-3-5',
      'Taux de satisfaction et NPS',
      'Taux de rétention clients'
    ]
  },
  {
    title: 'Gestion CPF',
    description: 'Suivez vos dossiers CPF et calculez vos commissions automatiquement.',
    feature: 'CPF',
    highlights: [
      'Tracking des dossiers (pending/approved/paid)',
      'Calcul automatique des commissions (5-10%)',
      'Taux d\'approbation en temps réel'
    ]
  },
  {
    title: 'Conformité Qualiopi simplifiée',
    description: 'Préparez vos audits en toute sérénité avec notre tableau de bord dédié.',
    feature: 'Qualiopi',
    highlights: [
      '6 indicateurs clés suivis automatiquement',
      'Documentation centralisée',
      'Checklist de préparation d\'audit'
    ]
  },
  {
    title: 'Gestion des consultants',
    description: 'Invitez, formez et suivez la performance de vos consultants.',
    feature: 'Équipe',
    highlights: [
      'Invitation en 1 clic',
      'Suivi de la charge de travail',
      'Indicateurs de satisfaction individuels'
    ]
  }
]

export default function PlatformTour({ onClose, userRole }: PlatformTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const tourSteps = userRole === 'consultant' 
    ? CONSULTANT_TOUR 
    : userRole === 'beneficiary' 
    ? BENEFICIARY_TOUR 
    : ADMIN_TOUR

  const progress = ((currentStep + 1) / tourSteps.length) * 100

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = tourSteps[currentStep]

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-2xl border-2">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X size={20} />
          </Button>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Brain size={24} weight="duotone" className="text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Découverte de BilanCompetence.AI</CardTitle>
              <CardDescription>
                {userRole === 'consultant' ? 'Guide pour consultants' : 
                 userRole === 'beneficiary' ? 'Guide pour bénéficiaires' : 
                 'Guide pour administrateurs'}
              </CardDescription>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Étape {currentStep + 1} sur {tourSteps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkle size={14} weight="fill" />
                {step.feature}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CheckCircle size={18} className="text-primary" weight="fill" />
                Points clés :
              </div>
              <ul className="space-y-2">
                {step.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft size={16} />
              Précédent
            </Button>

            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 
                    index < currentStep ? 'bg-primary/50' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="gap-2"
            >
              {currentStep === tourSteps.length - 1 ? (
                <>
                  <CheckCircle size={16} weight="fill" />
                  Terminer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
