export const SETTINGS_STORAGE_KEY = 'funews.settings'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const DEFAULT_SETTINGS = Object.freeze({
  displayName: 'System Administrator',
  email: 'admin@funews.com',
})

function isValidSettings(value) {
  return (
    typeof value?.displayName === 'string' &&
    value.displayName.trim() !== '' &&
    value.displayName.trim().length <= 60 &&
    typeof value?.email === 'string' &&
    EMAIL_PATTERN.test(value.email.trim())
  )
}

export function loadSettings() {
  try {
    const storedValue = localStorage.getItem(SETTINGS_STORAGE_KEY)

    if (!storedValue) {
      return { ...DEFAULT_SETTINGS }
    }

    const parsedValue = JSON.parse(storedValue)
    if (isValidSettings(parsedValue)) {
      return {
        displayName: parsedValue.displayName.trim(),
        email: parsedValue.email.trim().toLowerCase(),
      }
    }

    localStorage.removeItem(SETTINGS_STORAGE_KEY)
  } catch {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY)
    } catch {
      // The application can continue with defaults when storage is unavailable.
    }
  }

  return { ...DEFAULT_SETTINGS }
}

export function persistSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    return true
  } catch {
    return false
  }
}
