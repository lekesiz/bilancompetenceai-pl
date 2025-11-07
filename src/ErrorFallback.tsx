import { useEffect } from 'react'
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react"
import { Warning, Bug, ArrowClockwise } from '@phosphor-icons/react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  if (import.meta.env.DEV) throw error

  useEffect(() => {
    console.error('Application Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  }, [error])

  const handleReset = () => {
    resetErrorBoundary()
  }

  const handleHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-destructive/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Warning size={48} className="text-destructive" weight="duotone" />
          </div>
          <div>
            <CardTitle className="text-2xl mb-2">Une erreur est survenue</CardTitle>
            <CardDescription className="text-base">
              L'application a rencontré un problème inattendu. Nos équipes techniques ont été notifiées.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert variant="destructive" className="border-destructive/50">
            <Bug size={20} />
            <AlertTitle>Détails de l'erreur</AlertTitle>
            <AlertDescription>
              <pre className="mt-3 text-xs bg-destructive/5 p-3 rounded border border-destructive/20 overflow-auto max-h-32 font-mono">
                {error.message}
              </pre>
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium hover:underline">
                    Voir la trace complète
                  </summary>
                  <pre className="mt-2 text-xs bg-destructive/5 p-3 rounded border border-destructive/20 overflow-auto max-h-48 font-mono">
                    {error.stack}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm">Que s'est-il passé ?</h4>
            <p className="text-sm text-muted-foreground">
              Une erreur technique a empêché l'application de fonctionner correctement. 
              Vous pouvez essayer de recharger la page ou revenir à l'accueil.
            </p>
          </div>

          <div className="bg-accent/10 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm">Besoin d'aide ?</h4>
            <p className="text-sm text-muted-foreground">
              Si le problème persiste, contactez notre support à{' '}
              <a href="mailto:support@bilancompetence.ai" className="text-primary hover:underline">
                support@bilancompetence.ai
              </a>
              {' '}en incluant les détails de l'erreur ci-dessus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleReset} 
              className="flex-1"
              size="lg"
            >
              <ArrowClockwise size={20} />
              Réessayer
            </Button>
            <Button 
              onClick={handleHome}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <HomeIcon size={20} />
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
