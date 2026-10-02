import { useState } from 'react'
import ConfirmDialog from '../components/common/ConfirmDialog.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import NewsFormDialog from '../components/news/NewsFormDialog.jsx'
import NewsTable from '../components/news/NewsTable.jsx'
import useAuth from '../hooks/useAuth.js'
import useData from '../hooks/useData.js'

function NewsPage() {
  const { currentUser } = useAuth()
  const {
    categories,
    news,
    users,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
  } = useData()
  const [keyword, setKeyword] = useState('')
  const [formState, setFormState] = useState(null)
  const [articlePendingDelete, setArticlePendingDelete] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const normalizedKeyword = keyword.trim().toLowerCase()
  const displayedArticles = news.filter((article) => {
    const normalizedTitle = article.title.toLowerCase()
    const normalizedContent = article.content.toLowerCase()

    return (
      normalizedTitle.includes(normalizedKeyword) ||
      normalizedContent.includes(normalizedKeyword)
    )
  })

  function getCreatorName(userId) {
    return users.find((user) => user.id === userId)?.username || 'Unknown user'
  }

  function openCreateForm() {
    setFeedback(null)

    if (categories.length === 0) {
      setFeedback({
        type: 'error',
        message: 'Create a category before adding a news article.',
      })
      return
    }

    setFormState({ mode: 'create', article: null })
  }

  function openUpdateForm(article) {
    setFeedback(null)
    setFormState({ mode: 'update', article })
  }

  function closeForm() {
    setFormState(null)
  }

  function handleSave(articleData) {
    if (formState.mode === 'create') {
      const createdArticle = createNewsArticle({
        ...articleData,
        createdBy: currentUser.id,
      })
      setFeedback({
        type: 'success',
        message: `${createdArticle.title} was created successfully.`,
      })
    } else {
      updateNewsArticle(formState.article.id, articleData)
      setFeedback({
        type: 'success',
        message: `${articleData.title} was updated successfully.`,
      })
    }

    closeForm()
  }

  function requestDelete(article) {
    setFeedback(null)
    setArticlePendingDelete(article)
  }

  function closeDeleteDialog() {
    setArticlePendingDelete(null)
  }

  function confirmDelete() {
    deleteNewsArticle(articlePendingDelete.id)
    setFeedback({
      type: 'success',
      message: `${articlePendingDelete.title} was deleted successfully.`,
    })
    closeDeleteDialog()
  }

  let formCreatorName = ''

  if (formState?.mode === 'create') {
    formCreatorName = currentUser.username
  } else if (formState?.mode === 'update') {
    formCreatorName = getCreatorName(formState.article.createdBy)
  }

  return (
    <section className="page-section" aria-labelledby="news-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Editorial workspace</p>
          <h1 id="news-title">News</h1>
          <p>Create, update, search and maintain publishing relationships.</p>
        </div>
        <span className="status-chip">{news.length} records</span>
      </div>

      <div className="management-toolbar">
        <SearchBar
          id="news-search"
          label="Search news"
          value={keyword}
          onChange={setKeyword}
          onClear={() => setKeyword('')}
          placeholder="Search by title or content"
        />
        <button
          className="primary-button primary-button--compact"
          type="button"
          onClick={openCreateForm}
        >
          + Add News Article
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
            <h2>News list</h2>
            <p>
              Showing {displayedArticles.length} of {news.length} records.
            </p>
          </div>
          <span className="read-badge">CRUD enabled</span>
        </div>

        {news.length === 0 ? (
          <EmptyState
            title="No news articles yet"
            description="Create the first article to begin building the newsroom."
            action={
              <button
                className="primary-action"
                type="button"
                onClick={openCreateForm}
              >
                Add News Article
              </button>
            }
          />
        ) : displayedArticles.length === 0 ? (
          <EmptyState
            title="No matching news"
            description={`No article title or content matches “${keyword.trim()}”.`}
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
          <NewsTable
            articles={displayedArticles}
            categories={categories}
            users={users}
            onEdit={openUpdateForm}
            onDelete={requestDelete}
          />
        )}
      </div>

      {formState && (
        <NewsFormDialog
          key={`${formState.mode}-${formState.article?.id || 'new'}`}
          article={formState.article}
          categories={categories}
          creatorName={formCreatorName}
          mode={formState.mode}
          onClose={closeForm}
          onSubmit={handleSave}
        />
      )}

      {articlePendingDelete && (
        <ConfirmDialog
          title={`Delete “${articlePendingDelete.title}”?`}
          description="This action removes the article from local data and cannot be undone."
          confirmLabel="Delete Article"
          onCancel={closeDeleteDialog}
          onConfirm={confirmDelete}
        />
      )}
    </section>
  )
}

export default NewsPage
