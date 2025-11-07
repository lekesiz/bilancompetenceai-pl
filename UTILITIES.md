# BilanCompetence.AI - Utility Libraries Documentation

This document provides an overview of the comprehensive utility libraries available in this project.

## 📚 Table of Contents

- [Validation](#validation)
- [Analytics](#analytics)
- [Constants](#constants)
- [Date Utilities](#date-utilities)
- [String Utilities](#string-utilities)
- [Notifications](#notifications)
- [React Hooks](#react-hooks)
- [Loading Skeletons](#loading-skeletons)

## 🔒 Validation

**Location:** `src/lib/validation.ts`

Provides Zod-based validation schemas and utility functions for data integrity.

### Key Features

```typescript
import { validateBilan, validateSkill, validateEmail, formatters } from '@/lib/validation'

// Validate entities
const result = validateBilan(bilanData)
if (result.success) {
  // Data is valid
}

// Validate email
const isValid = validateEmail('user@example.com')

// Format values
const formattedDate = formatters.date('2025-01-30')
const formattedCurrency = formatters.currency(1800)
const formattedDuration = formatters.duration(90)
```

### Available Validators

- `validateBilan()` - Complete bilan validation
- `validateSkill()` - Skill data validation
- `validateSession()` - Session data validation
- `validateMessage()` - Message content validation
- `validateSatisfactionSurvey()` - Survey validation
- `validateEmail()` - Email format
- `validatePhoneNumber()` - French phone numbers
- `validateROMECode()` - ROME code format
- `validateSIRET()` - SIRET number validation

## 📊 Analytics

**Location:** `src/lib/analytics.ts`

Business intelligence and metrics calculation engine.

### Usage

```typescript
import { 
  calculateBilanMetrics, 
  calculateRevenueMetrics, 
  calculateQualiopiCompliance,
  generateInsights 
} from '@/lib/analytics'

const metrics = calculateBilanMetrics(bilans)
// Returns: { totalBilans, activeBilans, completedBilans, averageDuration, completionRate, ... }

const revenue = calculateRevenueMetrics(bilans, 1800)
// Returns: { mrr, arr, averageRevenuePerBilan, projectedAnnualRevenue, growthRate }

const insights = generateInsights(bilans, surveys)
// Returns: ['✅ Excellent NPS...', '⚠️ Completion rate...']
```

### Available Functions

- `calculateBilanMetrics()` - Core bilan statistics
- `calculateSatisfactionMetrics()` - NPS and satisfaction
- `calculateRevenueMetrics()` - Financial metrics (ARR, MRR, growth)
- `calculateConsultantPerformance()` - Consultant KPIs
- `calculateQualiopiCompliance()` - Compliance scoring
- `predictChurnRisk()` - Churn prediction (low/medium/high)
- `calculateCohortAnalysis()` - Cohort retention analysis
- `generateInsights()` - Automated insight generation
- `calculateLTV()` - Customer lifetime value
- `calculateCAC()` - Customer acquisition cost

## 🎯 Constants

**Location:** `src/lib/constants.ts`

Centralized business rules and configuration.

### Usage

```typescript
import { 
  BILAN_CONSTRAINTS, 
  PRICING_TIERS, 
  BUSINESS_OBJECTIVES,
  QUALIOPI_INDICATORS 
} from '@/lib/constants'

// Access business rules
const minHours = BILAN_CONSTRAINTS.minimumHours // 24

// Access pricing
const professionalPrice = PRICING_TIERS.professional.price // 149

// Access objectives
const year1Target = BUSINESS_OBJECTIVES.year1.arr // 300000
```

### Available Constants

- `APP_CONFIG` - Application metadata
- `BILAN_CONSTRAINTS` - Bilan business rules (24h minimum, 3 phases)
- `QUALIOPI_INDICATORS` - All 8 Qualiopi indicators with descriptions
- `SATISFACTION_CRITERIA` - Survey rating criteria
- `PRICING_TIERS` - Starter, Professional, Enterprise tiers
- `CPF_CONFIG` - CPF financing rules (commission 7.5%)
- `MARKET_DATA` - French market statistics
- `BUSINESS_OBJECTIVES` - Year 1/3/5 targets
- `SKILL_CATEGORIES` - 10 skill categories
- `JOB_SECTORS` - 10 job sectors
- `SESSION_FORMATS` - Visio, Présentiel, Téléphone
- `VALIDATION_RULES` - Input validation constraints
- `URLS` - External service URLs
- `REGEX_PATTERNS` - Common regex patterns

## 📅 Date Utilities

**Location:** `src/lib/date-utils.ts`

Comprehensive date manipulation and formatting (French locale).

### Usage

```typescript
import { 
  formatDate, 
  formatRelativeTime, 
  diffInDays, 
  addMonths 
} from '@/lib/date-utils'

const formatted = formatDate('2025-01-30', 'long')
// "30 janvier 2025"

const relative = formatRelativeTime('2025-01-29T10:00:00')
// "Il y a 1 jour"

const days = diffInDays('2025-01-01', '2025-01-30')
// 29

const future = addMonths(new Date(), 3)
```

### Available Functions (35+)

**Formatting:**
- `formatDate()` - Format dates (short/long/full)
- `formatDateTime()` - Date with time
- `formatTime()` - Time only
- `formatRelativeTime()` - "Il y a X heures"
- `formatDuration()` - Minutes to "2h30"

**Calculations:**
- `addDays()`, `addMonths()` - Add time periods
- `diffInDays()`, `diffInMonths()` - Calculate differences
- `getBusinessDays()` - Count working days
- `calculateAge()` - Age from birthdate

**Checks:**
- `isToday()`, `isTomorrow()`, `isThisWeek()`, `isThisMonth()`
- `isPast()`, `isFuture()`

**Helpers:**
- `startOfDay()`, `endOfDay()`
- `startOfWeek()`, `endOfWeek()`
- `startOfMonth()`, `endOfMonth()`
- `getWeekNumber()`, `getQuarter()`
- `getMonthName()`, `getDayName()`

## 🔤 String Utilities

**Location:** `src/lib/string-utils.ts`

Text processing, formatting, and validation.

### Usage

```typescript
import { 
  capitalize, 
  slugify, 
  formatCurrency, 
  truncate, 
  pluralize 
} from '@/lib/string-utils'

const title = capitalize('bonjour') // "Bonjour"
const slug = slugify('Bilan de Compétences') // "bilan-de-competences"
const price = formatCurrency(1800) // "1 800,00 €"
const short = truncate('Long text...', 20) // "Long text..."
const text = pluralize(5, 'bilan') // "bilans"
```

### Available Functions (40+)

**Formatting:**
- `capitalize()`, `capitalizeWords()`, `titleCase()`
- `slugify()` - URL-friendly strings
- `truncate()`, `ellipsis()` - Shorten text
- `initials()` - Get user initials
- `formatNumber()`, `formatCurrency()`, `formatPercentage()`
- `formatPhoneNumber()` - Format French phones
- `formatFileSize()` - Bytes to "1.5 MB"

**Validation:**
- `isValidEmail()` - Email validation
- `maskEmail()`, `maskPhone()` - Privacy masking

**Processing:**
- `sanitizeHtml()`, `stripHtml()` - HTML handling
- `wordCount()`, `readingTime()` - Content analysis
- `removeAccents()`, `removeNonNumeric()`
- `camelCase()`, `snakeCase()`, `kebabCase()` - Case conversion

**Utilities:**
- `pluralize()` - Smart pluralization
- `highlight()` - Search highlighting
- `extractUrls()`, `extractEmails()` - Pattern extraction
- `similarity()` - Levenshtein distance
- `randomString()`, `generateId()` - ID generation

## 🔔 Notifications

**Location:** `src/lib/notifications.ts`

Standardized toast notifications using Sonner.

### Usage

```typescript
import { notifications } from '@/lib/notifications'

// Generic notifications
notifications.success('Opération réussie')
notifications.error('Une erreur est survenue')
notifications.warning('Attention')
notifications.info('Information')

// Domain-specific notifications
notifications.bilanCreated('Sophie Martin')
notifications.sessionScheduled('15 février 2025')
notifications.documentGenerated()
notifications.qualiopiCompliance(95)
notifications.copiedToClipboard()

// Promise-based
notifications.promise(
  saveData(),
  {
    loading: 'Enregistrement...',
    success: 'Enregistré',
    error: 'Erreur'
  }
)
```

### Available Notifications (30+)

**Success:**
- `bilanCreated()`, `bilanCompleted()`
- `sessionScheduled()`, `messageSent()`
- `documentGenerated()`, `surveySubmitted()`
- `dataExported()`, `settingsSaved()`
- `skillAdded()`, `recommendationsGenerated()`

**Errors:**
- `validationError()`, `networkError()`
- `unauthorized()`, `fileUploadError()`

**Warnings:**
- `unsavedChanges()`, `sessionExpired()`
- `rateLimit()`, `maintenanceMode()`

**Info:**
- `qualiopiCompliance()`, `cpfSubmitted()`
- `aiAnalyzing()`, `featureComingSoon()`

**Celebrations:**
- `birthday()`, `milestone()`

## 🎣 React Hooks

**Location:** `src/hooks/use-common.ts`

Reusable custom React hooks.

### Usage

```typescript
import { 
  useDebounce, 
  useLocalStorage, 
  useCopyToClipboard, 
  useMediaQuery 
} from '@/hooks'

// Debounce search input
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

// Local storage with state
const [theme, setTheme] = useLocalStorage('theme', 'light')

// Copy to clipboard
const { copy, copiedText } = useCopyToClipboard()
await copy('Text to copy')

// Media query
const isMobile = useMediaQuery('(max-width: 768px)')
```

### Available Hooks

- `useDebounce()` - Debounce values
- `useLocalStorage()` - Persistent local state
- `useMediaQuery()` - Responsive breakpoints
- `useOnClickOutside()` - Click outside detection
- `useKeyPress()` - Keyboard shortcuts
- `useAsync()` - Async operations with status
- `useCopyToClipboard()` - Clipboard operations
- `useIntersectionObserver()` - Visibility detection
- `useDocumentTitle()` - Dynamic page titles
- `useWindowSize()` - Window dimensions

## 💀 Loading Skeletons

**Location:** `src/components/LoadingSkeletons.tsx`

Pre-built skeleton loading states for all major views.

### Usage

```typescript
import { 
  DashboardSkeleton, 
  BilanListSkeleton, 
  CalendarSkeleton 
} from '@/components/LoadingSkeletons'

function MyComponent() {
  const [loading, setLoading] = useState(true)
  
  if (loading) return <DashboardSkeleton />
  
  return <Dashboard />
}
```

### Available Skeletons

- `DashboardSkeleton` - Main dashboard layout
- `BilanListSkeleton` - List of bilans
- `SkillsAssessmentSkeleton` - Skills evaluation form
- `MessagesSkeleton` - Chat interface
- `CalendarSkeleton` - Calendar view
- `AnalyticsSkeleton` - Analytics dashboard
- `TableSkeleton` - Data tables
- `ProfileSkeleton` - User profile
- `ContentSkeleton` - Generic content

## 🎨 Best Practices

### Import Patterns

```typescript
// ✅ Good - Import from barrel files
import { formatDate, capitalize } from '@/lib'
import { useDebounce, useCopyToClipboard } from '@/hooks'

// ❌ Avoid - Direct file imports
import { formatDate } from '@/lib/date-utils'
import { useDebounce } from '@/hooks/use-common'
```

### Validation Pattern

```typescript
import { validateBilan, notifications } from '@/lib'

function saveBilan(data: unknown) {
  const result = validateBilan(data)
  
  if (!result.success) {
    notifications.validationError(result.error.message)
    return
  }
  
  // Safe to use result.data (typed)
  await saveBilanToDatabase(result.data)
  notifications.bilanCreated(result.data.beneficiaryName)
}
```

### Analytics Pattern

```typescript
import { calculateBilanMetrics, calculateRevenueMetrics } from '@/lib'

function BusinessDashboard() {
  const [bilans] = useKV('bilans', [])
  
  const metrics = calculateBilanMetrics(bilans)
  const revenue = calculateRevenueMetrics(bilans, 1800)
  
  return (
    <div>
      <MetricCard label="ARR" value={formatCurrency(revenue.arr)} />
      <MetricCard label="Taux d'achèvement" value={`${metrics.completionRate}%`} />
    </div>
  )
}
```

## 📖 Additional Resources

- **Type Definitions:** All utilities are fully typed in `src/lib/types.ts`
- **Business Rules:** Centralized in `src/lib/constants.ts`
- **Error Handling:** Enhanced ErrorFallback in `src/ErrorFallback.tsx`
- **State Management:** Use `useKV` from `@github/spark/hooks` for persistence

## 🚀 Performance Tips

1. **Use debounce** for search inputs and expensive operations
2. **Memoize analytics** calculations with `useMemo`
3. **Show skeletons** instead of spinners for better perceived performance
4. **Batch notifications** - avoid showing too many at once
5. **Validate early** - validate user input before expensive operations
