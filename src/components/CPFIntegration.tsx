import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  CurrencyCircleDollar,
  ArrowRight,
  Info
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface CPFDossier {
  id: string
  beneficiaryName: string
  bilanId: string
  amount: number
  status: 'pending' | 'approved' | 'rejected' | 'paid'
  submittedDate: string
  decidedDate?: string
  paidDate?: string
  cpfReference?: string
}

interface CPFStats {
  totalDossiers: number
  approvedAmount: number
  pendingAmount: number
  approvalRate: number
  averageProcessingTime: number
}

export default function CPFIntegration() {
  const [dossiers, setDossiers] = useKV<CPFDossier[]>('cpf-dossiers', [
    {
      id: 'cpf-001',
      beneficiaryName: 'Sophie Martin',
      bilanId: 'bilan-1',
      amount: 2400,
      status: 'paid',
      submittedDate: '2025-01-10',
      decidedDate: '2025-01-15',
      paidDate: '2025-01-20',
      cpfReference: 'CPF-2025-001234'
    },
    {
      id: 'cpf-002',
      beneficiaryName: 'Thomas Dubois',
      bilanId: 'bilan-2',
      amount: 2400,
      status: 'approved',
      submittedDate: '2025-01-20',
      decidedDate: '2025-01-25',
      cpfReference: 'CPF-2025-001235'
    },
    {
      id: 'cpf-003',
      beneficiaryName: 'Marie Lefebvre',
      bilanId: 'bilan-3',
      amount: 2400,
      status: 'pending',
      submittedDate: '2025-01-28'
    }
  ])

  const [stats] = useKV<CPFStats>('cpf-stats', {
    totalDossiers: 28,
    approvedAmount: 64800,
    pendingAmount: 7200,
    approvalRate: 96.4,
    averageProcessingTime: 5.2
  })

  const getStatusBadge = (status: CPFDossier['status']) => {
    const variants = {
      pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approuvé', className: 'bg-blue-100 text-blue-800' },
      rejected: { label: 'Rejeté', className: 'bg-red-100 text-red-800' },
      paid: { label: 'Payé', className: 'bg-green-100 text-green-800' }
    }
    const variant = variants[status]
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  const getStatusIcon = (status: CPFDossier['status']) => {
    const icons = {
      pending: <Clock size={20} className="text-yellow-600" />,
      approved: <CheckCircle size={20} className="text-blue-600" weight="fill" />,
      rejected: <XCircle size={20} className="text-red-600" weight="fill" />,
      paid: <CheckCircle size={20} className="text-green-600" weight="fill" />
    }
    return icons[status]
  }

  if (!dossiers || !stats) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Intégration CPF</h2>
          <p className="text-muted-foreground mt-1">
            Gestion des financements via le Compte Personnel de Formation
          </p>
        </div>
        <Button className="gap-2">
          <CreditCard size={18} />
          Nouveau dossier CPF
        </Button>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Fonctionnalité en développement - Phase 3</AlertTitle>
        <AlertDescription>
          L'intégration CPF complète sera disponible dans la Phase 3 du projet, incluant la connexion directe avec Mon Compte Formation, 
          la soumission automatique des dossiers, et le suivi des paiements en temps réel.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total dossiers</CardDescription>
            <CardTitle className="text-3xl font-bold">{stats.totalDossiers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {dossiers.filter(d => d.status === 'pending').length} en attente
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Montants approuvés</CardDescription>
            <CardTitle className="text-3xl font-bold">{(stats.approvedAmount / 1000).toFixed(0)}k€</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {stats.pendingAmount}€ en cours
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taux d'approbation</CardDescription>
            <CardTitle className="text-3xl font-bold">{stats.approvalRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={stats.approvalRate} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Délai moyen</CardDescription>
            <CardTitle className="text-3xl font-bold">{stats.averageProcessingTime}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              jours de traitement
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Tous les dossiers</TabsTrigger>
          <TabsTrigger value="pending">En attente ({dossiers.filter(d => d.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="approved">Approuvés ({dossiers.filter(d => d.status === 'approved' || d.status === 'paid').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {dossiers.map(dossier => (
            <Card key={dossier.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {getStatusIcon(dossier.status)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{dossier.beneficiaryName}</div>
                      <div className="text-sm text-muted-foreground">
                        Dossier {dossier.id} • Soumis le {new Date(dossier.submittedDate).toLocaleDateString('fr-FR')}
                      </div>
                      {dossier.cpfReference && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Référence CPF: {dossier.cpfReference}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-primary">{dossier.amount}€</div>
                    {getStatusBadge(dossier.status)}
                  </div>
                </div>
                {dossier.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        En attente depuis {Math.ceil((new Date().getTime() - new Date(dossier.submittedDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        Relancer
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                )}
                {dossier.status === 'paid' && dossier.paidDate && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-green-600 flex items-center gap-2">
                      <CheckCircle size={16} weight="fill" />
                      Paiement reçu le {new Date(dossier.paidDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {dossiers.filter(d => d.status === 'pending').map(dossier => (
            <Card key={dossier.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Clock size={24} className="text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{dossier.beneficiaryName}</div>
                      <div className="text-sm text-muted-foreground">
                        En attente depuis {Math.ceil((new Date().getTime() - new Date(dossier.submittedDate).getTime()) / (1000 * 60 * 60 * 24))} jours
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-primary">{dossier.amount}€</div>
                    <Button variant="outline" size="sm">Suivre le dossier</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {dossiers.filter(d => d.status === 'approved' || d.status === 'paid').map(dossier => (
            <Card key={dossier.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${dossier.status === 'paid' ? 'bg-green-100' : 'bg-blue-100'} flex items-center justify-center`}>
                      <CheckCircle size={24} className={dossier.status === 'paid' ? 'text-green-600' : 'text-blue-600'} weight="fill" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{dossier.beneficiaryName}</div>
                      <div className="text-sm text-muted-foreground">
                        {dossier.cpfReference}
                      </div>
                      {dossier.status === 'paid' && dossier.paidDate && (
                        <div className="text-sm text-green-600 mt-1">
                          Payé le {new Date(dossier.paidDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-primary">{dossier.amount}€</div>
                    {getStatusBadge(dossier.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Commission CPF (Optionnelle - Phase 3)</CardTitle>
          <CardDescription>
            Revenus additionnels via commission sur financement CPF (5-10% selon le Cahier des Charges)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total financé (CPF)</div>
              <div className="text-3xl font-bold">{(stats.approvedAmount / 1000).toFixed(0)}k€</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Commission estimée (7.5%)</div>
              <div className="text-3xl font-bold text-accent">{((stats.approvedAmount * 0.075) / 1000).toFixed(1)}k€</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Contribution ARR</div>
              <Progress value={7.5} className="mt-3" />
              <div className="text-xs text-muted-foreground">Revenu additionnel potentiel</div>
            </div>
          </div>
          <Separator />
          <Alert>
            <CurrencyCircleDollar className="h-4 w-4" />
            <AlertTitle>Modèle de Commission Optionnel</AlertTitle>
            <AlertDescription>
              Selon le modèle économique défini dans le Cahier des Charges, une commission de 5-10% sur les financements CPF 
              peut constituer un revenu additionnel significatif pour atteindre les objectifs ARR.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
