import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { 
  TrendUp, 
  TrendDown, 
  Users, 
  ChartBar, 
  ClipboardText, 
  CurrencyCircleDollar,
  CheckCircle,
  Clock,
  Star,
  Calendar
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

interface BusinessMetrics {
  totalBilans: number
  activeBilans: number
  completedBilans: number
  totalConsultants: number
  activeConsultants: number
  averageSatisfaction: number
  averageCompletionTime: number
  monthlyRevenue: number
  annualRecurringRevenue: number
  retentionRate: number
  nps: number
  conversionRate: number
}

interface MonthlyData {
  month: string
  bilans: number
  revenue: number
  satisfaction: number
}

export default function BusinessAnalytics() {
  const [metrics, setMetrics] = useKV<BusinessMetrics>('business-metrics', {
    totalBilans: 127,
    activeBilans: 42,
    completedBilans: 85,
    totalConsultants: 15,
    activeConsultants: 12,
    averageSatisfaction: 4.7,
    averageCompletionTime: 68,
    monthlyRevenue: 7200,
    annualRecurringRevenue: 86400,
    retentionRate: 87,
    nps: 62,
    conversionRate: 8.3
  })

  const [monthlyData] = useState<MonthlyData[]>([
    { month: 'Sep', bilans: 18, revenue: 5400, satisfaction: 4.5 },
    { month: 'Oct', bilans: 22, revenue: 6200, satisfaction: 4.6 },
    { month: 'Nov', bilans: 25, revenue: 6800, satisfaction: 4.7 },
    { month: 'Déc', bilans: 28, revenue: 7200, satisfaction: 4.7 },
    { month: 'Jan', bilans: 34, revenue: 8400, satisfaction: 4.8 }
  ])

  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month')

  if (!metrics) return null

  const MetricCard = ({ 
    title, 
    value, 
    unit, 
    trend, 
    icon: Icon, 
    description 
  }: { 
    title: string
    value: number | string
    unit?: string
    trend?: number
    icon: any
    description: string
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground" size={20} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">
          {value}{unit}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? <TrendUp size={16} /> : <TrendDown size={16} />}
            <span>{Math.abs(trend)}% vs période précédente</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Tableau de Bord Business</h2>
          <p className="text-muted-foreground mt-1">
            Indicateurs de performance et analytics stratégiques
          </p>
        </div>
        <div className="flex gap-2">
          <Badge 
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedPeriod('month')}
          >
            Mois
          </Badge>
          <Badge 
            variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedPeriod('quarter')}
          >
            Trimestre
          </Badge>
          <Badge 
            variant={selectedPeriod === 'year' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedPeriod('year')}
          >
            Année
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="bilans">Bilans</TabsTrigger>
          <TabsTrigger value="financial">Financier</TabsTrigger>
          <TabsTrigger value="quality">Qualité</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Bilans Actifs"
              value={metrics.activeBilans}
              icon={ClipboardText}
              description={`${metrics.totalBilans} total (${metrics.completedBilans} terminés)`}
              trend={12.5}
            />
            <MetricCard
              title="ARR"
              value={`${Math.round(metrics.annualRecurringRevenue / 1000)}k`}
              unit="€"
              icon={CurrencyCircleDollar}
              description={`${metrics.monthlyRevenue}€ MRR`}
              trend={18.2}
            />
            <MetricCard
              title="Satisfaction"
              value={metrics.averageSatisfaction}
              unit="/5"
              icon={Star}
              description={`NPS: ${metrics.nps} (Excellent)`}
              trend={4.4}
            />
            <MetricCard
              title="Taux de Rétention"
              value={metrics.retentionRate}
              unit="%"
              icon={CheckCircle}
              description={`${metrics.activeConsultants}/${metrics.totalConsultants} consultants actifs`}
              trend={2.3}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Évolution Mensuelle</CardTitle>
                <CardDescription>Bilans réalisés et revenus sur 5 mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex gap-6 text-muted-foreground">
                          <span>{data.bilans} bilans</span>
                          <span>{data.revenue}€</span>
                          <span className="flex items-center gap-1">
                            <Star size={14} weight="fill" className="text-accent" />
                            {data.satisfaction}
                          </span>
                        </div>
                      </div>
                      <Progress value={(data.bilans / 40) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Objectifs 2025</CardTitle>
                <CardDescription>Progression vers les KPIs annuels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Clients</span>
                    <span className="font-medium">15/50</span>
                  </div>
                  <Progress value={30} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ARR</span>
                    <span className="font-medium">86k/300k€</span>
                  </div>
                  <Progress value={28.7} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bilans</span>
                    <span className="font-medium">127/5000</span>
                  </div>
                  <Progress value={2.5} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Satisfaction</span>
                    <span className="font-medium text-green-600">4.7/4.5 ✓</span>
                  </div>
                  <Progress value={100} className="bg-green-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bilans" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Par Phase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Préliminaire</span>
                    <span className="font-medium">12 bilans</span>
                  </div>
                  <Progress value={28.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Investigation</span>
                    <span className="font-medium">22 bilans</span>
                  </div>
                  <Progress value={52.4} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conclusion</span>
                    <span className="font-medium">8 bilans</span>
                  </div>
                  <Progress value={19.1} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temps Moyen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-semibold">{metrics.averageCompletionTime}</div>
                    <p className="text-sm text-muted-foreground">jours</p>
                  </div>
                  <Clock size={48} className="text-muted-foreground" />
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Objectif</span>
                    <span className="font-medium">90 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meilleur</span>
                    <span className="font-medium text-green-600">45 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plus long</span>
                    <span className="font-medium text-orange-600">95 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux de Complétion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-semibold">89%</div>
                    <p className="text-sm text-muted-foreground">bilans terminés</p>
                  </div>
                  <CheckCircle size={48} className="text-green-600" weight="duotone" />
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Terminés</span>
                    <span className="font-medium">{metrics.completedBilans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">En cours</span>
                    <span className="font-medium">{metrics.activeBilans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Abandonnés</span>
                    <span className="font-medium text-red-600">6</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenus Récurrents</CardTitle>
                <CardDescription>Modèle SaaS par abonnement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">MRR (Monthly Recurring Revenue)</div>
                  <div className="text-4xl font-semibold">{metrics.monthlyRevenue}€</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendUp size={16} />
                    <span>+18.2% vs mois dernier</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">ARR (Annual Recurring Revenue)</div>
                  <div className="text-4xl font-semibold">{metrics.annualRecurringRevenue}€</div>
                  <Progress value={(metrics.annualRecurringRevenue / 300000) * 100} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Objectif Année 1: 300 000€</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par Offre</CardTitle>
                <CardDescription>Distribution des clients par plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Starter (49€/mois)</span>
                    <span className="font-medium">8 clients</span>
                  </div>
                  <Progress value={53.3} className="h-2" />
                  <p className="text-xs text-muted-foreground">392€/mois</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Professional (149€/mois)</span>
                    <span className="font-medium">6 clients</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-xs text-muted-foreground">894€/mois</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Enterprise (Sur devis)</span>
                    <span className="font-medium">1 client</span>
                  </div>
                  <Progress value={6.7} className="h-2" />
                  <p className="text-xs text-muted-foreground">599€/mois</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Projections Financières</CardTitle>
              <CardDescription>Scénarios de croissance selon le Cahier des Charges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium mb-2">Année 1 (Actuel)</div>
                    <div className="text-2xl font-semibold">86k€</div>
                    <p className="text-xs text-muted-foreground mt-1">15 clients • 127 bilans</p>
                  </div>
                  <div className="p-4 border rounded-lg border-primary">
                    <div className="text-sm font-medium mb-2">Année 1 (Objectif)</div>
                    <div className="text-2xl font-semibold text-primary">300k€</div>
                    <p className="text-xs text-muted-foreground mt-1">50 clients • 5 000 bilans</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium mb-2">Année 3 (Vision)</div>
                    <div className="text-2xl font-semibold">2.4M€</div>
                    <p className="text-xs text-muted-foreground mt-1">200 clients • 25 000 bilans</p>
                  </div>
                </div>
                <Alert>
                  <TrendUp className="h-4 w-4" />
                  <AlertTitle>Croissance Prévue</AlertTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sur la base de 100€ de panier moyen, croissance mensuelle de 12% et taux de rétention de 85%
                  </p>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Clients</CardTitle>
                <CardDescription>Enquêtes post-bilan et NPS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Note Moyenne</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          weight={star <= Math.round(metrics.averageSatisfaction) ? 'fill' : 'regular'}
                          className="text-accent"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-4xl font-semibold">{metrics.averageSatisfaction}/5</div>
                  <Progress value={(metrics.averageSatisfaction / 5) * 100} className="mt-2" />
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Net Promoter Score (NPS)</div>
                  <div className="text-4xl font-semibold">{metrics.nps}</div>
                  <Badge className="mt-2 bg-green-600">Excellent (&gt; 50)</Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    68% promoteurs • 26% passifs • 6% détracteurs
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicateurs Qualiopi</CardTitle>
                <CardDescription>Conformité réglementaire</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Indicateur 11</div>
                    <div className="text-xs text-muted-foreground">Évaluation & satisfaction</div>
                  </div>
                  <Badge className="bg-green-600">Conforme</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Indicateur 22</div>
                    <div className="text-xs text-muted-foreground">Traçabilité des actions</div>
                  </div>
                  <Badge className="bg-green-600">Conforme</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Indicateur 23</div>
                    <div className="text-xs text-muted-foreground">Mesure satisfaction</div>
                  </div>
                  <Badge className="bg-green-600">Conforme</Badge>
                </div>
                <Separator />
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle size={32} className="text-green-600 mx-auto mb-2" weight="duotone" />
                  <div className="font-semibold">100% Conformité</div>
                  <p className="text-xs text-muted-foreground mt-1">6/6 indicateurs validés</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
