import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { 
  Brain, 
  CheckCircle, 
  ArrowRight, 
  X,
  UserCircle,
  ClipboardText,
  Calendar,
  ChartBar,
  Sparkle,
  ShieldCheck
} from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

interface OnboardingTutorialProps {
  role: 'consultant' | 'beneficiary' | 'admin'
  onComplete: () => void
}

interface TutorialStep {
  title: string
  description: string
  icon: React.ReactNode
  details: string[]
  cta: string
}

export default function OnboardingTutorial({ role, onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTutorial, setHasSeenTutorial] = useKV<boolean>(`tutorial-seen-${role}`, false)

  const consultantSteps: TutorialStep[] = [
    {
      title: 'Bienvenue sur BilanCompetence.AI',
      description: 'Votre assistant intelligent pour réaliser des bilans de compétences professionnels et conformes Qualiopi',
      icon: <Brain size={48} weight="duotone" className="text-primary" />,
      details: [
        'Gagnez 40% de temps sur les tâches administratives',
        'Recommandations IA basées sur le marché de l\'emploi réel',
        'Conformité Qualiopi automatique avec traçabilité complète',
        'Documents de synthèse générés automatiquement'
      ],
      cta: 'Commencer la visite'
    },
    {
      title: 'Tableau de bord consultant',
      description: 'Gérez tous vos bilans en cours depuis une interface unique',
      icon: <ClipboardText size={48} weight="duotone" className="text-accent" />,
      details: [
        'Vue d\'ensemble de tous vos bilans actifs',
        'Suivi de progression en temps réel',
        'Notifications pour les prochaines séances',
        'Accès rapide aux détails de chaque bénéficiaire'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Création d\'un bilan',
      description: 'Lancez un nouveau bilan en quelques clics',
      icon: <UserCircle size={48} weight="duotone" className="text-primary" />,
      details: [
        'Renseignez les informations du bénéficiaire',
        'Le système crée automatiquement les 3 phases réglementaires',
        'Planifiez votre premier entretien',
        'Envoyez les invitations par email'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Évaluation des compétences',
      description: 'Accompagnez le bénéficiaire dans l\'auto-évaluation guidée',
      icon: <ChartBar size={48} weight="duotone" className="text-accent" />,
      details: [
        'Le bénéficiaire évalue ses compétences en autonomie',
        'Vous validez et ajustez les évaluations',
        'L\'IA identifie les compétences transférables',
        'Visualisation graphique des résultats'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Recommandations IA',
      description: 'Exploitez la puissance de l\'intelligence artificielle',
      icon: <Sparkle size={48} weight="fill" className="text-primary" />,
      details: [
        'Suggestions de métiers basées sur les compétences',
        'Matching avec offres France Travail en temps réel',
        'Identification des formations pertinentes',
        'Plans d\'action personnalisés générés automatiquement'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Document de synthèse',
      description: 'Générez le livrable final en un clic',
      icon: <ClipboardText size={48} weight="duotone" className="text-accent" />,
      details: [
        'Document professionnel conforme aux exigences légales',
        'Contenu pré-rempli par l\'IA, éditable par vous',
        'Export PDF de qualité',
        'Signature électronique intégrée'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Conformité Qualiopi automatique',
      description: 'Tous les indicateurs sont trackés pour vous',
      icon: <ShieldCheck size={48} weight="duotone" className="text-primary" />,
      details: [
        'Traçabilité complète de toutes les actions',
        'Enquêtes de satisfaction automatiques',
        'Rapports d\'audit prêts à exporter',
        'Indicateurs 1, 2, 11, 22, 23 validés automatiquement'
      ],
      cta: 'Terminer'
    }
  ]

  const beneficiarySteps: TutorialStep[] = [
    {
      title: 'Bienvenue dans votre bilan de compétences',
      description: 'Un accompagnement personnalisé pour clarifier votre projet professionnel',
      icon: <Brain size={48} weight="duotone" className="text-primary" />,
      details: [
        'Processus guidé étape par étape',
        'Accompagnement par un consultant certifié',
        'Recommandations basées sur le marché de l\'emploi',
        'Accessible 24/7 depuis n\'importe quel appareil'
      ],
      cta: 'Commencer la visite'
    },
    {
      title: 'Votre tableau de bord',
      description: 'Suivez votre progression en temps réel',
      icon: <ChartBar size={48} weight="duotone" className="text-accent" />,
      details: [
        'Visualisez les 3 phases de votre bilan',
        'Consultez vos prochains rendez-vous',
        'Accédez aux ressources et recommandations',
        'Communiquez avec votre consultant'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Évaluation de compétences',
      description: 'Identifiez et valorisez vos talents',
      icon: <CheckCircle size={48} weight="duotone" className="text-primary" />,
      details: [
        'Questionnaire interactif et intuitif',
        'Évaluez votre niveau de maîtrise',
        'Indiquez vos préférences et appétences',
        'L\'IA analyse vos compétences transférables'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Découvrez vos opportunités',
      description: 'Recommandations personnalisées basées sur l\'IA',
      icon: <Sparkle size={48} weight="fill" className="text-accent" />,
      details: [
        'Métiers correspondant à votre profil',
        'Offres d\'emploi actuelles dans votre région',
        'Formations pour développer vos compétences',
        'Plan d\'action concret et réaliste'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Communication avec votre consultant',
      description: 'Restez en contact tout au long du processus',
      icon: <UserCircle size={48} weight="duotone" className="text-primary" />,
      details: [
        'Messagerie sécurisée intégrée',
        'Planification des séances',
        'Partage de documents',
        'Notifications par email'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Vos données personnelles',
      description: 'Conformité RGPD totale',
      icon: <ShieldCheck size={48} weight="duotone" className="text-accent" />,
      details: [
        'Vos données sont chiffrées et sécurisées',
        'Export de toutes vos données en un clic',
        'Droit à l\'effacement garanti',
        'Confidentialité absolue de vos résultats'
      ],
      cta: 'Terminer'
    }
  ]

  const adminSteps: TutorialStep[] = [
    {
      title: 'Bienvenue administrateur',
      description: 'Pilotez votre organisme de formation avec efficacité',
      icon: <Brain size={48} weight="duotone" className="text-primary" />,
      details: [
        'Vue d\'ensemble de tous les bilans',
        'Gestion de vos consultants',
        'Tableaux de bord analytiques',
        'Conformité Qualiopi automatisée'
      ],
      cta: 'Commencer la visite'
    },
    {
      title: 'Tableau de bord organisé',
      description: 'Toutes les métriques importantes en un coup d\'œil',
      icon: <ChartBar size={48} weight="duotone" className="text-accent" />,
      details: [
        'Bilans actifs vs complétés',
        'Taux de satisfaction moyen',
        'Performance par consultant',
        'Indicateurs financiers'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Gestion des consultants',
      description: 'Invitez et gérez votre équipe',
      icon: <UserCircle size={48} weight="duotone" className="text-primary" />,
      details: [
        'Invitations par email',
        'Suivi de l\'activité par consultant',
        'Certification et spécialités',
        'Statistiques de performance'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Conformité Qualiopi',
      description: 'Préparez vos audits en quelques clics',
      icon: <ShieldCheck size={48} weight="duotone" className="text-accent" />,
      details: [
        'Taux de conformité en temps réel',
        'Détail des 6 indicateurs clés',
        'Rapport d\'audit téléchargeable',
        'Checklist de préparation d\'audit'
      ],
      cta: 'Continuer'
    },
    {
      title: 'Rapports et exports',
      description: 'Données exportables pour vos analyses',
      icon: <ClipboardText size={48} weight="duotone" className="text-primary" />,
      details: [
        'Exports CSV et PDF',
        'Rapports mensuels automatiques',
        'Statistiques personnalisées',
        'Historique complet'
      ],
      cta: 'Terminer'
    }
  ]

  const steps = role === 'consultant' ? consultantSteps : 
                role === 'beneficiary' ? beneficiarySteps : 
                adminSteps

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    setHasSeenTutorial(true)
    onComplete()
  }

  const handleComplete = () => {
    setHasSeenTutorial(true)
    onComplete()
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleSkip}
          >
            <X size={20} />
          </Button>
          
          <div className="flex items-center justify-center mb-4">
            {currentStepData.icon}
          </div>
          
          <CardTitle className="text-2xl text-center">{currentStepData.title}</CardTitle>
          <CardDescription className="text-center text-base mt-2">
            {currentStepData.description}
          </CardDescription>
          
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Étape {currentStep + 1} sur {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            {currentStepData.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
                <p className="text-sm text-foreground">{detail}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Précédent
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className="flex-1 gap-2"
            >
              {currentStepData.cta}
              {currentStep < steps.length - 1 && <ArrowRight size={18} />}
            </Button>
          </div>

          <button
            onClick={handleSkip}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Passer le tutoriel
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
