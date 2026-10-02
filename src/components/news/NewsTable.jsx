import StatusBadge from '../common/StatusBadge.jsx'

function NewsTable({ articles, categories, onDelete, onEdit, users }) {
  function getCategoryName(categoryId) {
    return (
      categories.find((category) => category.id === categoryId)?.name ||
      'Unknown category'
    )
  }

  function getCreatorName(userId) {
    return users.find((user) => user.id === userId)?.username || 'Unknown user'
  }

  return (
    <div className="table-scroll">
      <table className="data-table data-table--news">
        <caption className="sr-only">FUNews article records</caption>
        <thead>
          <tr>
            <th scope="col">Article</th>
            <th scope="col">Category</th>
            <th scope="col">Created by</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>
                <strong>{article.title}</strong>
                <span className="cell-description">{article.content}</span>
              </td>
              <td>{getCategoryName(article.categoryId)}</td>
              <td>{getCreatorName(article.createdBy)}</td>
              <td>
                <StatusBadge status={article.status} />
              </td>
              <td>
                <div className="table-actions">
                  <button
                    className="table-action"
                    type="button"
                    onClick={() => onEdit(article)}
                    aria-label={`Edit ${article.title}`}
                  >
                    Edit
                  </button>
                  <button
                    className="table-action table-action--danger"
                    type="button"
                    onClick={() => onDelete(article)}
                    aria-label={`Delete ${article.title}`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NewsTable
