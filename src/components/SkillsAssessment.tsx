import { useState } from 'react'
import { ArrowLeft, CheckCircle, Heart, ThumbsUp, ThumbsDown } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { toast } from 'sonner'

interface SkillsAssessmentProps {
  onBack: () => void
}

interface SkillToEvaluate {
  id: string
  name: string
  category: string
  description: string
}

export default function SkillsAssessment({ onBack }: SkillsAssessmentProps) {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [masteryLevel, setMasteryLevel] = useState([75])
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'rarely'>('weekly')
  const [preference, setPreference] = useState<'love' | 'neutral' | 'dislike'>('neutral')

  const skills: SkillToEvaluate[] = [
    {
      id: '1',
      name: 'Gestion de projet',
      category: 'Management',
      description: 'Planification, coordination et suivi de projets de A à Z'
    },
    {
      id: '2',
      name: 'Communication interpersonnelle',
      category: 'Soft Skills',
      description: 'Capacité à communiquer efficacement avec différents interlocuteurs'
    },
    {
      id: '3',
      name: 'Analyse de données',
      category: 'Technique',
      description: 'Exploitation et interprétation de données pour la prise de décision'
    },
    {
      id: '4',
      name: 'Formation d\'équipes',
      category: 'Management',
      description: 'Transmission de connaissances et accompagnement des collaborateurs'
    },
    {
      id: '5',
      name: 'Budgétisation',
      category: 'Finance',
      description: 'Élaboration et suivi de budgets prévisionnels'
    }
  ]

  const currentSkill = skills[currentSkillIndex]
  const progressPercentage = ((currentSkillIndex + 1) / skills.length) * 100

  const handleNext = () => {
    toast.success(`Compétence "${currentSkill.name}" évaluée`)
    
    if (currentSkillIndex < skills.length - 1) {
      setCurrentSkillIndex(currentSkillIndex + 1)
      setMasteryLevel([75])
      setFrequency('weekly')
      setPreference('neutral')
    } else {
      toast.success('Évaluation terminée !', {
        description: 'Toutes vos compétences ont été évaluées'
      })
      setTimeout(() => onBack(), 1500)
    }
  }

  const getMasteryLabel = (value: number) => {
    if (value < 25) return 'Débutant'
    if (value < 50) return 'Intermédiaire'
    if (value < 75) return 'Avancé'
    return 'Expert'
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">Évaluation des compétences</h1>
              <p className="text-sm text-muted-foreground">
                Compétence {currentSkillIndex + 1} sur {skills.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-muted-foreground">Progression</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="space-y-3">
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Démarré</span>
            <span>{currentSkillIndex + 1} / {skills.length}</span>
            <span>Terminé</span>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                {currentSkill.category}
              </Badge>
              <span className="text-xs text-muted-foreground">Question {currentSkillIndex + 1}/{skills.length}</span>
            </div>
            <CardTitle className="text-2xl">{currentSkill.name}</CardTitle>
            <CardDescription className="text-base">{currentSkill.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 pb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Niveau de maîtrise
                </label>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{masteryLevel[0]}%</div>
                  <div className="text-xs text-muted-foreground">{getMasteryLabel(masteryLevel[0])}</div>
                </div>
              </div>
              <Slider
                value={masteryLevel}
                onValueChange={setMasteryLevel}
                min={0}
                max={100}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Débutant</span>
                <span>Intermédiaire</span>
                <span>Avancé</span>
                <span>Expert</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground block">
                Fréquence d'utilisation
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant={frequency === 'daily' ? 'default' : 'outline'}
                  onClick={() => setFrequency('daily')}
                  className="h-auto py-4 flex-col gap-1"
                >
                  <span className="font-semibold">Quotidien</span>
                  <span className="text-xs opacity-80">Tous les jours</span>
                </Button>
                <Button
                  variant={frequency === 'weekly' ? 'default' : 'outline'}
                  onClick={() => setFrequency('weekly')}
                  className="h-auto py-4 flex-col gap-1"
                >
                  <span className="font-semibold">Hebdo</span>
                  <span className="text-xs opacity-80">Chaque semaine</span>
                </Button>
                <Button
                  variant={frequency === 'monthly' ? 'default' : 'outline'}
                  onClick={() => setFrequency('monthly')}
                  className="h-auto py-4 flex-col gap-1"
                >
                  <span className="font-semibold">Mensuel</span>
                  <span className="text-xs opacity-80">Chaque mois</span>
                </Button>
                <Button
                  variant={frequency === 'rarely' ? 'default' : 'outline'}
                  onClick={() => setFrequency('rarely')}
                  className="h-auto py-4 flex-col gap-1"
                >
                  <span className="font-semibold">Rarement</span>
                  <span className="text-xs opacity-80">Occasionnel</span>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground block">
                Votre appétence pour cette compétence
              </label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={preference === 'love' ? 'default' : 'outline'}
                  onClick={() => setPreference('love')}
                  className={`h-auto py-6 flex-col gap-2 ${preference === 'love' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                >
                  <Heart size={24} weight={preference === 'love' ? 'fill' : 'regular'} />
                  <span className="font-semibold">J'adore</span>
                  <span className="text-xs opacity-80">Très motivant</span>
                </Button>
                <Button
                  variant={preference === 'neutral' ? 'default' : 'outline'}
                  onClick={() => setPreference('neutral')}
                  className="h-auto py-6 flex-col gap-2"
                >
                  <ThumbsUp size={24} weight={preference === 'neutral' ? 'fill' : 'regular'} />
                  <span className="font-semibold">Neutre</span>
                  <span className="text-xs opacity-80">Acceptable</span>
                </Button>
                <Button
                  variant={preference === 'dislike' ? 'default' : 'outline'}
                  onClick={() => setPreference('dislike')}
                  className={`h-auto py-6 flex-col gap-2 ${preference === 'dislike' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
                >
                  <ThumbsDown size={24} weight={preference === 'dislike' ? 'fill' : 'regular'} />
                  <span className="font-semibold">Pas fan</span>
                  <span className="text-xs opacity-80">Peu motivant</span>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentSkillIndex > 0) {
                    setCurrentSkillIndex(currentSkillIndex - 1)
                  }
                }}
                disabled={currentSkillIndex === 0}
              >
                Précédent
              </Button>
              <Button
                onClick={handleNext}
                size="lg"
                className="gap-2 min-w-40"
              >
                {currentSkillIndex === skills.length - 1 ? (
                  <>
                    <CheckCircle size={20} weight="fill" />
                    Terminer
                  </>
                ) : (
                  'Suivant'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-dashed">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground text-center">
              💡 <span className="font-medium">Conseil:</span> Soyez honnête dans votre évaluation. Il n'y a pas de bonnes ou mauvaises réponses.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
