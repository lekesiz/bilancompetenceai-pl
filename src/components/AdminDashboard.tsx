import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Brain, SignOut, Users, ChartBar, TrendUp, ShieldCheck, Plus } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback } from './ui/avatar'
import QualiopiDashboard from './QualiopiDashboard'
import BusinessAnalytics from './BusinessAnalytics'
import CPFIntegration from './CPFIntegration'

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
                <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
                <TabsTrigger value="cpf">CPF</TabsTrigger>
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
              <BusinessAnalytics />
            </TabsContent>

            <TabsContent value="cpf" className="space-y-6">
              <CPFIntegration />
            </TabsContent>

            <TabsContent value="qualiopi" className="space-y-6">
              <QualiopiDashboard organizationId="org-1" />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
