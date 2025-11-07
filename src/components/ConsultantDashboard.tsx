import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Brain, SignOut, Plus, ClipboardText, ChartBar, Calendar, CheckCircle, Clock, User, Question } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import BilanDetailView from './BilanDetailView'
import PlatformTour from './PlatformTour'

interface ConsultantDashboardProps {
  onLogout: () => void
}

interface Bilan {
  id: string
  beneficiaryName: string
  phase: 'preliminary' | 'investigation' | 'conclusion'
  progress: number
  startDate: string
  nextSession?: string
  status: 'active' | 'completed'
}

export default function ConsultantDashboard({ onLogout }: ConsultantDashboardProps) {
  const [bilans, setBilans] = useKV<Bilan[]>('consultant-bilans', [
    {
      id: '1',
      beneficiaryName: 'Sophie Martin',
      phase: 'investigation',
      progress: 65,
      startDate: '2025-01-15',
      nextSession: '2025-02-05',
      status: 'active'
    },
    {
      id: '2',
      beneficiaryName: 'Thomas Dubois',
      phase: 'preliminary',
      progress: 25,
      startDate: '2025-01-28',
      nextSession: '2025-02-03',
      status: 'active'
    },
    {
      id: '3',
      beneficiaryName: 'Marie Lefebvre',
      phase: 'conclusion',
      progress: 90,
      startDate: '2024-12-10',
      nextSession: '2025-02-01',
      status: 'active'
    }
  ])

  const [selectedBilan, setSelectedBilan] = useState<string | null>(null)
  const [showTour, setShowTour] = useState(false)

  if (selectedBilan) {
    const bilan = (bilans || []).find(b => b.id === selectedBilan)
    if (bilan) {
      return <BilanDetailView bilan={bilan} onBack={() => setSelectedBilan(null)} />
    }
  }

  const activeBilans = (bilans || []).filter(b => b.status === 'active')
  const completedBilans = (bilans || []).filter(b => b.status === 'completed')

  const getPhaseLabel = (phase: Bilan['phase']) => {
    const labels = {
      preliminary: 'Préliminaire',
      investigation: 'Investigation',
      conclusion: 'Conclusion'
    }
    return labels[phase]
  }

  const getPhaseColor = (phase: Bilan['phase']) => {
    const colors = {
      preliminary: 'bg-secondary/20 text-secondary-foreground',
      investigation: 'bg-primary/20 text-primary',
      conclusion: 'bg-accent/20 text-accent-foreground'
    }
    return colors[phase]
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Brain size={24} weight="duotone" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">BilanCompetence.AI</h1>
                <p className="text-sm text-muted-foreground">Espace Consultant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowTour(true)}
                title="Aide et visite guidée"
              >
                <Question size={20} />
              </Button>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-foreground">Dr. Claire Rousseau</div>
                <div className="text-xs text-muted-foreground">Consultante certifiée</div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <SignOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Bilans actifs</CardDescription>
              <CardTitle className="text-3xl font-bold">{activeBilans.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>En cours</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Séances cette semaine</CardDescription>
              <CardTitle className="text-3xl font-bold">8</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>Planifiées</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Complétion moyenne</CardDescription>
              <CardTitle className="text-3xl font-bold">72%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ChartBar size={16} />
                <span>Tous bilans</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Satisfaction</CardDescription>
              <CardTitle className="text-3xl font-bold">94%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-accent-foreground">
                <CheckCircle size={16} weight="fill" />
                <span>Bénéficiaires</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="active" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="active">Bilans actifs</TabsTrigger>
                <TabsTrigger value="completed">Terminés</TabsTrigger>
              </TabsList>
              <Button className="gap-2">
                <Plus size={18} weight="bold" />
                Nouveau bilan
              </Button>
            </div>

            <TabsContent value="active" className="space-y-4">
              {activeBilans.map(bilan => (
                <Card key={bilan.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedBilan(bilan.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">{bilan.beneficiaryName}</CardTitle>
                          <Badge className={getPhaseColor(bilan.phase)}>
                            {getPhaseLabel(bilan.phase)}
                          </Badge>
                        </div>
                        <CardDescription>Démarré le {new Date(bilan.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{bilan.progress}%</div>
                        <div className="text-xs text-muted-foreground">Progression</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={bilan.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span>Prochaine séance: {bilan.nextSession ? new Date(bilan.nextSession).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'À planifier'}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ClipboardText size={16} />
                        Voir détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedBilans.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle size={48} className="text-muted-foreground mx-auto mb-4" weight="duotone" />
                    <p className="text-muted-foreground">Aucun bilan terminé pour le moment</p>
                  </CardContent>
                </Card>
              ) : (
                completedBilans.map(bilan => (
                  <Card key={bilan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{bilan.beneficiaryName}</CardTitle>
                          <CardDescription>Terminé le {new Date(bilan.startDate).toLocaleDateString('fr-FR')}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir le rapport
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      {showTour && (
        <PlatformTour 
          onClose={() => setShowTour(false)} 
          userRole="consultant" 
        />
      )}
    </div>
  )
}
