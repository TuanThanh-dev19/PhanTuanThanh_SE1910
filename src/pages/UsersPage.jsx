import StatusBadge from '../components/common/StatusBadge.jsx'
import useData from '../hooks/useData.js'

function UsersPage() {
  const { users } = useData()

  return (
    <section className="page-section" aria-labelledby="users-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Account administration</p>
          <h1 id="users-title">Users</h1>
          <p>Review mock Admin and Staff accounts used by the assignment.</p>
        </div>
        <span className="status-chip">{users.length} records</span>
      </div>

      <div className="data-panel">
        <div className="data-panel__heading">
          <div>
            <h2>User list</h2>
            <p>Passwords remain internal and are never rendered in this table.</p>
          </div>
          <span className="read-badge">Read mode</span>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <caption className="sr-only">FUNews user account records</caption>
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Record ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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
                    <code className="record-id">{user.id}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default UsersPage
