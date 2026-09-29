import { useMemo, useState } from 'react'
import AuthContext from './auth-context.js'

const SESSION_STORAGE_KEY = 'funews.session'

const ADMIN_ACCOUNT = Object.freeze({
  id: 'admin-account',
  username: 'Admin',
  displayName: 'System Administrator',
  role: 1,
})

function readStoredSession() {
  try {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

    if (!storedSession) {
      return null
    }

    const parsedSession = JSON.parse(storedSession)

    if (
      parsedSession?.isAuthenticated === true &&
      parsedSession?.currentUser?.id === ADMIN_ACCOUNT.id
    ) {
      return ADMIN_ACCOUNT
    }
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  }

  return null
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(readStoredSession)

  function login(username, password) {
    const isValidCredential =
      username === ADMIN_ACCOUNT.username && password === 'Admin'

    if (!isValidCredential) {
      return {
        success: false,
        message: 'Username or password is incorrect.',
      }
    }

    const nextSession = {
      isAuthenticated: true,
      currentUser: ADMIN_ACCOUNT,
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession))
    setCurrentUser(ADMIN_ACCOUNT)

    return { success: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: currentUser !== null,
      login,
      logout,
    }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
