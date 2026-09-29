import { useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth.js'

function DashboardPage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="brand-lockup brand-lockup--dark">
          <span className="brand-mark" aria-hidden="true">
            FN
          </span>
          <span>FUNews</span>
        </div>

        <div className="dashboard-header__actions">
          <span className="current-user">{currentUser.displayName}</span>
          <button className="secondary-button" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <section className="dashboard-content" aria-labelledby="dashboard-title">
        <p className="eyebrow">Authentication milestone</p>
        <h1 id="dashboard-title">Welcome, {currentUser.username}</h1>
        <p className="dashboard-lead">
          Login, session restoration, protected routing and logout are ready.
          The complete admin layout will be added in the next milestone.
        </p>

        <div className="milestone-card">
          <span className="milestone-card__icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <h2>Secure area reached</h2>
            <p>
              This page is only rendered after the mock Admin account has been
              authenticated.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DashboardPage
