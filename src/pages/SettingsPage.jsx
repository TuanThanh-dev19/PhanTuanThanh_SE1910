import useAuth from '../hooks/useAuth.js'

function SettingsPage() {
  const { currentUser } = useAuth()
  const roleLabel = currentUser.role === 1 ? 'Administrator' : 'Staff'

  return (
    <section
      className="page-section page-section--settings"
      aria-labelledby="settings-title"
    >
      <div className="page-heading">
        <div>
          <h1 id="settings-title">Settings</h1>
        </div>
      </div>

      <article className="settings-card" aria-labelledby="profile-title">
        <div className="settings-card__heading">
          <h2 id="profile-title">Administration profile</h2>
        </div>

        <dl className="settings-details">
          <div>
            <dt>Username</dt>
            <dd>{currentUser.username}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{roleLabel}</dd>
          </div>
        </dl>
      </article>
    </section>
  )
}

export default SettingsPage
