import StatusBadge from '../common/StatusBadge.jsx'

function CategoryTable({ categories, news, onDelete, onEdit }) {
  function getReferenceCount(categoryId) {
    return news.filter((article) => article.categoryId === categoryId).length
  }

  return (
    <div className="table-scroll">
      <table className="data-table data-table--categories">
        <caption className="sr-only">FUNews category records</caption>
        <thead>
          <tr>
            <th scope="col">Category name</th>
            <th scope="col">Status</th>
            <th scope="col">News usage</th>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const referenceCount = getReferenceCount(category.id)

            return (
              <tr key={category.id}>
                <td>
                  <strong>{category.name}</strong>
                  <code className="record-id">{category.id}</code>
                </td>
                <td>
                  <StatusBadge status={category.status} />
                </td>
                <td>
                  {referenceCount === 0
                    ? 'Not in use'
                    : `${referenceCount} article${referenceCount > 1 ? 's' : ''}`}
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      className="table-action"
                      type="button"
                      onClick={() => onEdit(category)}
                      aria-label={`Edit ${category.name}`}
                    >
                      Edit
                    </button>
                    <button
                      className="table-action table-action--danger"
                      type="button"
                      onClick={() => onDelete(category)}
                      aria-label={`Delete ${category.name}`}
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

export default CategoryTable
