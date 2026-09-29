const modules = [
  {
    name: 'Category',
    description: 'Organize articles into clear publishing topics.',
    shortLabel: 'CA',
  },
  {
    name: 'News articles',
    description: 'Create and maintain newsroom content.',
    shortLabel: 'NE',
  },
  {
    name: 'User accounts',
    description: 'Manage Admin and Staff accounts.',
    shortLabel: 'US',
  },
]

function DashboardPage() {
  return (
    <section className="page-section" aria-labelledby="dashboard-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 id="dashboard-title">Dashboard</h1>
          <p>Monitor the main areas of the FUNews management workspace.</p>
        </div>
        <span className="status-chip">Layout milestone</span>
      </div>

      <div className="module-grid" aria-label="Management modules">
        {modules.map((module) => (
          <article className="module-card" key={module.name}>
            <span className="module-card__icon" aria-hidden="true">
              {module.shortLabel}
            </span>
            <div>
              <h2>{module.name}</h2>
              <p>{module.description}</p>
            </div>
            <span className="module-card__status">Data setup next</span>
          </article>
        ))}
      </div>

      <article className="workspace-note">
        <div>
          <p className="eyebrow">Current milestone</p>
          <h2>Navigation foundation is ready</h2>
        </div>
        <p>
          Header, sidebar, protected nested routes and responsive navigation are
          now shared by every administration page. Mock entity data and CRUD will
          be introduced in the next milestone.
        </p>
      </article>
    </section>
  )
}

export default DashboardPage
