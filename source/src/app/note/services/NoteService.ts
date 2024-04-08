export function save(content: string): void {
  localStorage.setItem('note', content)
}

export function load(): string {
  const content: string | null = localStorage.getItem('note')
  if (content !== null) return content!
  return '';
}
