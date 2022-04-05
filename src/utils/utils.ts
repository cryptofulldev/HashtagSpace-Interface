export function getLogin(): boolean {
  if (!window.localStorage.refresh_token) {
    return false
  }
  const token = JSON.parse(window.localStorage.refresh_token)

  if (token.ttl < +new Date()) {
    return false
  }
  return true
}
