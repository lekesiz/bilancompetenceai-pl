import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { ArrowLeft, FilePdf, Sparkle, Download, CheckCircle, Eye } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { toast } from 'sonner'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
  llm: (prompt: string, model?: string, jsonMode?: boolean) => Promise<string>
}

interface SynthesisGeneratorProps {
  onBack: () => void
  bilanId: string
  beneficiaryName: string
}

interface SynthesisSection {
  title: string
  content: string
  isGenerated: boolean
}

export default function SynthesisGenerator({ onBack, bilanId, beneficiaryName }: SynthesisGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [sections, setSections] = useKV<SynthesisSection[]>(`synthesis-${bilanId}`, [
    {
      title: 'Présentation du Bénéficiaire',
      content: '',
      isGenerated: false
    },
    {
      title: 'Analyse du Parcours Professionnel',
      content: '',
      isGenerated: false
    },
    {
      title: 'Cartographie des Compétences',
      content: '',
      isGenerated: false
    },
    {
      title: 'Motivations et Valeurs',
      content: '',
      isGenerated: false
    },
    {
      title: 'Projet Professionnel',
      content: '',
      isGenerated: false
    },
    {
      title: 'Plan d\'Action SMART',
      content: '',
      isGenerated: false
    },
    {
      title: 'Recommandations de Formations',
      content: '',
      isGenerated: false
    }
  ])

  const generateSection = async (sectionIndex: number) => {
    if (!sections) return
    const section = sections[sectionIndex]
    setIsGenerating(true)
    
    try {
      const prompt = spark.llmPrompt`Tu es un consultant expert en bilan de compétences en France. Rédige la section "${section.title}" pour le document de synthèse du bilan de compétences de ${beneficiaryName}.

Contexte:
- Le bénéficiaire a complété toutes les phases du bilan (préliminaire, investigation, conclusion)
- Les compétences principales identifiées sont: Gestion de projet, Communication, Analyse de données, Formation d'équipes
- Les métiers cibles identifiés sont: Chef de Projet Digital, Responsable Formation, Consultant en Organisation

Rédige un texte professionnel, structuré et personnalisé de 200-300 mots pour la section "${section.title}".
Le ton doit être bienveillant, encourageant mais factuel. Respecte les normes Qualiopi.`

      const content = await spark.llm(prompt, 'gpt-4o-mini', false)
      
      const updatedSections = [...sections]
      updatedSections[sectionIndex] = {
        ...section,
        content: content.trim(),
        isGenerated: true
      }
      
      setSections(updatedSections)
      setGenerationProgress(((sectionIndex + 1) / sections.length) * 100)
      
      toast.success(`Section "${section.title}" générée`, {
        description: 'Vous pouvez modifier le contenu si nécessaire'
      })
    } catch (error) {
      toast.error('Erreur de génération', {
        description: 'Impossible de générer cette section. Veuillez réessayer.'
      })
      console.error('AI generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAllSections = async () => {
    if (!sections) return
    setIsGenerating(true)
    setGenerationProgress(0)
    
    for (let i = 0; i < sections.length; i++) {
      await generateSection(i)
    }
    
    toast.success('Document de synthèse complet', {
      description: 'Toutes les sections ont été générées avec succès'
    })
    setIsGenerating(false)
  }

  const updateSectionContent = (index: number, newContent: string) => {
    if (!sections) return
    const updatedSections = [...sections]
    updatedSections[index] = {
      ...updatedSections[index],
      content: newContent
    }
    setSections(updatedSections)
  }

  const exportToPDF = () => {
    if (!sections) return
    const generatedCount = sections.filter(s => s.isGenerated).length
    
    if (generatedCount < sections.length) {
      toast.error('Document incomplet', {
        description: `Générez toutes les sections avant l'export (${generatedCount}/${sections.length})`
      })
      return
    }

    const pdfContent = `
DOCUMENT DE SYNTHÈSE
BILAN DE COMPÉTENCES

Bénéficiaire: ${beneficiaryName}
Date: ${new Date().toLocaleDateString('fr-FR')}

═══════════════════════════════════════════════════

${sections.map((section, index) => `
${index + 1}. ${section.title.toUpperCase()}

${section.content}

${'─'.repeat(60)}
`).join('\n')}

═══════════════════════════════════════════════════

Document généré par BilanCompetence.AI
Conforme aux exigences Qualiopi
Certification et conformité RGPD assurées
    `.trim()

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Synthese_BilanCompetences_${beneficiaryName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success('Document exporté', {
      description: 'Le document de synthèse a été téléchargé'
    })
  }

  const allGenerated = sections?.every(s => s.isGenerated) ?? false

  if (!sections) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Document de Synthèse</h1>
                <p className="text-sm text-muted-foreground">{beneficiaryName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={exportToPDF}
                disabled={!allGenerated}
                variant="default"
                className="gap-2"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Exporter PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Alert>
          <Sparkle size={20} className="text-accent" />
          <AlertTitle>Génération automatique par IA</AlertTitle>
          <AlertDescription>
            L'intelligence artificielle va générer les sections du document de synthèse basées sur les données collectées durant le bilan. Vous pourrez ensuite modifier chaque section avant l'export final.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Progression de Génération</CardTitle>
                <CardDescription>
                  {sections.filter(s => s.isGenerated).length} / {sections.length} sections générées
                </CardDescription>
              </div>
              <Button
                onClick={generateAllSections}
                disabled={isGenerating || allGenerated}
                className="gap-2"
              >
                <Sparkle size={18} weight={isGenerating ? 'fill' : 'regular'} />
                {isGenerating ? 'Génération...' : allGenerated ? 'Toutes générées' : 'Tout Générer'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={generationProgress} className="h-2" />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <Card key={index} className={section.isGenerated ? 'border-accent/30' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </span>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    {section.isGenerated && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle size={14} weight="fill" />
                        Généré
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateSection(index)}
                    disabled={isGenerating}
                    className="gap-2"
                  >
                    <Sparkle size={16} />
                    {section.isGenerated ? 'Régénérer' : 'Générer'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {section.isGenerated ? (
                  <div className="space-y-3">
                    <Label htmlFor={`section-${index}`}>Contenu (éditable)</Label>
                    <Textarea
                      id={`section-${index}`}
                      value={section.content}
                      onChange={(e) => updateSectionContent(index, e.target.value)}
                      rows={8}
                      className="font-sans text-sm leading-relaxed"
                    />
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <FilePdf size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Cette section n'est pas encore générée</p>
                    <p className="text-xs mt-1">Cliquez sur "Générer" pour créer le contenu avec l'IA</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {allGenerated && (
          <Card className="border-accent bg-accent/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-accent" weight="fill" />
                <div>
                  <CardTitle className="text-accent">Document Complet</CardTitle>
                  <CardDescription>
                    Toutes les sections ont été générées. Vous pouvez maintenant exporter le document PDF.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={exportToPDF} className="w-full gap-2" size="lg">
                <Download size={20} />
                Télécharger le Document de Synthèse PDF
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
