export function createId(prefix) {
  const uniquePart = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return `${prefix}-${uniquePart}`
}
