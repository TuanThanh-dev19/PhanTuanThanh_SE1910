import { useState } from 'react'
import { validateNewsForm } from '../../utils/newsValidators.js'
import Modal from '../common/Modal.jsx'

function NewsFormDialog({
  article,
  categories,
  creatorName,
  mode,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    categoryId: article?.categoryId || categories[0]?.id || '',
    status: String(article?.status ?? 1),
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

    const result = validateNewsForm(formData, categories)

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors)
      return
    }

    onSubmit(result.normalizedData)
  }

  return (
    <Modal labelledBy="news-form-title" onClose={onClose} size="wide">
      <div className="modal-card__header">
        <div>
          <p className="eyebrow">Article details</p>
          <h2 id="news-form-title">
            {isCreateMode ? 'Add News Article' : 'Edit News Article'}
          </h2>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close news form"
        >
          ×
        </button>
      </div>

      <form className="dialog-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="news-title-input">Article title</label>
          <input
            autoFocus
            id="news-title-input"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'news-title-error' : undefined}
            placeholder="Enter article title"
          />
          {errors.title && (
            <span className="field-error" id="news-title-error">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="news-content">Content</label>
          <textarea
            id="news-content"
            name="content"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            aria-invalid={Boolean(errors.content)}
            aria-describedby={errors.content ? 'news-content-error' : undefined}
            placeholder="Write the article content"
          />
          {errors.content && (
            <span className="field-error" id="news-content-error">
              {errors.content}
            </span>
          )}
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="news-category">Category</label>
            <select
              id="news-category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              aria-invalid={Boolean(errors.categoryId)}
              aria-describedby={
                errors.categoryId ? 'news-category-error' : undefined
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.status === 1 ? 'Active' : 'Inactive'})
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="field-error" id="news-category-error">
                {errors.categoryId}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="news-status">Status</label>
            <select
              id="news-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              aria-invalid={Boolean(errors.status)}
              aria-describedby={errors.status ? 'news-status-error' : undefined}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && (
              <span className="field-error" id="news-status-error">
                {errors.status}
              </span>
            )}
          </div>
        </div>

        <div className="creator-note">
          <span>Created by</span>
          <strong>{creatorName}</strong>
          <small>
            {isCreateMode
              ? 'The signed-in user will be stored as the creator.'
              : 'Updating an article does not change its original creator.'}
          </small>
        </div>

        <div className="modal-actions">
          <button className="secondary-action" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-action" type="submit">
            {isCreateMode ? 'Create Article' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default NewsFormDialog
