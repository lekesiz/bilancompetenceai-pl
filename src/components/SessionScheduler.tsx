import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { ArrowLeft, Calendar as CalendarIcon, Plus, Clock, Video, MapPin } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Calendar } from './ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'

interface SessionSchedulerProps {
  onBack: () => void
  userRole: 'consultant' | 'beneficiary'
  beneficiaryName?: string
}

interface Session {
  id: string
  date: Date
  startTime: string
  endTime: string
  type: 'preliminary' | 'investigation' | 'conclusion'
  format: 'visio' | 'presentiel' | 'telephone'
  location?: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function SessionScheduler({ onBack, userRole, beneficiaryName }: SessionSchedulerProps) {
  const [sessions, setSessions] = useKV<Session[]>('scheduled-sessions', [
    {
      id: '1',
      date: new Date('2025-02-05T14:00:00'),
      startTime: '14:00',
      endTime: '16:00',
      type: 'investigation',
      format: 'visio',
      notes: 'Exploration des métiers et validation des pistes',
      status: 'scheduled'
    },
    {
      id: '2',
      date: new Date('2025-01-22T10:00:00'),
      startTime: '10:00',
      endTime: '12:00',
      type: 'investigation',
      format: 'presentiel',
      location: '15 Rue de la République, Paris',
      notes: 'Auto-évaluation des compétences',
      status: 'completed'
    }
  ])

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSession, setNewSession] = useState({
    startTime: '',
    endTime: '',
    type: 'investigation' as Session['type'],
    format: 'visio' as Session['format'],
    location: '',
    notes: ''
  })

  const handleCreateSession = () => {
    if (!selectedDate || !newSession.startTime || !newSession.endTime) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    const session: Session = {
      id: Date.now().toString(),
      date: selectedDate,
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      type: newSession.type,
      format: newSession.format,
      location: newSession.location,
      notes: newSession.notes,
      status: 'scheduled'
    }

    setSessions((current) => [...(current || []), session])
    setIsDialogOpen(false)
    toast.success('Séance planifiée avec succès')
    
    setNewSession({
      startTime: '',
      endTime: '',
      type: 'investigation',
      format: 'visio',
      location: '',
      notes: ''
    })
  }

  const getSessionsForDate = (date: Date) => {
    return (sessions || []).filter(session => 
      session.date.toDateString() === date.toDateString()
    )
  }

  const upcomingSessions = (sessions || [])
    .filter(s => s.status === 'scheduled' && new Date(s.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastSessions = (sessions || [])
    .filter(s => s.status === 'completed' || new Date(s.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getPhaseLabel = (type: Session['type']) => {
    const labels = {
      preliminary: 'Préliminaire',
      investigation: 'Investigation',
      conclusion: 'Conclusion'
    }
    return labels[type]
  }

  const getFormatIcon = (format: Session['format']) => {
    switch (format) {
      case 'visio':
        return <Video size={16} />
      case 'presentiel':
        return <MapPin size={16} />
      case 'telephone':
        return <Clock size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">Planification des séances</h1>
              <p className="text-sm text-muted-foreground">
                {beneficiaryName ? `Bilan de ${beneficiaryName}` : 'Mon calendrier'}
              </p>
            </div>
            {userRole === 'consultant' && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={18} weight="bold" />
                    Nouvelle séance
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Planifier une séance</DialogTitle>
                    <DialogDescription>
                      Choisissez une date et complétez les informations
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Phase du bilan</Label>
                      <Select value={newSession.type} onValueChange={(value: Session['type']) => setNewSession({...newSession, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preliminary">Phase Préliminaire</SelectItem>
                          <SelectItem value="investigation">Phase d'Investigation</SelectItem>
                          <SelectItem value="conclusion">Phase de Conclusion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Heure de début</Label>
                        <Select value={newSession.startTime} onValueChange={(value) => setNewSession({...newSession, startTime: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Heure de fin</Label>
                        <Select value={newSession.endTime} onValueChange={(value) => setNewSession({...newSession, endTime: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="13:00">13:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                            <SelectItem value="18:00">18:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select value={newSession.format} onValueChange={(value: Session['format']) => setNewSession({...newSession, format: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visio">Visioconférence</SelectItem>
                          <SelectItem value="presentiel">Présentiel</SelectItem>
                          <SelectItem value="telephone">Téléphone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newSession.format === 'presentiel' && (
                      <div className="space-y-2">
                        <Label>Lieu</Label>
                        <Textarea
                          placeholder="Adresse du rendez-vous"
                          value={newSession.location}
                          onChange={(e) => setNewSession({...newSession, location: e.target.value})}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Notes (optionnel)</Label>
                      <Textarea
                        placeholder="Objectifs de la séance, points à aborder..."
                        value={newSession.notes}
                        onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleCreateSession}>
                      Planifier
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
              <CardDescription>Sélectionnez une date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prochaines séances</CardTitle>
                <CardDescription>{upcomingSessions.length} séance(s) planifiée(s)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSessions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune séance planifiée
                  </p>
                ) : (
                  upcomingSessions.map(session => (
                    <Card key={session.id} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{getPhaseLabel(session.type)}</Badge>
                              <Badge variant="secondary" className="gap-1">
                                {getFormatIcon(session.format)}
                                {session.format === 'visio' ? 'Visio' : session.format === 'presentiel' ? 'Présentiel' : 'Téléphone'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-foreground">
                              <CalendarIcon size={16} />
                              <span className="font-medium">
                                {new Date(session.date).toLocaleDateString('fr-FR', { 
                                  weekday: 'long', 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock size={16} />
                              <span>{session.startTime} - {session.endTime}</span>
                            </div>
                            {session.location && (
                              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <MapPin size={14} />
                                <span>{session.location}</span>
                              </div>
                            )}
                            {session.notes && (
                              <p className="text-sm text-muted-foreground mt-2">{session.notes}</p>
                            )}
                          </div>
                          {session.format === 'visio' && (
                            <Button size="sm" className="gap-2">
                              <Video size={16} />
                              Rejoindre
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>

            {pastSessions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Séances passées</CardTitle>
                  <CardDescription>{pastSessions.length} séance(s) réalisée(s)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pastSessions.slice(0, 3).map(session => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="opacity-60">{getPhaseLabel(session.type)}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} • {session.startTime} - {session.endTime}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Voir notes
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
