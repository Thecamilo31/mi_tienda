import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../api'

const PrivateRoute = ({ children }) => {
  const token = getToken()
  const location = useLocation()

  if (!token) {
    // Redirigir al login, guardando la ubicación actual
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute