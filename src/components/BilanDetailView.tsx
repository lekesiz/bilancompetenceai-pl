import { useState } from 'react'
import { ArrowLeft, Brain, Lightbulb, BookOpen, Briefcase, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Slider } from './ui/slider'
import { Separator } from './ui/separator'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

interface Bilan {
  id: string
  beneficiaryName: string
  phase: 'preliminary' | 'investigation' | 'conclusion'
  progress: number
  startDate: string
  nextSession?: string
  status: 'active' | 'completed'
}

interface BilanDetailViewProps {
  bilan: Bilan
  onBack: () => void
}

interface Skill {
  name: string
  category: string
  mastery: number
  frequency: 'daily' | 'weekly' | 'monthly' | 'rarely'
  preference: 'love' | 'neutral' | 'dislike'
}

interface AIRecommendation {
  jobTitle: string
  matchScore: number
  sector: string
  skillGaps: string[]
  trainings: string[]
}

export default function BilanDetailView({ bilan, onBack }: BilanDetailViewProps) {
  const [skills] = useState<Skill[]>([
    { name: 'Gestion de projet', category: 'Management', mastery: 85, frequency: 'daily', preference: 'love' },
    { name: 'Communication interpersonnelle', category: 'Soft Skills', mastery: 90, frequency: 'daily', preference: 'love' },
    { name: 'Analyse de données', category: 'Technique', mastery: 70, frequency: 'weekly', preference: 'neutral' },
    { name: 'Budgétisation', category: 'Finance', mastery: 65, frequency: 'monthly', preference: 'neutral' },
    { name: 'Formation d\'équipes', category: 'Management', mastery: 80, frequency: 'weekly', preference: 'love' }
  ])

  const [recommendations] = useState<AIRecommendation[]>([
    {
      jobTitle: 'Chef de Projet Digital',
      matchScore: 92,
      sector: 'Numérique',
      skillGaps: ['Méthodologie Agile', 'Outils de gestion JIRA'],
      trainings: ['Certification Scrum Master', 'Formation JIRA avancé']
    },
    {
      jobTitle: 'Responsable Formation',
      matchScore: 88,
      sector: 'Ressources Humaines',
      skillGaps: ['Ingénierie pédagogique', 'AFEST'],
      trainings: ['Formation ingénierie pédagogique', 'Certification Qualiopi']
    },
    {
      jobTitle: 'Consultant en Organisation',
      matchScore: 85,
      sector: 'Conseil',
      skillGaps: ['Conduite du changement', 'Audit organisationnel'],
      trainings: ['Formation lean management', 'Méthodologie de diagnostic']
    }
  ])

  const [showAIInsights, setShowAIInsights] = useState(false)

  const generateAIInsights = async () => {
    setShowAIInsights(true)
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
              <h1 className="text-xl font-semibold text-foreground">{bilan.beneficiaryName}</h1>
              <p className="text-sm text-muted-foreground">Bilan de compétences - Phase d'investigation</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{bilan.progress}%</div>
                <div className="text-xs text-muted-foreground">Complétion</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Phase 1</CardDescription>
              <CardTitle className="text-base">Préliminaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" weight="fill" />
                <span className="text-sm text-muted-foreground">Terminée</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Phase 2</CardDescription>
              <CardTitle className="text-base">Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={65} className="h-2 mb-2" />
              <span className="text-sm text-muted-foreground">En cours</span>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-muted">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Phase 3</CardDescription>
              <CardTitle className="text-base">Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-muted-foreground">À venir</span>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations IA</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cartographie des compétences</CardTitle>
                <CardDescription>Auto-évaluation du bénéficiaire - {skills.length} compétences identifiées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{skill.name}</div>
                        <div className="text-sm text-muted-foreground">{skill.category}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={skill.preference === 'love' ? 'default' : 'secondary'} className={skill.preference === 'love' ? 'bg-accent text-accent-foreground' : ''}>
                          {skill.preference === 'love' ? '❤️ Apprécie' : skill.preference === 'neutral' ? 'Neutre' : 'N\'apprécie pas'}
                        </Badge>
                        <div className="text-right min-w-16">
                          <div className="text-xl font-bold text-primary">{skill.mastery}%</div>
                          <div className="text-xs text-muted-foreground capitalize">{skill.frequency}</div>
                        </div>
                      </div>
                    </div>
                    <Progress value={skill.mastery} className="h-2" />
                    {index < skills.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            {!showAIInsights ? (
              <Card>
                <CardContent className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                    <Brain size={40} className="text-white" weight="duotone" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Générer les recommandations IA</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      L'intelligence artificielle va analyser les compétences de {bilan.beneficiaryName} et suggérer des métiers adaptés basés sur le marché de l'emploi France Travail
                    </p>
                  </div>
                  <Button onClick={generateAIInsights} className="gap-2" size="lg">
                    <Sparkle size={20} weight="fill" />
                    Lancer l'analyse IA
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <Alert className="bg-accent/10 border-accent">
                  <Sparkle size={20} weight="fill" className="text-accent-foreground" />
                  <AlertTitle>Analyse IA terminée</AlertTitle>
                  <AlertDescription>
                    3 recommandations de métiers ont été générées en analysant le profil et le marché de l'emploi. Taux de confiance: 94%
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-3">
                              <CardTitle className="text-lg">{rec.jobTitle}</CardTitle>
                              <Badge className="bg-accent text-accent-foreground">
                                {rec.matchScore}% Match
                              </Badge>
                            </div>
                            <CardDescription>Secteur: {rec.sector}</CardDescription>
                          </div>
                          <div className="text-center min-w-20">
                            <div className="text-3xl font-bold text-accent mb-1">{rec.matchScore}</div>
                            <Progress value={rec.matchScore} className="h-1.5 w-20" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                              <Lightbulb size={16} className="text-primary" />
                              <span>Compétences à développer</span>
                            </div>
                            <ul className="space-y-1 ml-6">
                              {rec.skillGaps.map((gap, i) => (
                                <li key={i} className="text-sm text-muted-foreground">• {gap}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                              <BookOpen size={16} className="text-accent" />
                              <span>Formations recommandées</span>
                            </div>
                            <ul className="space-y-1 ml-6">
                              {rec.trainings.map((training, i) => (
                                <li key={i} className="text-sm text-muted-foreground">• {training}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase size={16} />
                            <span>245 offres d'emploi disponibles (France Travail)</span>
                          </div>
                          <Button variant="outline" size="sm">Voir les offres</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents du bilan</CardTitle>
                <CardDescription>Contrats, évaluations et synthèses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <CheckCircle size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Contrat d'engagement</div>
                        <div className="text-xs text-muted-foreground">Signé le 15/01/2025</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Voir</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center">
                        <Brain size={20} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Évaluation des compétences</div>
                        <div className="text-xs text-muted-foreground">En cours</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Éditer</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <Briefcase size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Document de synthèse</div>
                        <div className="text-xs text-muted-foreground">Non généré</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" disabled>Générer</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
