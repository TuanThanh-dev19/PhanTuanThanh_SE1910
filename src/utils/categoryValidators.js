export function validateCategoryForm(formData, categories, currentCategoryId) {
  const errors = {}
  const normalizedName = formData.name.trim()
  const normalizedStatus = Number(formData.status)

  if (!normalizedName) {
    errors.name = 'Category name is required.'
  } else {
    const normalizedNameForComparison = normalizedName.toLowerCase()
    const hasDuplicateName = categories.some(
      (category) =>
        category.id !== currentCategoryId &&
        category.name.trim().toLowerCase() === normalizedNameForComparison,
    )

    if (hasDuplicateName) {
      errors.name = 'Category name already exists.'
    }
  }

  if (normalizedStatus !== 0 && normalizedStatus !== 1) {
    errors.status = 'Please select a valid status.'
  }

  return {
    errors,
    normalizedData: {
      name: normalizedName,
      status: normalizedStatus,
    },
  }
}
