import { useState } from 'react'
import { loadSettings, persistSettings } from '../services/settingsService.js'
import SettingsContext from './settings-context.js'

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings)

  function saveSettings(nextSettings) {
    const normalizedSettings = {
      displayName: nextSettings.displayName.trim(),
      email: nextSettings.email.trim().toLowerCase(),
    }
    const wasPersisted = persistSettings(normalizedSettings)

    setSettings(normalizedSettings)
    return { wasPersisted }
  }

  const value = {
    settings,
    saveSettings,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
