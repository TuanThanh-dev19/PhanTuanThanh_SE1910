import { useState } from 'react'
import CategoryFormDialog from '../components/category/CategoryFormDialog.jsx'
import CategoryTable from '../components/category/CategoryTable.jsx'
import ConfirmDialog from '../components/common/ConfirmDialog.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import useData from '../hooks/useData.js'

function CategoriesPage() {
  const {
    categories,
    news,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useData()
  const [keyword, setKeyword] = useState('')
  const [formState, setFormState] = useState(null)
  const [categoryPendingDelete, setCategoryPendingDelete] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const normalizedKeyword = keyword.trim().toLowerCase()
  const displayedCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(normalizedKeyword),
  )
  const deleteReferenceCount = categoryPendingDelete
    ? news.filter(
        (article) => article.categoryId === categoryPendingDelete.id,
      ).length
    : 0

  function openCreateForm() {
    setFeedback(null)
    setFormState({ mode: 'create', category: null })
  }

  function openUpdateForm(category) {
    setFeedback(null)
    setFormState({ mode: 'update', category })
  }

  function closeForm() {
    setFormState(null)
  }

  function handleSave(categoryData) {
    if (formState.mode === 'create') {
      const createdCategory = createCategory(categoryData)
      setFeedback({
        type: 'success',
        message: `${createdCategory.name} was created successfully.`,
      })
    } else {
      updateCategory(formState.category.id, categoryData)
      setFeedback({
        type: 'success',
        message: `${categoryData.name} was updated successfully.`,
      })
    }

    closeForm()
  }

  function requestDelete(category) {
    setFeedback(null)
    setCategoryPendingDelete(category)
  }

  function closeDeleteDialog() {
    setCategoryPendingDelete(null)
  }

  function confirmDelete() {
    const result = deleteCategory(categoryPendingDelete.id)

    if (!result.success) {
      setFeedback({
        type: 'error',
        message: `${categoryPendingDelete.name} is still used by ${result.referenceCount} news article${result.referenceCount > 1 ? 's' : ''}.`,
      })
      closeDeleteDialog()
      return
    }

    setFeedback({
      type: 'success',
      message: `${categoryPendingDelete.name} was deleted successfully.`,
    })
    closeDeleteDialog()
  }

  return (
    <section className="page-section" aria-labelledby="categories-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Content structure</p>
          <h1 id="categories-title">Category</h1>
          <p>Create, update, search and safely remove publishing categories.</p>
        </div>
        <span className="status-chip">{categories.length} records</span>
      </div>

      <div className="management-toolbar">
        <SearchBar
          id="category-search"
          label="Search categories"
          value={keyword}
          onChange={setKeyword}
          onClear={() => setKeyword('')}
          placeholder="Search by category name"
        />
        <button
          className="primary-button primary-button--compact"
          type="button"
          onClick={openCreateForm}
        >
          + Add Category
        </button>
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

      <div className="data-panel">
        <div className="data-panel__heading">
          <div>
            <h2>Category list</h2>
            <p>
              Showing {displayedCategories.length} of {categories.length} records.
            </p>
          </div>
          <span className="read-badge">CRUD enabled</span>
        </div>

        {categories.length === 0 ? (
          <EmptyState
            title="No categories yet"
            description="Create the first category to begin organizing news articles."
            action={
              <button
                className="primary-action"
                type="button"
                onClick={openCreateForm}
              >
                Add Category
              </button>
            }
          />
        ) : displayedCategories.length === 0 ? (
          <EmptyState
            title="No matching categories"
            description={`No category name matches “${keyword.trim()}”.`}
            action={
              <button
                className="secondary-action"
                type="button"
                onClick={() => setKeyword('')}
              >
                Clear search
              </button>
            }
          />
        ) : (
          <CategoryTable
            categories={displayedCategories}
            news={news}
            onEdit={openUpdateForm}
            onDelete={requestDelete}
          />
        )}
      </div>

      {formState && (
        <CategoryFormDialog
          key={`${formState.mode}-${formState.category?.id || 'new'}`}
          categories={categories}
          category={formState.category}
          mode={formState.mode}
          onClose={closeForm}
          onSubmit={handleSave}
        />
      )}

      {categoryPendingDelete && (
        <ConfirmDialog
          title={
            deleteReferenceCount > 0
              ? 'Category is in use'
              : `Delete “${categoryPendingDelete.name}”?`
          }
          description={
            deleteReferenceCount > 0
              ? `${categoryPendingDelete.name} cannot be deleted because ${deleteReferenceCount} news ${deleteReferenceCount > 1 ? 'articles reference' : 'article references'} it.`
              : 'This action removes the category from local data and cannot be undone.'
          }
          confirmLabel="Delete Category"
          isBlocked={deleteReferenceCount > 0}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDelete}
        />
      )}
    </section>
  )
}

export default CategoriesPage
