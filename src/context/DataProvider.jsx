import { useEffect, useState } from 'react'
import {
  seedCategories,
  seedNews,
  seedUsers,
} from '../data/seedData.js'
import {
  loadCollection,
  saveCollection,
  STORAGE_KEYS,
} from '../services/storageService.js'
import DataContext from './data-context.js'
import {
  appendCategory,
  removeCategory,
  replaceCategory,
} from '../utils/categoryOperations.js'
import { createId } from '../utils/id.js'
import {
  appendNewsArticle,
  removeNewsArticle,
  replaceNewsArticle,
} from '../utils/newsOperations.js'
import { appendUser, removeUser, replaceUser } from '../utils/userOperations.js'

function isStatus(value) {
  return value === 0 || value === 1
}

function hasUniqueValues(records, getValue) {
  const values = records.map(getValue)
  return new Set(values).size === values.length
}

function isCategory(category) {
  return (
    typeof category?.id === 'string' &&
    category.id.trim() !== '' &&
    typeof category?.name === 'string' &&
    category.name.trim() !== '' &&
    isStatus(category?.status)
  )
}

function isNewsArticle(article) {
  return (
    typeof article?.id === 'string' &&
    article.id.trim() !== '' &&
    typeof article?.title === 'string' &&
    article.title.trim() !== '' &&
    typeof article?.content === 'string' &&
    article.content.trim() !== '' &&
    typeof article?.categoryId === 'string' &&
    typeof article?.createdBy === 'string' &&
    isStatus(article?.status)
  )
}

function isUser(user) {
  return (
    typeof user?.id === 'string' &&
    user.id.trim() !== '' &&
    typeof user?.username === 'string' &&
    user.username.trim() !== '' &&
    typeof user?.mockPassword === 'string' &&
    user.mockPassword.trim() !== '' &&
    (user?.role === 1 || user?.role === 2) &&
    isStatus(user?.status)
  )
}

function isCategoryCollection(categories) {
  return (
    categories.every(isCategory) &&
    hasUniqueValues(categories, (category) => category.id) &&
    hasUniqueValues(categories, (category) => category.name.trim().toLowerCase())
  )
}

function isUserCollection(users) {
  return (
    users.every(isUser) &&
    hasUniqueValues(users, (user) => user.id) &&
    hasUniqueValues(users, (user) => user.username.trim().toLowerCase())
  )
}

function isNewsCollection(articles, categories, users) {
  return (
    articles.every(isNewsArticle) &&
    hasUniqueValues(articles, (article) => article.id) &&
    articles.every(
      (article) =>
        categories.some((category) => category.id === article.categoryId) &&
        users.some((user) => user.id === article.createdBy),
    )
  )
}

function DataProvider({ children }) {
  const [categories, setCategories] = useState(() =>
    loadCollection(
      STORAGE_KEYS.categories,
      seedCategories,
      isCategoryCollection,
    ),
  )
  const [users, setUsers] = useState(() =>
    loadCollection(STORAGE_KEYS.users, seedUsers, isUserCollection),
  )
  const [news, setNews] = useState(() =>
    loadCollection(STORAGE_KEYS.news, seedNews, (articles) =>
      isNewsCollection(articles, categories, users),
    ),
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
    setUsers((previous) => replaceUser(previous, userId, userData))
  }

  function deleteUser(userId, currentUserId) {
    const result = removeUser(users, news, userId, currentUserId)

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
