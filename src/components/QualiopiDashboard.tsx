import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { 
  ShieldCheck, 
  DownloadSimple, 
  CheckCircle, 
  Warning, 
  ChartBar,
  ClipboardText,
  Calendar,
  Users
} from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { generateQualiopiReport, QUALIOPI_INDICATORS } from '../lib/qualiopi'
import { toast } from 'sonner'

interface QualiopiDashboardProps {
  organizationId: string
}

interface QualiopiMetrics {
  totalBilans: number
  completedBilans: number
  activeBilans: number
  averageSatisfaction: number
  averageCompletionTime: number
  contractsSigned: number
  satisfactionCollected: number
  synthesisGenerated: number
  minimumHoursCompliant: number
}

export default function QualiopiDashboard({ organizationId }: QualiopiDashboardProps) {
  const [metrics] = useKV<QualiopiMetrics>(`qualiopi-metrics-${organizationId}`, {
    totalBilans: 45,
    completedBilans: 38,
    activeBilans: 7,
    averageSatisfaction: 4.7,
    averageCompletionTime: 72,
    contractsSigned: 45,
    satisfactionCollected: 38,
    synthesisGenerated: 38,
    minimumHoursCompliant: 38
  })

  const [bilans] = useKV<any[]>('consultant-bilans', [])

  const handleDownloadReport = () => {
    if (!metrics || !bilans) return
    
    const report = generateQualiopiReport(
      bilans,
      metrics.completedBilans,
      metrics.averageSatisfaction,
      metrics.averageCompletionTime
    )
    
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rapport-qualiopi-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Rapport téléchargé', {
      description: 'Le rapport Qualiopi a été généré et téléchargé avec succès'
    })
  }

  if (!metrics) return null

  const complianceRate = (metrics.contractsSigned / metrics.totalBilans) * 100
  const satisfactionRate = (metrics.satisfactionCollected / metrics.completedBilans) * 100
  const synthesisRate = (metrics.synthesisGenerated / metrics.completedBilans) * 100
  const hoursComplianceRate = (metrics.minimumHoursCompliant / metrics.completedBilans) * 100

  const indicators = [
    {
      number: 1,
      label: 'Information du public',
      status: complianceRate >= 100 ? 'compliant' : 'partial',
      value: complianceRate,
      description: 'Contrats signés et objectifs définis',
      details: `${metrics.contractsSigned}/${metrics.totalBilans} bilans`
    },
    {
      number: 2,
      label: 'Indicateurs de résultats',
      status: metrics.completedBilans > 0 ? 'compliant' : 'non_compliant',
      value: (metrics.completedBilans / metrics.totalBilans) * 100,
      description: 'Taux de complétion et progression',
      details: `${metrics.completedBilans}/${metrics.totalBilans} bilans complétés`
    },
    {
      number: 11,
      label: 'Évaluation et satisfaction',
      status: satisfactionRate >= 95 ? 'compliant' : 'partial',
      value: satisfactionRate,
      description: 'Enquêtes de satisfaction collectées',
      details: `${metrics.satisfactionCollected}/${metrics.completedBilans} enquêtes`
    },
    {
      number: 22,
      label: 'Traçabilité des actions',
      status: hoursComplianceRate >= 95 ? 'compliant' : 'partial',
      value: hoursComplianceRate,
      description: 'Respect du minimum de 24h par bilan',
      details: `${metrics.minimumHoursCompliant}/${metrics.completedBilans} conformes`
    },
    {
      number: 23,
      label: 'Mesure de la satisfaction',
      status: metrics.averageSatisfaction >= 4.5 ? 'compliant' : 'partial',
      value: (metrics.averageSatisfaction / 5) * 100,
      description: 'Satisfaction moyenne des bénéficiaires',
      details: `${metrics.averageSatisfaction.toFixed(1)}/5.0`
    },
    {
      number: 24,
      label: 'Documents de synthèse',
      status: synthesisRate >= 95 ? 'compliant' : 'partial',
      value: synthesisRate,
      description: 'Documents générés pour bilans complétés',
      details: `${metrics.synthesisGenerated}/${metrics.completedBilans} documents`
    }
  ]

  const overallCompliance = indicators.filter(i => i.status === 'compliant').length / indicators.length * 100

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <ShieldCheck size={28} className="text-primary" />
            Conformité Qualiopi
          </h2>
          <p className="text-muted-foreground mt-1">
            Suivi en temps réel de votre conformité au Référentiel National Qualité
          </p>
        </div>
        <Button onClick={handleDownloadReport} variant="outline" className="gap-2">
          <DownloadSimple size={18} />
          Télécharger le rapport
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Conformité Globale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground mb-2">
              {overallCompliance.toFixed(0)}%
            </div>
            <Progress value={overallCompliance} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {indicators.filter(i => i.status === 'compliant').length}/{indicators.length} critères conformes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Satisfaction Moyenne</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground mb-2">
              {metrics.averageSatisfaction.toFixed(1)}/5
            </div>
            <Progress value={(metrics.averageSatisfaction / 5) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {metrics.satisfactionCollected} enquêtes collectées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taux de Complétion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground mb-2">
              {((metrics.completedBilans / metrics.totalBilans) * 100).toFixed(0)}%
            </div>
            <Progress value={(metrics.completedBilans / metrics.totalBilans) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {metrics.completedBilans}/{metrics.totalBilans} bilans terminés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Durée Moyenne</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-foreground mb-2">
              {metrics.averageCompletionTime}j
            </div>
            <Progress value={Math.min((metrics.averageCompletionTime / 90) * 100, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Objectif: 60-90 jours
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="indicators" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="indicators">Indicateurs</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="audit">Préparation Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="space-y-4">
          <div className="grid gap-4">
            {indicators.map((indicator) => (
              <Card key={indicator.number}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={indicator.status === 'compliant' ? 'default' : 'secondary'}>
                          Indicateur {indicator.number}
                        </Badge>
                        {indicator.status === 'compliant' ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <Warning size={20} className="text-amber-600" />
                        )}
                      </div>
                      <CardTitle className="text-base">{indicator.label}</CardTitle>
                      <CardDescription className="mt-1">{indicator.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-foreground">
                        {indicator.value.toFixed(0)}%
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {indicator.details}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={indicator.value} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Alert>
            <ClipboardText className="h-4 w-4" />
            <AlertTitle>Documents Requis</AlertTitle>
            <AlertDescription>
              Liste des documents nécessaires pour l'audit Qualiopi
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Documents Généraux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Modèles de contrats de bilan</span>
                </div>
                <Badge>Disponible</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Enquêtes de satisfaction</span>
                </div>
                <Badge>Automatisé</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Documents de synthèse</span>
                </div>
                <Badge>Générés automatiquement</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Feuilles d'émargement</span>
                </div>
                <Badge>Traçabilité digitale</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registres et Preuves</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ChartBar size={20} className="text-primary" />
                  <span className="text-sm">Registre des bilans réalisés</span>
                </div>
                <Button variant="ghost" size="sm">Exporter</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-primary" />
                  <span className="text-sm">Liste des consultants certifiés</span>
                </div>
                <Button variant="ghost" size="sm">Exporter</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <span className="text-sm">Historique des sessions</span>
                </div>
                <Button variant="ghost" size="sm">Exporter</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Prêt pour l'Audit</AlertTitle>
            <AlertDescription>
              Votre organisation est {overallCompliance >= 90 ? 'prête' : 'partiellement prête'} pour un audit Qualiopi
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Checklist Pré-Audit</CardTitle>
              <CardDescription>
                Vérification des 7 critères Qualiopi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.values(QUALIOPI_INDICATORS).slice(0, 5).map((ind) => (
                <div key={ind.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle size={20} className="text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{ind.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{ind.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommandations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {satisfactionRate < 95 && (
                <Alert>
                  <Warning className="h-4 w-4" />
                  <AlertTitle>Action Requise</AlertTitle>
                  <AlertDescription>
                    Collecter les enquêtes de satisfaction manquantes ({metrics.completedBilans - metrics.satisfactionCollected} restantes)
                  </AlertDescription>
                </Alert>
              )}
              {synthesisRate < 95 && (
                <Alert>
                  <Warning className="h-4 w-4" />
                  <AlertTitle>Action Requise</AlertTitle>
                  <AlertDescription>
                    Générer les documents de synthèse manquants ({metrics.completedBilans - metrics.synthesisGenerated} restants)
                  </AlertDescription>
                </Alert>
              )}
              {overallCompliance >= 90 && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Excellent !</AlertTitle>
                  <AlertDescription>
                    Votre organisation respecte tous les critères Qualiopi. Continuez sur cette lancée !
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
