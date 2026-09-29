import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from '../components/layout/Header.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  return (
    <div className="admin-shell">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
        />
      )}

      <div className="admin-main">
        <Header isMenuOpen={isSidebarOpen} onMenuToggle={openSidebar} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
