import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Ships from './pages/Ships'
import Registration from './pages/Registration'
import Declarations from './pages/Declarations'
import HistoryPage from './pages/HistoryPage'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/SettingsPage'

// React Joyride is intentionally disabled for the current UI stabilization phase.
// PageTour and tour definitions remain in the project history for later reactivation.
export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/emeliyyatlar" element={<Navigate to="/gemiler" replace/>}/>
    <Route path="/gemiler" element={<Ships/>}/>
    <Route path="/qeydiyyat" element={<Registration/>}/>
    {/* <Route path="/beyannameler" element={<Declarations/>}/> */}
    <Route path="/beyannameler" element={<Declarations/>}/>
    <Route path="/tarixce" element={<HistoryPage/>}/>
    <Route path="/analitika" element={<Analytics/>}/>
    <Route path="/parametrler" element={<SettingsPage/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></Layout>
}
