import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import api, { setToken } from '../api'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Llamar al backend
    setServerError('')
    setIsLoading(true)
    api.login(formData.email, formData.password)
      .then((data) => {
        // Backend should return a token and optionally user info
        // Example: { token: '...', user: { email: '...' } }
        if (data?.token) {
          setToken(data.token)
          localStorage.setItem('userEmail', data.user?.email || formData.email)
          localStorage.setItem('isAuthenticated', 'true')
          navigate('/home')
        } else {
          // If no token, treat as error
          setServerError('Respuesta inesperada del servidor')
        }
      })
      .catch((err) => {
        console.error('Login error:', err)
        if (err?.data?.message) setServerError(err.data.message)
        else if (err.message) setServerError(err.message)
        else setServerError('Error al conectar con el servidor')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">Accede a tu tienda online</p>
        {serverError && <div className="server-error">{serverError}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="tu@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="••••••••"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Conectando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta? <a href="#" onClick={(e) => e.preventDefault()}>Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login