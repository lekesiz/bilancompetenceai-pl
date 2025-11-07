export function formatDate(date: string | Date, format: 'short' | 'long' | 'full' = 'long'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  const formats = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' } as const,
    long: { day: '2-digit', month: 'long', year: 'numeric' } as const,
    full: { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' } as const
  }

  return new Intl.DateTimeFormat('fr-FR', formats[format]).format(d)
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'À l\'instant'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `Il y a ${diffInMonths} mois`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `Il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`
}

export function addDays(date: string | Date, days: number): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addMonths(date: string | Date, months: number): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

export function diffInDays(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function diffInMonths(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  
  let months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  
  return Math.abs(months)
}

export function isToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
}

export function isTomorrow(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const tomorrow = addDays(new Date(), 1)
  
  return d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
}

export function isThisWeek(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay() + 1)
  weekStart.setHours(0, 0, 0, 0)
  
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)
  
  return d >= weekStart && d <= weekEnd
}

export function isThisMonth(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  
  return d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
}

export function isPast(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return d < new Date()
}

export function isFuture(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return d > new Date()
}

export function getWeekNumber(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return weekNo
}

export function getMonthName(monthIndex: number): string {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]
  return months[monthIndex]
}

export function getDayName(dayIndex: number): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  return days[dayIndex]
}

export function getQuarter(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : date
  return Math.floor(d.getMonth() / 3) + 1
}

export function startOfDay(date: string | Date): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfDay(date: string | Date): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

export function startOfWeek(date: string | Date): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

export function endOfWeek(date: string | Date): Date {
  const start = startOfWeek(date)
  return addDays(start, 6)
}

export function startOfMonth(date: string | Date): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function endOfMonth(date: string | Date): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

export function getBusinessDays(startDate: string | Date, endDate: string | Date): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : new Date(startDate)
  const end = typeof endDate === 'string' ? new Date(endDate) : new Date(endDate)
  
  let count = 0
  const current = new Date(start)
  
  while (current <= end) {
    const dayOfWeek = current.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++
    }
    current.setDate(current.getDate() + 1)
  }
  
  return count
}

export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function fromISODate(isoDate: string): Date {
  return new Date(isoDate)
}

export function parseFrenchDate(dateString: string): Date | null {
  const match = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (!match) return null
  
  const [, day, month, year] = match
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) return `${mins}min`
  if (mins === 0) return `${hours}h`
  return `${hours}h${mins.toString().padStart(2, '0')}`
}

export function calculateAge(birthDate: string | Date): number {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

export function getDateRange(start: string | Date, end: string | Date): Date[] {
  const dates: Date[] = []
  const currentDate = typeof start === 'string' ? new Date(start) : new Date(start)
  const endDate = typeof end === 'string' ? new Date(end) : end
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return dates
}
