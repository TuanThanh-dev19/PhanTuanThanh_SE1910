const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSettingsForm(formData) {
  const errors = {}
  const displayName = formData.displayName.trim()
  const email = formData.email.trim().toLowerCase()

  if (!displayName) {
    errors.displayName = 'Display name is required.'
  } else if (displayName.length > 60) {
    errors.displayName = 'Display name must be 60 characters or fewer.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  return {
    errors,
    normalizedData: {
      displayName,
      email,
    },
  }
}
