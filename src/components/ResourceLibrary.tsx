import { useState } from 'react'
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  MagnifyingGlass,
  Download,
  ArrowSquareOut,
  PlayCircle
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'

interface Resource {
  id: string
  title: string
  description: string
  category: 'guide' | 'formation' | 'reglementaire' | 'video' | 'modele'
  tags: string[]
  url?: string
  downloadable?: boolean
}

export default function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState('')

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Guide complet du bilan de compétences',
      description: 'Document de référence expliquant les 3 phases, les obligations légales et les bonnes pratiques',
      category: 'guide',
      tags: ['Débutant', 'Complet', 'PDF'],
      downloadable: true
    },
    {
      id: '2',
      title: 'Code du travail - Articles L6313-1 et suivants',
      description: 'Textes de loi encadrant le bilan de compétences en France',
      category: 'reglementaire',
      tags: ['Légal', 'Référence'],
      url: 'https://www.legifrance.gouv.fr'
    },
    {
      id: '3',
      title: 'Référentiel National Qualité (Qualiopi)',
      description: 'Les 7 critères et 32 indicateurs Qualiopi expliqués',
      category: 'reglementaire',
      tags: ['Qualiopi', 'Certification', 'PDF'],
      downloadable: true
    },
    {
      id: '4',
      title: 'Modèle de contrat d\'engagement',
      description: 'Template Word personnalisable pour le contrat tripartite',
      category: 'modele',
      tags: ['Modèle', 'Word', 'Phase préliminaire'],
      downloadable: true
    },
    {
      id: '5',
      title: 'Techniques d\'entretien en bilan de compétences',
      description: 'Formation vidéo (45min) sur les méthodes d\'entretien semi-directif',
      category: 'video',
      tags: ['Formation', 'Vidéo', 'Technique'],
      url: '#'
    },
    {
      id: '6',
      title: 'Grille d\'évaluation des compétences',
      description: 'Tableau Excel pour structurer l\'évaluation par domaine',
      category: 'modele',
      tags: ['Excel', 'Évaluation', 'Phase investigation'],
      downloadable: true
    },
    {
      id: '7',
      title: 'Référentiel ROME - Codes et définitions',
      description: 'Base de données complète des codes ROME de France Travail',
      category: 'guide',
      tags: ['ROME', 'Référence', 'France Travail'],
      downloadable: true
    },
    {
      id: '8',
      title: 'Guide RGPD pour les bilans de compétences',
      description: 'Conformité RGPD appliquée au traitement des données personnelles',
      category: 'reglementaire',
      tags: ['RGPD', 'Données personnelles', 'PDF'],
      downloadable: true
    },
    {
      id: '9',
      title: 'Modèle de synthèse professionnelle',
      description: 'Template Word du document de synthèse phase conclusion',
      category: 'modele',
      tags: ['Modèle', 'Word', 'Phase conclusion'],
      downloadable: true
    },
    {
      id: '10',
      title: 'Formation : Utiliser l\'IA dans les bilans',
      description: 'Webinaire (60min) sur l\'exploitation des recommandations IA',
      category: 'formation',
      tags: ['IA', 'Vidéo', 'Innovation'],
      url: '#'
    },
    {
      id: '11',
      title: 'Tests de personnalité professionnelle',
      description: 'Bibliothèque de tests validés (MBTI, RIASEC, etc.)',
      category: 'guide',
      tags: ['Tests', 'Psychologie', 'Outils'],
      downloadable: true
    },
    {
      id: '12',
      title: 'Questionnaire de satisfaction Qualiopi',
      description: 'Modèle conforme aux indicateurs 11, 23 et 25',
      category: 'modele',
      tags: ['Qualiopi', 'Satisfaction', 'Word'],
      downloadable: true
    },
    {
      id: '13',
      title: 'Annuaire des organismes de formation',
      description: 'Catalogue Datadock et Qualiopi actualisé mensuellement',
      category: 'guide',
      tags: ['Formation', 'Annuaire', 'Datadock'],
      url: '#'
    },
    {
      id: '14',
      title: 'Fiche métiers France Travail',
      description: 'Accès aux 532 fiches métiers ROME détaillées',
      category: 'guide',
      tags: ['Métiers', 'ROME', 'France Travail'],
      url: 'https://candidat.francetravail.fr/metierscope'
    },
    {
      id: '15',
      title: 'Guide de préparation audit Qualiopi',
      description: 'Checklist complète et recommandations pour réussir l\'audit',
      category: 'guide',
      tags: ['Qualiopi', 'Audit', 'Checklist'],
      downloadable: true
    }
  ]

  const filteredResources = resources.filter(resource =>
    searchQuery === '' ||
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getCategoryIcon = (category: Resource['category']) => {
    switch (category) {
      case 'guide':
        return <BookOpen size={24} className="text-primary" />
      case 'formation':
        return <GraduationCap size={24} className="text-accent" />
      case 'reglementaire':
        return <FileText size={24} className="text-destructive" />
      case 'video':
        return <PlayCircle size={24} className="text-accent" />
      case 'modele':
        return <Briefcase size={24} className="text-primary" />
    }
  }

  const getCategoryLabel = (category: Resource['category']) => {
    switch (category) {
      case 'guide':
        return 'Guides'
      case 'formation':
        return 'Formations'
      case 'reglementaire':
        return 'Réglementaire'
      case 'video':
        return 'Vidéos'
      case 'modele':
        return 'Modèles'
    }
  }

  const getCategoryColor = (category: Resource['category']) => {
    switch (category) {
      case 'guide':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'formation':
        return 'bg-accent/10 text-accent-foreground border-accent/20'
      case 'reglementaire':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'video':
        return 'bg-accent/10 text-accent-foreground border-accent/20'
      case 'modele':
        return 'bg-primary/10 text-primary border-primary/20'
    }
  }

  const resourcesByCategory = (category: Resource['category']) =>
    filteredResources.filter(r => r.category === category)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Bibliothèque de ressources</h2>
        <p className="text-muted-foreground">
          Guides, modèles, formations et documentation pour vos bilans de compétences
        </p>
      </div>

      <div className="relative">
        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher une ressource, un thème..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">Tout</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
          <TabsTrigger value="modele">Modèles</TabsTrigger>
          <TabsTrigger value="formation">Formations</TabsTrigger>
          <TabsTrigger value="reglementaire">Légal</TabsTrigger>
          <TabsTrigger value="video">Vidéos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Aucune ressource trouvée</p>
              </CardContent>
            </Card>
          ) : (
            filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-muted flex-shrink-0">
                      {getCategoryIcon(resource.category)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <Badge className={getCategoryColor(resource.category)} variant="outline">
                          {getCategoryLabel(resource.category)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          {resource.downloadable && (
                            <Button size="sm" variant="outline" className="gap-2">
                              <Download size={16} />
                              Télécharger
                            </Button>
                          )}
                          {resource.url && (
                            <Button size="sm" variant="outline" className="gap-2">
                              <ArrowSquareOut size={16} />
                              Accéder
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {(['guide', 'modele', 'formation', 'reglementaire', 'video'] as const).map((category) => (
          <TabsContent key={category} value={category} className="mt-6 space-y-4">
            {resourcesByCategory(category).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aucune ressource dans cette catégorie</p>
                </CardContent>
              </Card>
            ) : (
              resourcesByCategory(category).map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-muted flex-shrink-0">
                        {getCategoryIcon(resource.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {resource.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            {resource.downloadable && (
                              <Button size="sm" variant="outline" className="gap-2">
                                <Download size={16} />
                                Télécharger
                              </Button>
                            )}
                            {resource.url && (
                              <Button size="sm" variant="outline" className="gap-2">
                                <ArrowSquareOut size={16} />
                                Accéder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-8" />

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap size={24} className="text-primary" />
            Besoin d'une formation personnalisée ?
          </CardTitle>
          <CardDescription>
            Notre équipe propose des sessions de formation sur mesure pour maîtriser tous les aspects de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="gap-2">
            Demander une formation
            <ArrowSquareOut size={16} />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
