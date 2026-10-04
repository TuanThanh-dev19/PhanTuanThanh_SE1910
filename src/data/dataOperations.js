export function appendCategory(categories, newCategory) {
  return [...categories, newCategory]
}

export function replaceCategory(categories, categoryId, categoryData) {
  return categories.map((category) =>
    category.id === categoryId
      ? { ...category, ...categoryData }
      : category,
  )
}

export function removeCategory(categories, news, categoryId) {
  const referenceCount = news.filter(
    (article) => article.categoryId === categoryId,
  ).length

  if (referenceCount > 0) {
    return { success: false, referenceCount, categories }
  }

  return {
    success: true,
    referenceCount: 0,
    categories: categories.filter((category) => category.id !== categoryId),
  }
}

export function appendNewsArticle(news, newArticle) {
  return [...news, newArticle]
}

export function replaceNewsArticle(news, articleId, articleData) {
  return news.map((article) =>
    article.id === articleId ? { ...article, ...articleData } : article,
  )
}

export function removeNewsArticle(news, articleId) {
  return news.filter((article) => article.id !== articleId)
}

export function appendUser(users, newUser) {
  return [...users, newUser]
}

export function replaceUser(users, userId, userData) {
  return users.map((user) =>
    user.id === userId ? { ...user, ...userData } : user,
  )
}

export function removeUser(users, news, userId, protectedUserId) {
  if (userId === protectedUserId) {
    return {
      success: false,
      reason: 'system-user',
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
