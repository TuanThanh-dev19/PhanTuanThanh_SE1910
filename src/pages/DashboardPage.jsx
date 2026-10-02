import useData from '../hooks/useData.js'

function DashboardPage() {
  const { categories, news, users } = useData()
  const modules = [
    {
      name: 'Category',
      description: 'Organize articles into clear publishing topics.',
      shortLabel: 'CA',
      total: categories.length,
      active: categories.filter((category) => category.status === 1).length,
    },
    {
      name: 'News articles',
      description: 'Create and maintain newsroom content.',
      shortLabel: 'NE',
      total: news.length,
      active: news.filter((article) => article.status === 1).length,
    },
    {
      name: 'User accounts',
      description: 'Manage Admin and Staff accounts.',
      shortLabel: 'US',
      total: users.length,
      active: users.filter((user) => user.status === 1).length,
    },
  ]

  return (
    <section className="page-section" aria-labelledby="dashboard-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 id="dashboard-title">Dashboard</h1>
          <p>Monitor the main areas of the FUNews management workspace.</p>
        </div>
        <span className="status-chip">Local data ready</span>
      </div>

      <div className="module-grid" aria-label="Management modules">
        {modules.map((module) => (
          <article className="module-card" key={module.name}>
            <div className="module-card__topline">
              <span className="module-card__icon" aria-hidden="true">
                {module.shortLabel}
              </span>
              <strong className="module-card__count">{module.total}</strong>
            </div>
            <div>
              <h2>{module.name}</h2>
              <p>{module.description}</p>
            </div>
            <span className="module-card__status">
              {module.active} active records
            </span>
          </article>
        ))}
      </div>

      <article className="workspace-note">
        <div>
          <p className="eyebrow">Core scope</p>
          <h2>Management flows are connected</h2>
        </div>
        <p>
          Category, News and Users support the required local CRUD and Search
          flows. Data is shared through DataContext and persisted with
          localStorage for assignment verification.
        </p>
      </article>
    </section>
  )
}

export default DashboardPage
