import { Navigate, useLocation } from 'react-router-dom'

const AUTH_KEY = 'bwc_internal_auth'

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export function signOut() {
  sessionStorage.removeItem(AUTH_KEY)
}

export default function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!isAuthenticated()) {
    // Pass the attempted path so login can redirect back after success
    return <Navigate to="/internal/login" state={{ from: location.pathname }} replace />
  }

  return children
}