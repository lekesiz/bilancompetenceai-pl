import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Brain, SignOut, Users, ChartBar, TrendUp, ShieldCheck, FileText, Plus } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback } from './ui/avatar'

interface AdminDashboardProps {
  onLogout: () => void
}

interface Consultant {
  id: string
  name: string
  email: string
  activeBilans: number
  completedBilans: number
  satisfaction: number
  certified: boolean
}

interface OrganismeStats {
  totalBilans: number
  activeBilans: number
  completedBilans: number
  totalConsultants: number
  averageSatisfaction: number
  qualiopiCompliance: number
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [consultants] = useKV<Consultant[]>('admin-consultants', [
    {
      id: '1',
      name: 'Dr. Claire Rousseau',
      email: 'claire.rousseau@example.fr',
      activeBilans: 3,
      completedBilans: 12,
      satisfaction: 94,
      certified: true
    },
    {
      id: '2',
      name: 'Marc Dupont',
      email: 'marc.dupont@example.fr',
      activeBilans: 5,
      completedBilans: 8,
      satisfaction: 91,
      certified: true
    },
    {
      id: '3',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@example.fr',
      activeBilans: 2,
      completedBilans: 15,
      satisfaction: 96,
      certified: true
    }
  ])

  const [stats] = useKV<OrganismeStats>('admin-stats', {
    totalBilans: 45,
    activeBilans: 10,
    completedBilans: 35,
    totalConsultants: 3,
    averageSatisfaction: 94,
    qualiopiCompliance: 98
  })

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
                <p className="text-sm text-muted-foreground">Espace Administrateur</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-foreground">Centre de Formation Pro</div>
                <div className="text-xs text-muted-foreground">Administrateur</div>
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
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardDescription>Bilans actifs</CardDescription>
              <CardTitle className="text-3xl font-bold">{stats?.activeBilans || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-primary">
                <TrendUp size={16} />
                <span>Sur {stats?.totalBilans || 0} total</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardDescription>Consultants actifs</CardDescription>
              <CardTitle className="text-3xl font-bold">{stats?.totalConsultants || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-accent-foreground">
                <Users size={16} />
                <span>Certifiés</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardDescription>Satisfaction moyenne</CardDescription>
              <CardTitle className="text-3xl font-bold">{stats?.averageSatisfaction || 0}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <ChartBar size={16} />
                <span>Bénéficiaires</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardDescription>Conformité Qualiopi</CardDescription>
              <CardTitle className="text-3xl font-bold">{stats?.qualiopiCompliance || 0}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <ShieldCheck size={16} weight="fill" />
                <span>Indicateurs OK</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="consultants" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="consultants">Consultants</TabsTrigger>
                <TabsTrigger value="analytics">Analytiques</TabsTrigger>
                <TabsTrigger value="qualiopi">Qualiopi</TabsTrigger>
              </TabsList>
              <Button className="gap-2">
                <Plus size={18} weight="bold" />
                Inviter consultant
              </Button>
            </div>

            <TabsContent value="consultants" className="space-y-4">
              {(consultants || []).map(consultant => (
                <Card key={consultant.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {consultant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{consultant.name}</CardTitle>
                            {consultant.certified && (
                              <Badge variant="outline" className="gap-1">
                                <ShieldCheck size={12} weight="fill" />
                                Certifié
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{consultant.email}</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir profil
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bilans en cours</div>
                        <div className="text-2xl font-bold text-primary">{consultant.activeBilans}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Bilans terminés</div>
                        <div className="text-2xl font-bold text-foreground">{consultant.completedBilans}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Satisfaction</div>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-accent">{consultant.satisfaction}%</div>
                          <Progress value={consultant.satisfaction} className="h-2 flex-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance mensuelle</CardTitle>
                    <CardDescription>Évolution des bilans réalisés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Janvier 2025</span>
                        <span className="font-semibold">12 bilans</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Décembre 2024</span>
                        <span className="font-semibold">15 bilans</span>
                      </div>
                      <Progress value={93} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Novembre 2024</span>
                        <span className="font-semibold">8 bilans</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Taux de complétion</CardTitle>
                    <CardDescription>Bilans terminés vs abandonnés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">87%</div>
                        <div className="text-sm text-muted-foreground">Taux de réussite</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-semibold text-green-600">35</div>
                          <div className="text-xs text-muted-foreground">Terminés</div>
                        </div>
                        <div>
                          <div className="text-2xl font-semibold text-muted-foreground">5</div>
                          <div className="text-xs text-muted-foreground">Abandonnés</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="qualiopi" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck size={24} className="text-blue-600" weight="fill" />
                    Indicateurs Qualiopi
                  </CardTitle>
                  <CardDescription>Conformité aux 7 critères - 32 indicateurs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Indicateur 1: Information du public</div>
                        <div className="text-sm text-muted-foreground">Transparence des prestations</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={100} className="h-2 w-24" />
                        <span className="text-green-600 font-semibold text-sm">100%</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Indicateur 11: Évaluation des acquis</div>
                        <div className="text-sm text-muted-foreground">Satisfaction et résultats</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={98} className="h-2 w-24" />
                        <span className="text-green-600 font-semibold text-sm">98%</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Indicateur 22: Traçabilité</div>
                        <div className="text-sm text-muted-foreground">Documentation complète</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={95} className="h-2 w-24" />
                        <span className="text-green-600 font-semibold text-sm">95%</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={32} className="text-green-600" weight="fill" />
                      <div>
                        <div className="font-semibold text-green-900">Conformité validée</div>
                        <div className="text-sm text-green-700">Prêt pour audit Qualiopi</div>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <FileText size={16} />
                      Générer rapport
                    </Button>
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
