import { useNavigate } from 'react-router'
import funewsLogo from '../../assets/funews-logo.png'
import useAuth from '../../hooks/useAuth.js'

function Header({ isMenuOpen, onMenuToggle }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="admin-header">
      <div className="admin-header__start">
        <button
          className="menu-toggle"
          type="button"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          aria-controls="admin-sidebar"
          aria-expanded={isMenuOpen}
        >
          <span aria-hidden="true">☰</span>
        </button>

        <div className="header-brand">
          <img src={funewsLogo} alt="" />
          <span>FUNews</span>
        </div>
      </div>

      <div className="admin-header__actions">
        <div className="user-summary">
          <span className="user-avatar" aria-hidden="true">
            {currentUser.username.charAt(0)}
          </span>
          <span className="user-summary__copy">
            <strong>{currentUser.displayName}</strong>
            <span>Admin</span>
          </span>
        </div>

        <button className="header-logout" type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  )
}

export default Header
