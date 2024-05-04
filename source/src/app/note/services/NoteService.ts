import Note from '@/app/note/models/Note'
import { v4 as uuidv4 } from 'uuid'

const idPrefix = 'note-'

export function saveNote(note: Note): void {
  const noteWithId: Note = {...note, id: uuidv4() }
  const _note: string = JSON.stringify(noteWithId)
  const id: string = noteWithId.id
  localStorage.setItem(`${idPrefix}${id}`, _note)
}

export function updateNote(note: Note): void {
  const _note: string = JSON.stringify(note)
  const id: string = note.id
  localStorage.setItem(`${idPrefix}${id}`, _note)
}

export function loadNoteById(noteId: string): Note | null {
  const record: string | null = localStorage.getItem(`${idPrefix}${noteId}`)
  if (record) {
    const note: Note = JSON.parse(record!) as Note
    return note
  }
  return null
}

export function loadAllNote(): Note[] {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key: string | null = localStorage.key(i)
    if (key) keys.push(key)
  }
  const notes: Note[] = keys.filter(key => key.includes('note-')).map(key => {
    const record: string | null = localStorage.getItem(key)
    const note: Note = JSON.parse(record!) as Note
    return note
  })
  return notes
}

export function deleteNote(note: Note): void {
  const key = `${idPrefix}${note.id}`
  localStorage.removeItem(key)
}

export function getTodayDate(): string {
  const today: Date = new Date()
  const fullYear: number = today.getFullYear()
  const _month: number = today.getMonth() + 1
  const month: () => string = () => {
    if (_month < 10) return `0${_month}`
    return `${_month}`
  }
  const _date: number = today.getDate()
  const date: () => string = () => {
    if (_date < 10) return `0${_date}`
    return `${_date}`
  }
  return `${fullYear}-${month()}-${date()}`
}

export function getNow(): string {
  const now = new Date()
  return now.toLocaleString()
}
