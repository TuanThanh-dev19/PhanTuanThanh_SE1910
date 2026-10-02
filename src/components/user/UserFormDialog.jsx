import { useState } from 'react'
import { validateUserForm } from '../../utils/userValidators.js'
import Modal from '../common/Modal.jsx'

function UserFormDialog({ mode, onClose, onSubmit, user, users }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    mockPassword: user?.mockPassword || '',
    role: String(user?.role ?? 2),
    status: String(user?.status ?? 1),
  })
  const [errors, setErrors] = useState({})
  const isCreateMode = mode === 'create'

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({ ...previous, [name]: value }))

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const result = validateUserForm(formData, users, user?.id)

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors)
      return
    }

    onSubmit(result.normalizedData)
  }

  return (
    <Modal labelledBy="user-form-title" onClose={onClose}>
      <div className="modal-card__header">
        <div>
          <p className="eyebrow">Account details</p>
          <h2 id="user-form-title">
            {isCreateMode ? 'Add User' : 'Edit User'}
          </h2>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close user form"
        >
          ×
        </button>
      </div>

      <form className="dialog-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="user-username">Username</label>
          <input
            autoFocus
            id="user-username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'user-username-error' : undefined}
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="field-error" id="user-username-error">
              {errors.username}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="user-password">Mock password</label>
          <input
            id="user-password"
            name="mockPassword"
            type="password"
            value={formData.mockPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.mockPassword)}
            aria-describedby={
              errors.mockPassword ? 'user-password-error' : undefined
            }
            placeholder="Enter mock password"
          />
          {errors.mockPassword && (
            <span className="field-error" id="user-password-error">
              {errors.mockPassword}
            </span>
          )}
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="user-role">Role</label>
            <select
              id="user-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? 'user-role-error' : undefined}
            >
              <option value="1">Admin</option>
              <option value="2">Staff</option>
            </select>
            {errors.role && (
              <span className="field-error" id="user-role-error">
                {errors.role}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="user-status">Status</label>
            <select
              id="user-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              aria-invalid={Boolean(errors.status)}
              aria-describedby={errors.status ? 'user-status-error' : undefined}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && (
              <span className="field-error" id="user-status-error">
                {errors.status}
              </span>
            )}
          </div>
        </div>

        <div className="creator-note">
          <span>Assignment data</span>
          <strong>Mock credentials only</strong>
          <small>
            The password is stored only for this local assignment and is not a
            production authentication mechanism.
          </small>
        </div>

        <div className="modal-actions">
          <button className="secondary-action" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-action" type="submit">
            {isCreateMode ? 'Create User' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default UserFormDialog
