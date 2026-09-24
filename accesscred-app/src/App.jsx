import { Navigate, Route, Routes } from 'react-router-dom'
import Shell from './components/Shell'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Verify from './pages/Verify'
import Opportunities from './pages/Opportunities'
import OpportunityDetail from './pages/OpportunityDetail'
import Applications from './pages/Applications'
import Learn from './pages/Learn'
import Messages from './pages/Messages'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<Shell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
