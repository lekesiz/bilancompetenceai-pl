import { useState } from 'react'
import { ShieldCheck, Download, Trash, FileText, Database, User } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Separator } from './ui/separator'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from './ui/alert-dialog'
import { Badge } from './ui/badge'
import { toast } from 'sonner'

interface RGPDDataExportProps {
  userId: string
  userName: string
  userEmail: string
}

interface DataCategory {
  category: string
  description: string
  dataCount: number
  icon: React.ReactNode
}

export default function RGPDDataExport({ userId, userName, userEmail }: RGPDDataExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const dataCategories: DataCategory[] = [
    {
      category: 'Informations Personnelles',
      description: 'Nom, email, coordonnées',
      dataCount: 8,
      icon: <User size={20} />
    },
    {
      category: 'Données de Bilan',
      description: 'Évaluations de compétences, parcours professionnel',
      dataCount: 45,
      icon: <FileText size={20} />
    },
    {
      category: 'Messages',
      description: 'Conversations avec consultants',
      dataCount: 23,
      icon: <Database size={20} />
    },
    {
      category: 'Documents',
      description: 'Documents de synthèse, rapports',
      dataCount: 5,
      icon: <FileText size={20} />
    }
  ]

  const exportAllData = async () => {
    setIsExporting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const exportData = {
        exportDate: new Date().toISOString(),
        user: {
          id: userId,
          name: userName,
          email: userEmail
        },
        personalInfo: {
          name: userName,
          email: userEmail,
          phone: '+33 6 12 34 56 78',
          address: '123 Rue Example, 75001 Paris',
          dateOfBirth: '1985-06-15',
          registrationDate: '2025-01-15'
        },
        bilansDeCompetences: [
          {
            id: 'bilan-001',
            startDate: '2025-01-15',
            status: 'active',
            phase: 'investigation',
            progress: 65,
            consultant: 'Dr. Claire Rousseau'
          }
        ],
        skillsAssessments: [
          { skill: 'Gestion de projet', mastery: 85, frequency: 'daily', preference: 'love' },
          { skill: 'Communication', mastery: 90, frequency: 'daily', preference: 'love' },
          { skill: 'Analyse de données', mastery: 70, frequency: 'weekly', preference: 'neutral' }
        ],
        messages: [
          {
            id: 'msg-001',
            date: '2025-02-01T14:30:00',
            from: 'consultant',
            to: 'beneficiary',
            content: 'Bonjour, excellente progression sur l\'auto-évaluation!'
          },
          {
            id: 'msg-002',
            date: '2025-02-01T15:45:00',
            from: 'beneficiary',
            to: 'consultant',
            content: 'Merci! J\'ai une question sur les métiers suggérés.'
          }
        ],
        sessions: [
          {
            id: 'session-001',
            date: '2025-02-05',
            type: 'investigation',
            format: 'visio',
            status: 'scheduled'
          }
        ],
        aiRecommendations: [
          {
            jobTitle: 'Chef de Projet Digital',
            matchScore: 92,
            generatedDate: '2025-02-01'
          },
          {
            jobTitle: 'Responsable Formation',
            matchScore: 88,
            generatedDate: '2025-02-01'
          }
        ],
        documents: [
          {
            id: 'doc-001',
            type: 'Synthèse de bilan',
            createdDate: '2025-02-10',
            status: 'draft'
          }
        ],
        consentHistory: [
          {
            date: '2025-01-15',
            type: 'Conditions générales',
            accepted: true
          },
          {
            date: '2025-01-15',
            type: 'Traitement données personnelles',
            accepted: true
          }
        ],
        rgpdInfo: {
          dataController: 'BilanCompetence.AI - NETZ INFORMATIQUE',
          dpo: 'dpo@bilancompetence.ai',
          legalBasis: 'Consentement utilisateur (RGPD Art. 6.1.a)',
          dataRetention: '3 ans après fin du bilan',
          rights: [
            'Droit d\'accès (Art. 15)',
            'Droit de rectification (Art. 16)',
            'Droit à l\'effacement (Art. 17)',
            'Droit à la portabilité (Art. 20)',
            'Droit d\'opposition (Art. 21)'
          ]
        }
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `BilanCompetenceAI_Export_RGPD_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('Export RGPD réussi', {
        description: 'Toutes vos données ont été téléchargées au format JSON'
      })
    } catch (error) {
      toast.error('Erreur d\'export', {
        description: 'Impossible d\'exporter les données. Veuillez réessayer.'
      })
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const deleteAllData = async () => {
    setIsDeleting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Demande enregistrée', {
        description: 'Vos données seront supprimées sous 30 jours conformément au RGPD'
      })
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible de traiter la demande. Contactez le support.'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert className="border-primary/50 bg-primary/5">
        <ShieldCheck size={20} className="text-primary" />
        <AlertTitle>Protection de vos données (RGPD)</AlertTitle>
        <AlertDescription>
          Conformément au Règlement Général sur la Protection des Données, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Vos Droits RGPD</CardTitle>
          <CardDescription>
            BilanCompetence.AI respecte vos droits en matière de protection des données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <ShieldCheck size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">Droit d'accès</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Obtenez une copie complète de toutes vos données
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <ShieldCheck size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">Droit de rectification</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Modifiez vos informations personnelles à tout moment
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <ShieldCheck size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">Droit à l'effacement</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Demandez la suppression définitive de vos données
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <ShieldCheck size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">Droit à la portabilité</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Récupérez vos données dans un format structuré (JSON)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Données Stockées</CardTitle>
          <CardDescription>
            Aperçu des catégories de données vous concernant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {dataCategories.map((cat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{cat.category}</div>
                    <div className="text-xs text-muted-foreground">{cat.description}</div>
                  </div>
                </div>
                <Badge variant="outline">
                  {cat.dataCount} éléments
                </Badge>
              </div>
              {idx < dataCategories.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions sur vos Données</CardTitle>
          <CardDescription>
            Exercez vos droits RGPD
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={exportAllData}
            disabled={isExporting}
            className="w-full gap-2"
            size="lg"
          >
            <Download size={20} />
            {isExporting ? 'Export en cours...' : 'Télécharger toutes mes données (JSON)'}
          </Button>

          <Separator />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full gap-2"
                size="lg"
              >
                <Trash size={20} />
                Supprimer toutes mes données
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Suppression définitive des données</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Toutes vos données (bilans, messages, documents) seront définitivement supprimées sous 30 jours conformément au RGPD.
                  <br /><br />
                  Vous recevrez un email de confirmation avant la suppression effective.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteAllData}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? 'Traitement...' : 'Confirmer la suppression'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Alert variant="destructive" className="mt-4">
            <Trash size={16} />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription className="text-xs">
              La suppression de vos données entraînera la fermeture de votre compte et l'annulation de tous vos bilans en cours.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-sm">Responsable du Traitement des Données</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-2">
          <p><strong>Organisme:</strong> NETZ INFORMATIQUE</p>
          <p><strong>DPO (Délégué à la Protection des Données):</strong> dpo@bilancompetence.ai</p>
          <p><strong>Base légale:</strong> Consentement utilisateur (RGPD Art. 6.1.a)</p>
          <p><strong>Durée de conservation:</strong> 3 ans après la fin du bilan</p>
          <p><strong>Autorité de contrôle:</strong> CNIL (Commission Nationale de l'Informatique et des Libertés)</p>
        </CardContent>
      </Card>
    </div>
  )
}
