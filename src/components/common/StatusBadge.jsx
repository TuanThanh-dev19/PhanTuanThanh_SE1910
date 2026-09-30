function StatusBadge({ status }) {
  const isActive = status === 1

  return (
    <span
      className={`status-badge ${
        isActive ? 'status-badge--active' : 'status-badge--inactive'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  )
}

export default StatusBadge
