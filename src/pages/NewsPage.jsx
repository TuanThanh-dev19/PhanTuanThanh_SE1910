import StatusBadge from '../components/common/StatusBadge.jsx'
import useData from '../hooks/useData.js'

function NewsPage() {
  const { categories, news, users } = useData()

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
    <section className="page-section" aria-labelledby="news-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Editorial workspace</p>
          <h1 id="news-title">News</h1>
          <p>Review articles together with their Category and creator relations.</p>
        </div>
        <span className="status-chip">{news.length} records</span>
      </div>

      <div className="data-panel">
        <div className="data-panel__heading">
          <div>
            <h2>News list</h2>
            <p>Related names are derived from categoryId and createdBy.</p>
          </div>
          <span className="read-badge">Read mode</span>
        </div>

        <div className="table-scroll">
          <table className="data-table data-table--news">
            <caption className="sr-only">FUNews article records</caption>
            <thead>
              <tr>
                <th scope="col">Article</th>
                <th scope="col">Category</th>
                <th scope="col">Created by</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {news.map((article) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default NewsPage
