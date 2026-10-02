import useData from '../hooks/useData.js'

function DashboardPage() {
  const { categories, news, users } = useData()
  const kpis = [
    {
      name: 'Categories',
      total: categories.length,
      unit: 'categories',
    },
    {
      name: 'News Articles',
      total: news.length,
      unit: 'articles',
    },
    {
      name: 'Users',
      total: users.length,
      unit: 'accounts',
    },
  ]

  return (
    <section className="page-section" aria-labelledby="dashboard-title">
      <div className="page-heading">
        <div>
          <h1 id="dashboard-title">Dashboard</h1>
        </div>
      </div>

      <div className="dashboard-kpi-grid" aria-label="Dashboard summary">
        {kpis.map((kpi) => (
          <article className="dashboard-kpi-card" key={kpi.name}>
            <div className="dashboard-kpi-card__header">
              <h2>{kpi.name}</h2>
            </div>
            <div className="dashboard-kpi-card__value">
              <strong>{kpi.total}</strong>
              <span>{kpi.unit}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
