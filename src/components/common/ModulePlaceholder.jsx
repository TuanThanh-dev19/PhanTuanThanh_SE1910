function ModulePlaceholder({ eyebrow, title, description, items }) {
  return (
    <section className="page-section" aria-labelledby={`${title}-title`}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${title}-title`}>{title}</h1>
          <p>{description}</p>
        </div>
        <span className="status-chip status-chip--muted">UI shell</span>
      </div>

      <div className="placeholder-panel">
        <div className="placeholder-panel__heading">
          <span className="placeholder-panel__icon" aria-hidden="true">
            +
          </span>
          <div>
            <h2>Module prepared</h2>
            <p>Functional work scheduled for the upcoming CRUD milestones.</p>
          </div>
        </div>

        <ul className="scope-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ModulePlaceholder
