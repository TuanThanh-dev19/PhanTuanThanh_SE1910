import { useState } from 'react'
import useData from '../hooks/useData.js'
import AuthContext from './auth-context.js'

const SESSION_STORAGE_KEY = 'funews.session'

function clearStoredSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  } catch {
    // The in-memory auth state can still be cleared when storage is unavailable.
  }
}

function readStoredSession(users) {
  try {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

    if (!storedSession) {
      return null
    }

    const parsedSession = JSON.parse(storedSession)

    if (parsedSession?.isAuthenticated === true) {
      const storedUserId =
        parsedSession.currentUserId || parsedSession.currentUser?.id
      const hasActiveUser = users.some(
        (user) => user.id === storedUserId && user.status === 1,
      )

      if (hasActiveUser) {
        return storedUserId
      }
    }
  } catch {
    // Invalid JSON is handled by clearing the session below.
  }

  clearStoredSession()
  return null
}

function AuthProvider({ children }) {
  const { users } = useData()
  const [currentUserId, setCurrentUserId] = useState(() =>
    readStoredSession(users),
  )
  const currentUser =
    users.find((user) => user.id === currentUserId && user.status === 1) || null

  function login(username, password) {
    const normalizedUsername = username.trim().toLowerCase()
    const matchedUser = users.find(
      (user) =>
        user.username.toLowerCase() === normalizedUsername &&
        user.mockPassword === password &&
        user.status === 1,
    )

    if (!matchedUser) {
      return {
        success: false,
        message: 'Username or password is incorrect.',
      }
    }

    const nextSession = {
      isAuthenticated: true,
      currentUserId: matchedUser.id,
    }

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession))
    } catch {
      // Login still works for the current tab when persistence is unavailable.
    }
    setCurrentUserId(matchedUser.id)

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
