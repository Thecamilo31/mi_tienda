import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Registro from './pages/Registro'
import './App.css'
import { getToken } from './api'

function App() {
  // Verificar si hay token guardado
  const isAuthenticated = Boolean(getToken())

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta raíz - redirige según autenticación */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <Navigate to="/home" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          
          {/* Ruta catch-all para URLs no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
