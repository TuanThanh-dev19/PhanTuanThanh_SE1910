import ModulePlaceholder from '../components/common/ModulePlaceholder.jsx'

function SettingsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Workspace configuration"
      title="Settings"
      description="Review the mock system profile and local assignment preferences."
      items={[
        'Display the current mock administrator profile',
        'Document localStorage persistence behavior',
        'Prepare a guarded reset-data action for later milestones',
      ]}
    />
  )
}

export default SettingsPage
