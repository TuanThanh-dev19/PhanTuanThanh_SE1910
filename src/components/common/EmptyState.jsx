function EmptyState({ action, description, title }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        ∅
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
