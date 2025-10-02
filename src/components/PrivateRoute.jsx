import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirigir al login, guardando la ubicación actual
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute