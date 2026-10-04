import { useState } from 'react'
import { SYSTEM_ADMIN } from '../data/seedData.js'
import AuthContext from './auth-context.js'

const SESSION_STORAGE_KEY = 'funews.session'
const AUTHENTICATED_ADMIN = Object.freeze({
  id: SYSTEM_ADMIN.id,
  username: SYSTEM_ADMIN.username,
  role: SYSTEM_ADMIN.role,
  status: SYSTEM_ADMIN.status,
})

function clearStoredSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  } catch {
    // The in-memory auth state can still be cleared when storage is unavailable.
  }
}

function readStoredSession() {
  try {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

    if (!storedSession) {
      return null
    }

    const parsedSession = JSON.parse(storedSession)

    if (
      parsedSession?.isAuthenticated === true &&
      parsedSession.currentUserId === SYSTEM_ADMIN.id
    ) {
      return SYSTEM_ADMIN.id
    }
  } catch {
    // Invalid JSON is handled by clearing the session below.
  }

  clearStoredSession()
  return null
}

function AuthProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(readStoredSession)
  const currentUser =
    currentUserId === SYSTEM_ADMIN.id ? AUTHENTICATED_ADMIN : null

  function login(username, password) {
    if (
      username !== SYSTEM_ADMIN.username ||
      password !== SYSTEM_ADMIN.mockPassword
    ) {
      return {
        success: false,
        message: 'Username or password is incorrect.',
      }
    }

    const nextSession = {
      isAuthenticated: true,
      currentUserId: SYSTEM_ADMIN.id,
    }

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession))
    } catch {
      // Login still works for the current tab when persistence is unavailable.
    }
    setCurrentUserId(SYSTEM_ADMIN.id)

    return { success: true }
  }

  function logout() {
    clearStoredSession()
    setCurrentUserId(null)
  }

  const value = {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
