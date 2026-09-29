import ModulePlaceholder from '../components/common/ModulePlaceholder.jsx'

function CategoriesPage() {
  return (
    <ModulePlaceholder
      eyebrow="Content structure"
      title="Category"
      description="Create and maintain the categories used to organize news articles."
      items={[
        'Read categories with clear Active and Inactive status labels',
        'Create and update category data using a dialog',
        'Confirm deletion and protect categories referenced by news',
        'Search by normalized category name',
      ]}
    />
  )
}

export default CategoriesPage
