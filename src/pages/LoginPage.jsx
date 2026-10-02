import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth.js'
import funewsLogo from '../assets/funews-logo.png'

const INITIAL_FORM = {
  username: '',
  password: '',
}

function validateLoginForm(formData) {
  const errors = {}

  if (!formData.username.trim()) {
    errors.username = 'Username is required.'
  }

  if (!formData.password) {
    errors.password = 'Password is required.'
  }

  return errors
}

function LoginPage() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [authenticationError, setAuthenticationError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }))
    }

    if (authenticationError) {
      setAuthenticationError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateLoginForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setAuthenticationError('')
      return
    }

    const result = login(formData.username.trim(), formData.password)

    if (!result.success) {
      setAuthenticationError(result.message)
      return
    }

    const destination = location.state?.from || '/dashboard'
    navigate(destination, { replace: true })
  }

  return (
    <main className="login-page">
      <section className="login-intro" aria-labelledby="system-name">
        <div className="brand-lockup">
          <img className="brand-logo" src={funewsLogo} alt="FUNews logo" />
          <span>FUNews</span>
        </div>
        <div className="login-intro__content">
          <h1 id="system-name">FUNews Management System</h1>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <div className="login-card__heading">
            <p className="eyebrow">Administrator access</p>
            <h2 id="login-title">Welcome back</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? 'username-error' : undefined}
                placeholder="Enter your username"
              />
              {errors.username && (
                <span className="field-error" id="username-error">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="field-error" id="password-error">
                  {errors.password}
                </span>
              )}
            </div>

            {authenticationError && (
              <div className="form-alert" role="alert">
                {authenticationError}
              </div>
            )}

            <button className="primary-button" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
