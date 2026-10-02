import { useState } from 'react'
import ConfirmDialog from '../components/common/ConfirmDialog.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import SearchBar from '../components/common/SearchBar.jsx'
import UserFormDialog from '../components/user/UserFormDialog.jsx'
import UserTable from '../components/user/UserTable.jsx'
import useAuth from '../hooks/useAuth.js'
import useData from '../hooks/useData.js'

function UsersPage() {
  const { currentUser } = useAuth()
  const { createUser, deleteUser, news, updateUser, users } = useData()
  const [keyword, setKeyword] = useState('')
  const [formState, setFormState] = useState(null)
  const [userPendingDelete, setUserPendingDelete] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const normalizedKeyword = keyword.trim().toLowerCase()
  const displayedUsers = users.filter((user) =>
    user.username.toLowerCase().includes(normalizedKeyword),
  )
  const deleteReferenceCount = userPendingDelete
    ? news.filter((article) => article.createdBy === userPendingDelete.id).length
    : 0
  const isDeletingCurrentUser = userPendingDelete?.id === currentUser.id
  const isDeleteBlocked = isDeletingCurrentUser || deleteReferenceCount > 0

  function openCreateForm() {
    setFeedback(null)
    setFormState({ mode: 'create', user: null })
  }

  function openUpdateForm(user) {
    setFeedback(null)
    setFormState({ mode: 'update', user })
  }

  function closeForm() {
    setFormState(null)
  }

  function handleSave(userData) {
    if (formState.mode === 'create') {
      const createdUser = createUser(userData)
      setFeedback({
        type: 'success',
        message: `${createdUser.username} was created successfully.`,
      })
    } else {
      updateUser(formState.user.id, userData)
      setFeedback({
        type: 'success',
        message: `${userData.username} was updated successfully.`,
      })
    }

    closeForm()
  }

  function requestDelete(user) {
    setFeedback(null)
    setUserPendingDelete(user)
  }

  function closeDeleteDialog() {
    setUserPendingDelete(null)
  }

  function confirmDelete() {
    const result = deleteUser(userPendingDelete.id, currentUser.id)

    if (!result.success) {
      const message =
        result.reason === 'current-user'
          ? 'The signed-in account cannot be deleted.'
          : `${userPendingDelete.username} is still referenced by ${result.referenceCount} news article${result.referenceCount > 1 ? 's' : ''}.`

      setFeedback({ type: 'error', message })
      closeDeleteDialog()
      return
    }

    setFeedback({
      type: 'success',
      message: `${userPendingDelete.username} was deleted successfully.`,
    })
    closeDeleteDialog()
  }

  function getDeleteDialogContent() {
    if (isDeletingCurrentUser) {
      return {
        title: 'Signed-in account cannot be deleted',
        description:
          'Log in with another administrator before deleting this account.',
      }
    }

    if (deleteReferenceCount > 0) {
      return {
        title: 'User is referenced by News',
        description: `${userPendingDelete.username} cannot be deleted because ${deleteReferenceCount} news article${deleteReferenceCount > 1 ? 's reference' : ' references'} this account as creator.`,
      }
    }

    return {
      title: `Delete “${userPendingDelete.username}”?`,
      description:
        'This action removes the user from local data and cannot be undone.',
    }
  }

  const deleteDialogContent = userPendingDelete
    ? getDeleteDialogContent()
    : null

  return (
    <section
      className="page-section page-section--users"
      aria-labelledby="users-title"
    >
      <div className="page-heading">
        <div>
          <h1 id="users-title">Users</h1>
        </div>
      </div>

      <div className="management-toolbar">
        <SearchBar
          id="user-search"
          label="Search users"
          value={keyword}
          onChange={setKeyword}
          onClear={() => setKeyword('')}
          placeholder="Search by username"
        />
        <button
          className="primary-button primary-button--compact"
          type="button"
          onClick={openCreateForm}
        >
          + Add User
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
            <h2>User list</h2>
            <p>
              Showing {displayedUsers.length} of {users.length} records.
            </p>
          </div>
        </div>

        {users.length === 0 ? (
          <EmptyState
            title="No users yet"
            description="Create the first mock user account."
            action={
              <button
                className="primary-action"
                type="button"
                onClick={openCreateForm}
              >
                Add User
              </button>
            }
          />
        ) : displayedUsers.length === 0 ? (
          <EmptyState
            title="No matching users"
            description={`No username matches “${keyword.trim()}”.`}
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
          <UserTable
            users={displayedUsers}
            news={news}
            onEdit={openUpdateForm}
            onDelete={requestDelete}
          />
        )}
      </div>

      {formState && (
        <UserFormDialog
          key={`${formState.mode}-${formState.user?.id || 'new'}`}
          mode={formState.mode}
          user={formState.user}
          users={users}
          onClose={closeForm}
          onSubmit={handleSave}
        />
      )}

      {userPendingDelete && (
        <ConfirmDialog
          title={deleteDialogContent.title}
          description={deleteDialogContent.description}
          confirmLabel="Delete User"
          isBlocked={isDeleteBlocked}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDelete}
        />
      )}
    </section>
  )
}

export default UsersPage
