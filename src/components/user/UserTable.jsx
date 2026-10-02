import StatusBadge from '../common/StatusBadge.jsx'

function UserTable({ news, onDelete, onEdit, users }) {
  function getReferenceCount(userId) {
    return news.filter((article) => article.createdBy === userId).length
  }

  return (
    <div className="table-scroll">
      <table className="data-table data-table--users">
        <caption className="sr-only">FUNews user account records</caption>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">News created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const referenceCount = getReferenceCount(user.id)

            return (
              <tr key={user.id}>
                <td>
                  <strong>{user.username}</strong>
                </td>
                <td>
                  <span className="role-badge">
                    {user.role === 1 ? 'Admin' : 'Staff'}
                  </span>
                </td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td>
                  {referenceCount === 0
                    ? 'No articles'
                    : `${referenceCount} article${referenceCount > 1 ? 's' : ''}`}
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      className="table-action"
                      type="button"
                      onClick={() => onEdit(user)}
                      aria-label={`Edit ${user.username}`}
                    >
                      Edit
                    </button>
                    <button
                      className="table-action table-action--danger"
                      type="button"
                      onClick={() => onDelete(user)}
                      aria-label={`Delete ${user.username}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
