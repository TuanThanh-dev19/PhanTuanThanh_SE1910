export function appendUser(users, newUser) {
  return [...users, newUser]
}

export function replaceUser(users, userId, userData) {
  return users.map((user) =>
    user.id === userId ? { ...user, ...userData } : user,
  )
}

export function removeUser(users, news, userId, currentUserId) {
  if (userId === currentUserId) {
    return {
      success: false,
      reason: 'current-user',
      referenceCount: 0,
      users,
    }
  }

  const referenceCount = news.filter(
    (article) => article.createdBy === userId,
  ).length

  if (referenceCount > 0) {
    return {
      success: false,
      reason: 'news-reference',
      referenceCount,
      users,
    }
  }

  return {
    success: true,
    reason: null,
    referenceCount: 0,
    users: users.filter((user) => user.id !== userId),
  }
}
