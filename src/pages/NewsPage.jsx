import ModulePlaceholder from '../components/common/ModulePlaceholder.jsx'

function NewsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Editorial workspace"
      title="News"
      description="Manage news articles and their relationship with publishing categories."
      items={[
        'Read article title, category, creator and publication status',
        'Create and update articles using a validated dialog form',
        'Confirm deletion without mutating the source array',
        'Search articles while preserving source data',
      ]}
    />
  )
}

export default NewsPage
