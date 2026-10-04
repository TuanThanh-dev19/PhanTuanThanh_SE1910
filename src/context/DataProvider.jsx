import { useEffect, useState } from 'react'
import {
  seedCategories,
  seedNews,
  seedUsers,
  SYSTEM_ADMIN,
} from '../data/seedData.js'
import {
  appendCategory,
  appendNewsArticle,
  appendUser,
  removeCategory,
  removeNewsArticle,
  removeUser,
  replaceCategory,
  replaceNewsArticle,
  replaceUser,
} from '../data/dataOperations.js'
import {
  loadCollection,
  saveCollection,
  STORAGE_KEYS,
} from '../services/storageService.js'
import DataContext from './data-context.js'
import { createId } from '../utils/id.js'

function DataProvider({ children }) {
  const [categories, setCategories] = useState(() =>
    loadCollection(STORAGE_KEYS.categories, seedCategories),
  )
  const [users, setUsers] = useState(() =>
    loadCollection(STORAGE_KEYS.users, seedUsers),
  )
  const [news, setNews] = useState(() =>
    loadCollection(STORAGE_KEYS.news, seedNews),
  )

  useEffect(() => {
    saveCollection(STORAGE_KEYS.categories, categories)
  }, [categories])

  useEffect(() => {
    saveCollection(STORAGE_KEYS.news, news)
  }, [news])

  useEffect(() => {
    saveCollection(STORAGE_KEYS.users, users)
  }, [users])

  function createCategory(categoryData) {
    const newCategory = {
      id: createId('category'),
      ...categoryData,
    }

    setCategories((previous) => appendCategory(previous, newCategory))
    return newCategory
  }

  function updateCategory(categoryId, categoryData) {
    setCategories((previous) =>
      replaceCategory(previous, categoryId, categoryData),
    )
  }

  function deleteCategory(categoryId) {
    const result = removeCategory(categories, news, categoryId)

    if (!result.success) {
      return {
        success: false,
        referenceCount: result.referenceCount,
      }
    }

    setCategories(result.categories)

    return { success: true, referenceCount: 0 }
  }

  function createNewsArticle(articleData) {
    const newArticle = {
      id: createId('news'),
      ...articleData,
    }

    setNews((previous) => appendNewsArticle(previous, newArticle))
    return newArticle
  }

  function updateNewsArticle(articleId, articleData) {
    setNews((previous) =>
      replaceNewsArticle(previous, articleId, articleData),
    )
  }

  function deleteNewsArticle(articleId) {
    setNews((previous) => removeNewsArticle(previous, articleId))
  }

  function createUser(userData) {
    const newUser = {
      id: createId('user'),
      ...userData,
    }

    setUsers((previous) => appendUser(previous, newUser))
    return newUser
  }

  function updateUser(userId, userData) {
    if (userId === SYSTEM_ADMIN.id) {
      return { success: false, reason: 'system-user' }
    }

    setUsers((previous) => replaceUser(previous, userId, userData))
    return { success: true, reason: null }
  }

  function deleteUser(userId) {
    const result = removeUser(users, news, userId, SYSTEM_ADMIN.id)

    if (!result.success) {
      return {
        success: false,
        reason: result.reason,
        referenceCount: result.referenceCount,
      }
    }

    setUsers(result.users)
    return { success: true, reason: null, referenceCount: 0 }
  }

  const value = {
    categories,
    news,
    users,
    createCategory,
    updateCategory,
    deleteCategory,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    createUser,
    updateUser,
    deleteUser,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider
