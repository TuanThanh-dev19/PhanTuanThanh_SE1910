export function validateUserForm(formData, users, currentUserId) {
  const errors = {}
  const normalizedUsername = formData.username.trim()
  const normalizedPassword = formData.mockPassword.trim()
  const normalizedRole = Number(formData.role)
  const normalizedStatus = Number(formData.status)

  if (!normalizedUsername) {
    errors.username = 'Username is required.'
  } else {
    const normalizedUsernameForComparison = normalizedUsername.toLowerCase()
    const hasDuplicateUsername = users.some(
      (user) =>
        user.id !== currentUserId &&
        user.username.trim().toLowerCase() === normalizedUsernameForComparison,
    )

    if (hasDuplicateUsername) {
      errors.username = 'Username already exists.'
    }
  }

  if (!normalizedPassword) {
    errors.mockPassword = 'Mock password is required.'
  }

  if (normalizedRole !== 1 && normalizedRole !== 2) {
    errors.role = 'Please select a valid role.'
  }

  if (normalizedStatus !== 0 && normalizedStatus !== 1) {
    errors.status = 'Please select a valid status.'
  }

  return {
    errors,
    normalizedData: {
      username: normalizedUsername,
      mockPassword: normalizedPassword,
      role: normalizedRole,
      status: normalizedStatus,
    },
  }
}
