import { useState } from 'react'
import { Brain, SignOut, Calendar, CheckCircle, Lightbulb, ChartBar, ArrowRight, BookOpen, User } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Separator } from './ui/separator'
import SkillsAssessment from './SkillsAssessment'

interface BeneficiaryDashboardProps {
  onLogout: () => void
}

export default function BeneficiaryDashboard({ onLogout }: BeneficiaryDashboardProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment'>('dashboard')
  const [completedPhases, setCompletedPhases] = useState<number>(1)
  const [progressPercentage] = useState(65)

  if (currentView === 'assessment') {
    return <SkillsAssessment onBack={() => setCurrentView('dashboard')} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Brain size={24} weight="duotone" className="text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">BilanCompetence.AI</h1>
                <p className="text-sm text-muted-foreground">Mon Bilan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-foreground">Sophie Martin</div>
                <div className="text-xs text-muted-foreground">Bénéficiaire</div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <SignOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-xl p-8 border">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Votre parcours</h2>
              <p className="text-muted-foreground">Bilan de compétences démarré le 15 janvier 2025</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">{progressPercentage}%</div>
              <div className="text-sm text-muted-foreground">Complété</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-4" />
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card rounded-lg p-4 border-l-4 border-l-green-500">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={20} className="text-green-600" weight="fill" />
                <span className="font-medium text-sm">Phase Préliminaire</span>
              </div>
              <p className="text-xs text-muted-foreground">Objectifs définis</p>
            </div>
            <div className="bg-card rounded-lg p-4 border-l-4 border-l-primary shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className="font-medium text-sm">Phase d'Investigation</span>
              </div>
              <p className="text-xs text-muted-foreground">En cours - 65% complété</p>
            </div>
            <div className="bg-card rounded-lg p-4 border-l-4 border-l-muted opacity-60">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs font-bold">3</span>
                </div>
                <span className="font-medium text-sm">Phase de Conclusion</span>
              </div>
              <p className="text-xs text-muted-foreground">À venir</p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Prochaine séance</CardTitle>
                  <CardDescription>Avec votre consultante Claire Rousseau</CardDescription>
                </div>
                <Calendar size={24} className="text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Mercredi 5 février 2025</span>
                  <Badge variant="outline">Visio</Badge>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">14h00 - 16h00</div>
                <p className="text-sm text-muted-foreground">Exploration des métiers et validation des pistes</p>
              </div>
              <Button className="w-full gap-2">
                <Calendar size={18} />
                Ajouter à mon calendrier
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Tâches en attente</CardTitle>
                  <CardDescription>À compléter avant la prochaine séance</CardDescription>
                </div>
                <CheckCircle size={24} className="text-accent" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-5 h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">Compléter l'auto-évaluation des compétences</div>
                  <div className="text-xs text-muted-foreground">12 compétences restantes</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-5 h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">Explorer 3 métiers suggérés</div>
                  <div className="text-xs text-muted-foreground">Fiches métiers disponibles</div>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2" onClick={() => setCurrentView('assessment')}>
                Voir toutes les tâches
                <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Insights IA</TabsTrigger>
              <TabsTrigger value="skills">Mes Compétences</TabsTrigger>
              <TabsTrigger value="resources">Ressources</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <Alert className="bg-accent/10 border-accent">
                <Lightbulb size={20} className="text-accent-foreground" weight="fill" />
                <AlertTitle>Nouvelles recommandations disponibles</AlertTitle>
                <AlertDescription>
                  L'IA a analysé votre profil et identifié 3 métiers qui correspondent à vos compétences et aspirations
                </AlertDescription>
              </Alert>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">Chef de Projet Digital</CardTitle>
                      <CardDescription>Secteur: Numérique</CardDescription>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">92%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={92} className="h-2" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Vos atouts</div>
                      <ul className="space-y-1">
                        <li className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-600" weight="fill" />
                          Gestion de projet
                        </li>
                        <li className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-600" weight="fill" />
                          Communication
                        </li>
                        <li className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-600" weight="fill" />
                          Formation d'équipes
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">À développer</div>
                      <ul className="space-y-1">
                        <li className="text-sm text-muted-foreground flex items-center gap-2">
                          <BookOpen size={14} className="text-primary" />
                          Méthodologie Agile
                        </li>
                        <li className="text-sm text-muted-foreground flex items-center gap-2">
                          <BookOpen size={14} className="text-primary" />
                          Outils JIRA
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">245 offres disponibles</span>
                    <Button variant="outline" size="sm">Voir les détails</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow opacity-80">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">Responsable Formation</CardTitle>
                      <CardDescription>Secteur: Ressources Humaines</CardDescription>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">88%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={88} className="h-2 mb-3" />
                  <Button variant="ghost" size="sm" className="w-full">Explorer ce métier</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vos compétences évaluées</CardTitle>
                  <CardDescription>18 compétences identifiées sur 30</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Gestion de projet</div>
                        <div className="text-sm text-muted-foreground">Management</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">85%</div>
                        <Progress value={85} className="h-1.5 w-24 mt-1" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Communication interpersonnelle</div>
                        <div className="text-sm text-muted-foreground">Soft Skills</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">90%</div>
                        <Progress value={90} className="h-1.5 w-24 mt-1" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Analyse de données</div>
                        <div className="text-sm text-muted-foreground">Technique</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">70%</div>
                        <Progress value={70} className="h-1.5 w-24 mt-1" />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6 gap-2" onClick={() => setCurrentView('assessment')}>
                    <ChartBar size={18} />
                    Compléter mon évaluation
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources recommandées</CardTitle>
                  <CardDescription>Sélectionnées par votre consultante</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Fiche métier: Chef de Projet Digital</div>
                      <div className="text-xs text-muted-foreground">France Travail - ROME M1805</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb size={20} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Guide: Réussir sa reconversion professionnelle</div>
                      <div className="text-xs text-muted-foreground">PDF - 24 pages</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Témoignage: Reconversion en gestion de projet</div>
                      <div className="text-xs text-muted-foreground">Vidéo - 8 min</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
