import { NavLink } from 'react-router'
import funewsLogo from '../../assets/funews-logo.png'

const navigationItems = [
  { label: 'Dashboard', shortLabel: 'DB', to: '/dashboard' },
  { label: 'Category', shortLabel: 'CA', to: '/categories' },
  { label: 'News', shortLabel: 'NE', to: '/news' },
  { label: 'Users', shortLabel: 'US', to: '/users' },
  { label: 'Settings', shortLabel: 'SE', to: '/settings' },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`admin-sidebar${isOpen ? ' admin-sidebar--open' : ''}`}
      id="admin-sidebar"
      aria-label="Administration navigation"
    >
      <div className="sidebar-brand">
        <img src={funewsLogo} alt="FUNews logo" />
        <span>
          <strong>FUNews</strong>
          <small>Management System</small>
        </span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="sidebar-nav__label">Workspace</p>
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
            }
            key={item.to}
            onClick={onClose}
            to={item.to}
          >
            <span className="sidebar-link__icon" aria-hidden="true">
              {item.shortLabel}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
