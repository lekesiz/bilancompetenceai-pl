import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Star, CheckCircle, ArrowRight, Sparkle } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { toast } from 'sonner'

interface SatisfactionSurveyProps {
  bilanId: string
  beneficiaryName: string
  consultantName: string
  onComplete: () => void
}

interface SurveyResponse {
  bilanId: string
  beneficiaryName: string
  consultantName: string
  completedAt: string
  ratings: {
    overallSatisfaction: number
    consultantQuality: number
    platformUsability: number
    objectivesClarified: number
    recommendationRelevance: number
    professionalImpact: number
  }
  qualitative: {
    strengths: string
    improvements: string
    nextSteps: string
    testimonial: string
  }
  wouldRecommend: 'yes' | 'no' | 'maybe'
  consent: {
    testimonialUsage: boolean
    contactForFollowup: boolean
  }
}

export default function SatisfactionSurvey({ 
  bilanId, 
  beneficiaryName, 
  consultantName,
  onComplete 
}: SatisfactionSurveyProps) {
  const [step, setStep] = useState(1)
  const [ratings, setRatings] = useState({
    overallSatisfaction: 0,
    consultantQuality: 0,
    platformUsability: 0,
    objectivesClarified: 0,
    recommendationRelevance: 0,
    professionalImpact: 0
  })
  const [qualitative, setQualitative] = useState({
    strengths: '',
    improvements: '',
    nextSteps: '',
    testimonial: ''
  })
  const [wouldRecommend, setWouldRecommend] = useState<'yes' | 'no' | 'maybe'>('yes')
  const [consent, setConsent] = useState({
    testimonialUsage: false,
    contactForFollowup: true
  })
  
  const [, setSurveyResponses] = useKV<SurveyResponse[]>('satisfaction-surveys', [])

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const ratingQuestions = [
    { key: 'overallSatisfaction', label: 'Satisfaction globale du bilan de compétences' },
    { key: 'consultantQuality', label: `Qualité de l'accompagnement par ${consultantName}` },
    { key: 'platformUsability', label: 'Facilité d\'utilisation de la plateforme BilanCompetence.AI' },
    { key: 'objectivesClarified', label: 'Clarté apportée sur votre projet professionnel' },
    { key: 'recommendationRelevance', label: 'Pertinence des recommandations de carrière et formations' },
    { key: 'professionalImpact', label: 'Impact attendu sur votre évolution professionnelle' }
  ]

  const handleRatingChange = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    const response: SurveyResponse = {
      bilanId,
      beneficiaryName,
      consultantName,
      completedAt: new Date().toISOString(),
      ratings,
      qualitative,
      wouldRecommend,
      consent
    }

    setSurveyResponses((current) => [...(current || []), response])
    
    toast.success('Merci pour votre retour !', {
      description: 'Votre enquête de satisfaction a été enregistrée avec succès.'
    })
    
    onComplete()
  }

  const canProceedStep1 = Object.values(ratings).every(r => r > 0)
  const canProceedStep2 = qualitative.strengths.length > 0 && qualitative.nextSteps.length > 0

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Enquête de Satisfaction
        </h2>
        <p className="text-muted-foreground">
          Votre avis est essentiel pour améliorer nos services et maintenir notre certification Qualiopi
        </p>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Évaluation Quantitative</CardTitle>
            <CardDescription>
              Évaluez les différents aspects de votre bilan de compétences (1 = Très insatisfait, 5 = Très satisfait)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {ratingQuestions.map((question) => (
              <div key={question.key} className="space-y-3">
                <Label className="text-base font-medium">{question.label}</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleRatingChange(question.key, value)}
                      className="group relative"
                    >
                      <Star
                        size={32}
                        weight={ratings[question.key as keyof typeof ratings] >= value ? 'fill' : 'regular'}
                        className={`transition-colors ${
                          ratings[question.key as keyof typeof ratings] >= value
                            ? 'text-accent'
                            : 'text-muted-foreground group-hover:text-accent/50'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-medium text-foreground">
                    {ratings[question.key as keyof typeof ratings] > 0
                      ? `${ratings[question.key as keyof typeof ratings]}/5`
                      : 'Non évalué'}
                  </span>
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="gap-2"
              >
                Continuer
                <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Retour Qualitatif</CardTitle>
            <CardDescription>
              Partagez votre expérience en détail pour nous aider à progresser
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="strengths">
                Quels sont les points forts de ce bilan de compétences ? *
              </Label>
              <Textarea
                id="strengths"
                value={qualitative.strengths}
                onChange={(e) => setQualitative(prev => ({ ...prev, strengths: e.target.value }))}
                placeholder="Ex: L'écoute du consultant, la qualité des recommandations IA, la clarté du processus..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvements">
                Quels aspects pourraient être améliorés ?
              </Label>
              <Textarea
                id="improvements"
                value={qualitative.improvements}
                onChange={(e) => setQualitative(prev => ({ ...prev, improvements: e.target.value }))}
                placeholder="Ex: Plus d'exemples concrets, interface plus intuitive, délais raccourcis..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="next-steps">
                Quelles sont vos prochaines étapes professionnelles suite à ce bilan ? *
              </Label>
              <Textarea
                id="next-steps"
                value={qualitative.nextSteps}
                onChange={(e) => setQualitative(prev => ({ ...prev, nextSteps: e.target.value }))}
                placeholder="Ex: Formation en marketing digital, recherche d'emploi dans le secteur X, création d'entreprise..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial">
                Témoignage (optionnel)
              </Label>
              <Textarea
                id="testimonial"
                value={qualitative.testimonial}
                onChange={(e) => setQualitative(prev => ({ ...prev, testimonial: e.target.value }))}
                placeholder="Partagez votre expérience en quelques phrases..."
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Ce témoignage pourra être utilisé de manière anonyme pour promouvoir nos services (avec votre accord à l'étape suivante)
              </p>
            </div>

            <Separator />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="gap-2"
              >
                Continuer
                <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommandation & Consentements</CardTitle>
            <CardDescription>
              Dernières questions pour finaliser l'enquête
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Recommanderiez-vous BilanCompetence.AI à un proche ?
              </Label>
              <RadioGroup value={wouldRecommend} onValueChange={(v) => setWouldRecommend(v as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="recommend-yes" />
                  <Label htmlFor="recommend-yes" className="cursor-pointer font-normal">
                    Oui, sans hésitation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="recommend-maybe" />
                  <Label htmlFor="recommend-maybe" className="cursor-pointer font-normal">
                    Peut-être, selon les besoins
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="recommend-no" />
                  <Label htmlFor="recommend-no" className="cursor-pointer font-normal">
                    Non
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base font-medium">Consentements RGPD</Label>
              
              <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="consent-testimonial"
                  checked={consent.testimonialUsage}
                  onChange={(e) => setConsent(prev => ({ ...prev, testimonialUsage: e.target.checked }))}
                  className="mt-1"
                />
                <Label htmlFor="consent-testimonial" className="cursor-pointer text-sm font-normal leading-relaxed">
                  J'autorise l'utilisation anonyme de mon témoignage à des fins de communication par BilanCompetence.AI
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="consent-followup"
                  checked={consent.contactForFollowup}
                  onChange={(e) => setConsent(prev => ({ ...prev, contactForFollowup: e.target.checked }))}
                  className="mt-1"
                />
                <Label htmlFor="consent-followup" className="cursor-pointer text-sm font-normal leading-relaxed">
                  J'accepte d'être recontacté dans 6 mois pour un suivi de mon évolution professionnelle
                </Label>
              </div>
            </div>

            <Alert>
              <Sparkle className="h-4 w-4" />
              <AlertTitle>Conformité Qualiopi</AlertTitle>
              <AlertDescription>
                Cette enquête est conforme aux exigences Qualiopi (Indicateur 11 & 23). Vos réponses sont confidentielles et contribuent à l'amélioration continue de nos services.
              </AlertDescription>
            </Alert>

            <Separator />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Retour
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <CheckCircle size={18} />
                Envoyer l'enquête
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
