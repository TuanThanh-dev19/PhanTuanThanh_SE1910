import { useState } from 'react'
import useAuth from '../hooks/useAuth.js'
import useSettings from '../hooks/useSettings.js'
import { validateSettingsForm } from '../utils/settingsValidators.js'

function SettingsPage() {
  const { currentUser } = useAuth()
  const { saveSettings, settings } = useSettings()
  const [formData, setFormData] = useState(settings)
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const roleLabel = currentUser.role === 1 ? 'Administrator' : 'Staff'

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({ ...previous, [name]: value }))

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }

    if (feedback) {
      setFeedback(null)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const result = validateSettingsForm(formData)

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors)
      setFeedback({
        type: 'error',
        message: 'Review the highlighted fields before saving.',
      })
      return
    }

    const { wasPersisted } = saveSettings(result.normalizedData)
    setFormData(result.normalizedData)
    setErrors({})
    setFeedback({
      type: wasPersisted ? 'success' : 'error',
      message: wasPersisted
        ? 'Settings saved successfully.'
        : 'Settings were applied for this tab but could not be saved locally.',
    })
  }

  return (
    <section
      className="page-section page-section--settings"
      aria-labelledby="settings-title"
    >
      <div className="page-heading">
        <div>
          <p className="eyebrow">Personal preferences</p>
          <h1 id="settings-title">Settings</h1>
        </div>
      </div>

      {feedback && (
        <div
          className={`page-feedback page-feedback--${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <div className="settings-grid">
          <article className="settings-card" aria-labelledby="profile-title">
            <div className="settings-card__heading">
              <h2 id="profile-title">Profile settings</h2>
            </div>

            <div className="settings-fields">
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="settings-username">Username</label>
                  <input
                    id="settings-username"
                    type="text"
                    value={currentUser.username}
                    readOnly
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="settings-role">Role</label>
                  <input
                    id="settings-role"
                    type="text"
                    value={roleLabel}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="settings-display-name">Display name</label>
                <input
                  id="settings-display-name"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleChange}
                  maxLength="60"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.displayName)}
                  aria-describedby={
                    errors.displayName ? 'settings-display-name-error' : undefined
                  }
                  placeholder="Enter a display name"
                />
                {errors.displayName && (
                  <span
                    className="field-error"
                    id="settings-display-name-error"
                  >
                    {errors.displayName}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="settings-email">Email</label>
                <input
                  id="settings-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'settings-email-error' : undefined
                  }
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <span className="field-error" id="settings-email-error">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="settings-card__actions">
              <button className="primary-action" type="submit">
                Save changes
              </button>
            </div>
          </article>
        </div>
      </form>
    </section>
  )
}

export default SettingsPage
