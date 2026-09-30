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
    return {
      success: false,
      referenceCount,
      categories,
    }
  }

  return {
    success: true,
    referenceCount: 0,
    categories: categories.filter((category) => category.id !== categoryId),
  }
}
