import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import InternalLayout from './layouts/InternalLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Woodworking from './pages/Woodworking'
import Events from './pages/Events'
import About from './pages/About'
import Contact from './pages/Contact'
import Tyler from './pages/resume/Tyler'
import Akanksha from './pages/resume/Akanksha'
import Login from './pages/internal/Login'
import Calculator from './pages/internal/Calculator'
import WoodRates from './pages/internal/WoodRates'
import Settings from './pages/internal/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — wrapped in Navbar + Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/woodworking" element={<Woodworking />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume/tyler" element={<Tyler />} />
          <Route path="/resume/akanksha" element={<Akanksha />} />
        </Route>

        {/* Internal login — standalone, no nav, no auth guard */}
        <Route path="/internal/login" element={<Login />} />

        {/* Internal tools — minimal nav, password-protected */}
        <Route
          element={
            <ProtectedRoute>
              <InternalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/internal/calculator" element={<Calculator />} />
          <Route path="/internal/wood-rates" element={<WoodRates />} />
          <Route path="/internal/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}