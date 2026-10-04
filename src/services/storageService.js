export const STORAGE_KEYS = Object.freeze({
  categories: 'funews.categories',
  news: 'funews.news',
  users: 'funews.users',
})

function cloneRecords(records) {
  return records.map((record) => ({ ...record }))
}

function removeStoredValue(storageKey) {
  try {
    localStorage.removeItem(storageKey)
  } catch {
    // Storage can be unavailable in restricted browser modes.
  }
}

export function loadCollection(storageKey, fallbackRecords) {
  try {
    const storedValue = localStorage.getItem(storageKey)

    if (!storedValue) {
      return cloneRecords(fallbackRecords)
    }

    const parsedValue = JSON.parse(storedValue)
    if (Array.isArray(parsedValue)) {
      return parsedValue
    }

    removeStoredValue(storageKey)
  } catch {
    removeStoredValue(storageKey)
  }

  return cloneRecords(fallbackRecords)
}

export function saveCollection(storageKey, records) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(records))
    return true
  } catch {
    return false
  }
}
