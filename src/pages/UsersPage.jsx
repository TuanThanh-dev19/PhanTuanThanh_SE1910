import ModulePlaceholder from '../components/common/ModulePlaceholder.jsx'

function UsersPage() {
  return (
    <ModulePlaceholder
      eyebrow="Account administration"
      title="Users"
      description="Manage mock Admin and Staff accounts for the assignment."
      items={[
        'Read usernames with clear Admin and Staff role labels',
        'Create and update accounts with required-field validation',
        'Confirm deletion and protect the current signed-in account',
        'Search by normalized username',
      ]}
    />
  )
}

export default UsersPage
