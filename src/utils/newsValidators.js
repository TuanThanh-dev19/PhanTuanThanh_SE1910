export function validateNewsForm(formData, categories) {
  const errors = {}
  const normalizedTitle = formData.title.trim()
  const normalizedContent = formData.content.trim()
  const normalizedStatus = Number(formData.status)
  const categoryExists = categories.some(
    (category) => category.id === formData.categoryId,
  )

  if (!normalizedTitle) {
    errors.title = 'Article title is required.'
  }

  if (!normalizedContent) {
    errors.content = 'Article content is required.'
  }

  if (!formData.categoryId || !categoryExists) {
    errors.categoryId = 'Please select a valid category.'
  }

  if (normalizedStatus !== 0 && normalizedStatus !== 1) {
    errors.status = 'Please select a valid status.'
  }

  return {
    errors,
    normalizedData: {
      title: normalizedTitle,
      content: normalizedContent,
      categoryId: formData.categoryId,
      status: normalizedStatus,
    },
  }
}
