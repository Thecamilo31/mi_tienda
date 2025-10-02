import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import api, { setToken } from '../api'

const Registro = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El email no es válido'
    if (!formData.password) newErrors.password = 'La contraseña es requerida'
    else if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    if (formData.password !== formData.confirm) newErrors.confirm = 'Las contraseñas no coinciden'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setServerError('')
    setIsLoading(true)
    api.register(formData.email, formData.password, formData.name)
      .then((data) => {
        if (data?.token) {
          setToken(data.token)
          localStorage.setItem('userEmail', data.user?.email || formData.email)
          localStorage.setItem('isAuthenticated', 'true')
          navigate('/home')
        } else {
          setServerError('Respuesta inesperada del servidor')
        }
      })
      .catch((err) => {
        console.error('Registro error:', err)
        if (err?.data?.message) setServerError(err.data.message)
        else if (err.message) setServerError(err.message)
        else setServerError('Error al conectar con el servidor')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Registro</h2>
        <p className="login-subtitle">Crea tu cuenta</p>
        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirmar contraseña:</label>
            <input id="confirm" name="confirm" type="password" value={formData.confirm} onChange={handleChange} />
            {errors.confirm && <span className="error-message">{errors.confirm}</span>}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Registro
