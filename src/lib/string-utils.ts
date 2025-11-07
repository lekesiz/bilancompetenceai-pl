export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function capitalizeWords(str: string): string {
  if (!str) return ''
  return str.split(' ').map(capitalize).join(' ')
}

export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (!str || str.length <= length) return str
  return str.substring(0, length - suffix.length) + suffix
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function sanitizeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
  return str.replace(/[&<>"'/]/g, (char) => map[char])
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length
}

export function readingTime(text: string, wordsPerMinute: number = 200): number {
  const words = wordCount(text)
  return Math.ceil(words / wordsPerMinute)
}

export function excerpt(text: string, maxWords: number = 50): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (count === 1) return singular
  return plural || singular + 's'
}

export function formatNumber(num: number, locale: string = 'fr-FR'): string {
  return new Intl.NumberFormat(locale).format(num)
}

export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount)
}

export function formatPercentage(
  value: number,
  decimals: number = 0,
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100)
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')
  if (username.length <= 2) return email
  const masked = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
  return `${masked}@${domain}`
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) return phone
  return phone.substring(0, 2) + '*'.repeat(phone.length - 4) + phone.slice(-2)
}

export function normalizeSpaces(str: string): string {
  return str.replace(/\s+/g, ' ').trim()
}

export function removeNonNumeric(str: string): string {
  return str.replace(/\D/g, '')
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = removeNonNumeric(phone)
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  }
  return phone
}

export function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
}

export function snakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
}

export function kebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

export function ellipsis(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength - 3) + '...'
}

export function highlight(text: string, query: string): string {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.match(urlRegex) || []
}

export function extractEmails(text: string): string[] {
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g
  return text.match(emailRegex) || []
}

export function randomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`
}

export function compareStrings(str1: string, str2: string, caseSensitive: boolean = false): number {
  const s1 = caseSensitive ? str1 : str1.toLowerCase()
  const s2 = caseSensitive ? str2 : str2.toLowerCase()
  return s1.localeCompare(s2, 'fr-FR')
}

export function similarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase()
  const s2 = str2.toLowerCase()
  
  if (s1 === s2) return 1
  if (s1.length === 0 || s2.length === 0) return 0
  
  const matrix: number[][] = []
  
  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  
  const maxLength = Math.max(s1.length, s2.length)
  const distance = matrix[s2.length][s1.length]
  
  return 1 - distance / maxLength
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/'
  }
  return str.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, (entity) => map[entity] || entity)
}

export function titleCase(str: string): string {
  const smallWords = ['de', 'du', 'des', 'le', 'la', 'les', 'un', 'une', 'et', 'ou', 'à', 'au', 'aux']
  
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !smallWords.includes(word)) {
        return capitalize(word)
      }
      return word
    })
    .join(' ')
}
