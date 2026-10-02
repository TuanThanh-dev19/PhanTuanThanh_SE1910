import useAuth from '../hooks/useAuth.js'

function SettingsPage() {
  const { currentUser } = useAuth()
  const roleLabel = currentUser.role === 1 ? 'Admin' : 'Staff'
  const statusLabel = currentUser.status === 1 ? 'Active' : 'Inactive'

  return (
    <section className="page-section" aria-labelledby="settings-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace configuration</p>
          <h1 id="settings-title">Settings</h1>
          <p>Review the current mock profile and local persistence behavior.</p>
        </div>
        <span className="status-chip">Assignment settings</span>
      </div>

      <div className="module-grid" aria-label="Assignment settings summary">
        <article className="module-card">
          <div className="module-card__topline">
            <span className="module-card__icon" aria-hidden="true">
              PR
            </span>
            <span className="role-badge">{roleLabel}</span>
          </div>
          <div>
            <h2>Current profile</h2>
            <p>
              Signed in as <strong>{currentUser.username}</strong>. This account
              uses mock credentials for Assignment 01.
            </p>
          </div>
          <span className="module-card__status">{statusLabel} account</span>
        </article>

        <article className="module-card">
          <div className="module-card__topline">
            <span className="module-card__icon" aria-hidden="true">
              LS
            </span>
            <span className="read-badge">Local</span>
          </div>
          <div>
            <h2>Data persistence</h2>
            <p>
              Category, News, Users and the current session are stored in
              localStorage so the assignment state can survive a page reload.
            </p>
          </div>
          <span className="module-card__status">No backend or database</span>
        </article>
      </div>
    </section>
  )
}

export default SettingsPage
