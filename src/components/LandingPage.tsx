import { Brain, UserCircle, Briefcase, ChartBar, Sparkle, ShieldCheck } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { UserRole } from '../App'

interface LandingPageProps {
  onLogin: (role: UserRole) => void
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <header className="text-center space-y-4 pt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
              <Brain size={32} weight="duotone" className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-semibold text-foreground tracking-tight">
              BilanCompetence.AI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La plateforme intelligente pour digitaliser et moderniser vos bilans de compétences
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-accent-foreground bg-accent/20 py-2 px-4 rounded-full w-fit mx-auto">
            <Sparkle size={18} weight="fill" />
            <span className="font-medium">Propulsé par l'intelligence artificielle</span>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Brain size={24} className="text-primary" />
              </div>
              <CardTitle>Analyse IA</CardTitle>
              <CardDescription>
                Intelligence artificielle pour identifier les compétences transférables et recommandations personnalisées
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <ChartBar size={24} className="text-accent" />
              </div>
              <CardTitle>Conformité Qualiopi</CardTitle>
              <CardDescription>
                Indicateurs de qualité intégrés et traçabilité automatique pour faciliter votre certification
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-3">
                <Briefcase size={24} className="text-secondary-foreground" />
              </div>
              <CardTitle>France Travail</CardTitle>
              <CardDescription>
                Intégration ROME et données du marché de l'emploi pour des recommandations réalistes
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Accéder à la plateforme</h2>
            <p className="text-muted-foreground">Choisissez votre rôle pour commencer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <UserCircle size={36} className="text-primary" weight="duotone" />
                </div>
                <CardTitle className="text-xl">Consultant</CardTitle>
                <CardDescription className="text-base">
                  Gérez vos bilans, accompagnez vos bénéficiaires avec l'aide de l'IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onLogin('consultant')} 
                  className="w-full"
                  size="lg"
                >
                  Accéder comme consultant
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto">
                  <UserCircle size={36} className="text-accent" weight="duotone" />
                </div>
                <CardTitle className="text-xl">Bénéficiaire</CardTitle>
                <CardDescription className="text-base">
                  Explorez vos compétences et découvrez de nouvelles opportunités professionnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onLogin('beneficiary')} 
                  variant="outline"
                  className="w-full border-2"
                  size="lg"
                >
                  Accéder comme bénéficiaire
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto">
                  <ShieldCheck size={36} className="text-blue-600" weight="duotone" />
                </div>
                <CardTitle className="text-xl">Administrateur</CardTitle>
                <CardDescription className="text-base">
                  Gérez votre organisme, consultants et conformité Qualiopi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onLogin('admin')} 
                  variant="outline"
                  className="w-full border-2"
                  size="lg"
                >
                  Accéder comme admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-card rounded-xl p-8 shadow-sm border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Pourquoi BilanCompetence.AI ?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-semibold">✓</span>
                  </div>
                  <span>Réduction de 40% du temps administratif pour les consultants</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-semibold">✓</span>
                  </div>
                  <span>Recommandations basées sur 500 000+ offres d'emploi réelles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-semibold">✓</span>
                  </div>
                  <span>Conformité RGPD et Qualiopi native</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-semibold">✓</span>
                  </div>
                  <span>Taux de satisfaction bénéficiaires &gt; 90%</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">500K+</div>
                <div className="text-sm text-muted-foreground">Bilans réalisés en France/an</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-foreground">12%</div>
                  <div className="text-xs text-muted-foreground">Croissance annuelle</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-foreground">85%</div>
                  <div className="text-xs text-muted-foreground">Projet clarifié</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>© 2025 BilanCompetence.AI - NETZ INFORMATIQUE • Plateforme SaaS de Bilans de Compétences</p>
        </footer>
      </div>
    </div>
  )
}
