export function appendNewsArticle(news, newArticle) {
  return [...news, newArticle]
}

export function replaceNewsArticle(news, articleId, articleData) {
  return news.map((article) =>
    article.id === articleId ? { ...article, ...articleData } : article,
  )
}

export function removeNewsArticle(news, articleId) {
  return news.filter((article) => article.id !== articleId)
}
