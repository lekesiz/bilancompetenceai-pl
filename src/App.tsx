import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import LandingPage from './components/LandingPage'
import ConsultantDashboard from './components/ConsultantDashboard'
import BeneficiaryDashboard from './components/BeneficiaryDashboard'
import AdminDashboard from './components/AdminDashboard'

export type UserRole = 'consultant' | 'beneficiary' | 'admin' | null

function App() {
  const [currentUser, setCurrentUser] = useKV<UserRole>('currentUser', null)
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing')

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('landing')
  }

  if (currentView === 'landing' || !currentUser) {
    return <LandingPage onLogin={handleLogin} />
  }

  if (currentUser === 'consultant') {
    return <ConsultantDashboard onLogout={handleLogout} />
  }

  if (currentUser === 'beneficiary') {
    return <BeneficiaryDashboard onLogout={handleLogout} />
  }

  if (currentUser === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return null
}

export default App
