import { useContext } from 'react'
import AuthContext from '../context/auth-context.js'

function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }

  return context
}

export default useAuth
