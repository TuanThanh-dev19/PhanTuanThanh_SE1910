import { useContext } from 'react'
import SettingsContext from '../context/settings-context.js'

function useSettings() {
  const context = useContext(SettingsContext)

  if (context === null) {
    throw new Error('useSettings must be used inside SettingsProvider.')
  }

  return context
}

export default useSettings
