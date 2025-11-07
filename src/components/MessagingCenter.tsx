import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { ArrowLeft, PaperPlaneRight, User } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'

interface MessagingCenterProps {
  onBack: () => void
  userRole: 'consultant' | 'beneficiary'
  conversationWith: string
}

interface Message {
  id: string
  from: 'consultant' | 'beneficiary'
  content: string
  timestamp: string
  read: boolean
}

export default function MessagingCenter({ onBack, userRole, conversationWith }: MessagingCenterProps) {
  const [messages, setMessages] = useKV<Message[]>('conversation-messages', [
    {
      id: '1',
      from: 'consultant' as const,
      content: 'Bonjour Sophie, j\'ai bien reçu votre auto-évaluation. Excellente progression !',
      timestamp: '2025-02-01T14:30:00',
      read: true
    },
    {
      id: '2',
      from: 'beneficiary' as const,
      content: 'Merci beaucoup ! J\'ai une question concernant les métiers suggérés par l\'IA.',
      timestamp: '2025-02-01T15:45:00',
      read: true
    },
    {
      id: '3',
      from: 'consultant' as const,
      content: 'Bien sûr, je suis à votre écoute. De quel métier souhaitez-vous parler ?',
      timestamp: '2025-02-01T16:20:00',
      read: true
    },
    {
      id: '4',
      from: 'beneficiary' as const,
      content: 'Le poste de Chef de Projet Digital m\'intéresse beaucoup. Pensez-vous que je pourrais y accéder avec une formation courte ?',
      timestamp: '2025-02-02T09:15:00',
      read: false
    }
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      from: userRole,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    }

    setMessages((currentMessages) => [...(currentMessages || []), message])
    setNewMessage('')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {conversationWith.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{conversationWith}</h1>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'consultant' ? 'Bénéficiaire' : 'Consultante'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communication sécurisée et confidentielle</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {(messages || []).map((message) => {
                  const isCurrentUser = message.from === userRole
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] space-y-1 ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground px-2">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
            <Separator />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Écrivez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="gap-2">
                  <PaperPlaneRight size={18} weight="fill" />
                  Envoyer
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-1">
                🔒 Vos échanges sont confidentiels et conformes RGPD
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
