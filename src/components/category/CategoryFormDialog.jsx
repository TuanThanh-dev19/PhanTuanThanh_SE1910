import { useState } from 'react'
import { validateCategoryForm } from '../../utils/categoryValidators.js'
import Modal from '../common/Modal.jsx'

function CategoryFormDialog({ categories, category, mode, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    status: String(category?.status ?? 1),
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

    const result = validateCategoryForm(formData, categories, category?.id)

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors)
      return
    }

    onSubmit(result.normalizedData)
  }

  return (
    <Modal labelledBy="category-form-title" onClose={onClose}>
      <div className="modal-card__header">
        <div>
          <p className="eyebrow">Category details</p>
          <h2 id="category-form-title">
            {isCreateMode ? 'Add Category' : 'Edit Category'}
          </h2>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close category form"
        >
          ×
        </button>
      </div>

      <form className="dialog-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="category-name">Category name</label>
          <input
            autoFocus
            id="category-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'category-name-error' : undefined}
            placeholder="Enter category name"
          />
          {errors.name && (
            <span className="field-error" id="category-name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="category-status">Status</label>
          <select
            id="category-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            aria-invalid={Boolean(errors.status)}
            aria-describedby={errors.status ? 'category-status-error' : undefined}
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          {errors.status && (
            <span className="field-error" id="category-status-error">
              {errors.status}
            </span>
          )}
        </div>

        <div className="modal-actions">
          <button className="secondary-action" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-action" type="submit">
            {isCreateMode ? 'Create Category' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CategoryFormDialog
