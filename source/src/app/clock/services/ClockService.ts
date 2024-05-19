export function getNow(): string {
  const now = new Date()
  return now.toLocaleString()
}
