export const seedCategories = [
  {
    id: 'category-business',
    name: 'Business',
    status: 1,
  },
  {
    id: 'category-education',
    name: 'Education',
    status: 1,
  },
  {
    id: 'category-technology',
    name: 'Technology',
    status: 1,
  },
  {
    id: 'category-lifestyle',
    name: 'Lifestyle',
    status: 0,
  },
]

export const seedUsers = [
  {
    id: 'admin-account',
    username: 'Admin',
    mockPassword: 'Admin',
    role: 1,
    status: 1,
  },
  {
    id: 'user-minh-anh',
    username: 'MinhAnh',
    mockPassword: 'Staff123',
    role: 2,
    status: 1,
  },
  {
    id: 'user-bao-tran',
    username: 'BaoTran',
    mockPassword: 'Staff123',
    role: 2,
    status: 0,
  },
]

export const seedNews = [
  {
    id: 'news-ai-newsroom',
    title: 'AI tools reshape the modern newsroom',
    content:
      'Editors are adopting assistive tools while keeping human review at the center of publishing.',
    categoryId: 'category-technology',
    createdBy: 'admin-account',
    status: 1,
  },
  {
    id: 'news-digital-learning',
    title: 'Digital learning expands across universities',
    content:
      'Universities continue to combine classroom teaching with flexible digital learning resources.',
    categoryId: 'category-education',
    createdBy: 'user-minh-anh',
    status: 1,
  },
  {
    id: 'news-local-business',
    title: 'Local businesses prepare for a new quarter',
    content:
      'Small businesses are reviewing their plans and customer services before the next quarter.',
    categoryId: 'category-business',
    createdBy: 'admin-account',
    status: 0,
  },
]
