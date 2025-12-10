import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DMSDashboard from './pages/DMSDashboard'
import DocumentSubmission from './pages/DocumentSubmission'
import DocumentLibrary from './pages/DocumentLibrary'
import AuditDashboard from './pages/AuditDashboard'
import AuditManagement from './pages/AuditManagement'
import CCARTracking from './pages/CCARTracking'
import AuditTrail from './pages/AuditTrail'
import UserManagement from './pages/UserManagement'
import Settings from './pages/Settings'
import HelpSupport from './pages/HelpSupport'
import './index.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dms" replace />} />
          {/* DMS 模組 */}
          <Route path="dms" element={<DMSDashboard />} />
          <Route path="dms/submission" element={<DocumentSubmission />} />
          <Route path="dms/library" element={<DocumentLibrary />} />
          {/* 稽核模組 */}
          <Route path="audit" element={<AuditDashboard />} />
          <Route path="audit/management" element={<AuditManagement />} />
          <Route path="audit/ccar" element={<CCARTracking />} />
          <Route path="audit/trail" element={<AuditTrail />} />
          {/* 系統模組 */}
          <Route path="system/users" element={<UserManagement />} />
          <Route path="system/settings" element={<Settings />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
