import { useNavigate } from 'react-router-dom'
import './Home.css'
import { clearToken } from '../api'

const Home = () => {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail')

  const handleLogout = () => {
    clearToken()
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Mi Tienda Online</h1>
          <div className="user-info">
            <span>Bienvenido, {userEmail}</span>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="welcome-section">
          <h2>¡Bienvenido a tu tienda!</h2>
          <p>Aquí podrás gestionar tus productos, pedidos y clientes.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Productos</h3>
            <p>Gestiona tu catálogo de productos</p>
            <button className="card-button">Ver Productos</button>
          </div>

          <div className="dashboard-card">
            <h3>Pedidos</h3>
            <p>Administra los pedidos de tus clientes</p>
            <button className="card-button">Ver Pedidos</button>
          </div>

          <div className="dashboard-card">
            <h3>Clientes</h3>
            <p>Gestiona tu base de clientes</p>
            <button className="card-button">Ver Clientes</button>
          </div>

          <div className="dashboard-card">
            <h3>Configuración</h3>
            <p>Configura tu tienda</p>
            <button className="card-button">Configurar</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home