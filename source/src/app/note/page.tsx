'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'
import type Note from '@/app/note/models/Note'
import { loadAllNote, saveNote, updateNote, deleteNote } from '@/app/note/services/NoteService'

export default function Note() {

  const [notes, setNotes] = useState<Note[]>([])
  const [newNoteName, setNewNoteName] = useState<string>('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [selectedNoteContent, setSelectedNoteContent] = useState<string>('')

  useEffect(() => {
    setAllNotes()
  }, [])

  function setAllNotes(): void {
    const notes: Note[] = loadAllNote()
    setNotes(notes)
  }

  function _updateNote(note: Note): void {
    updateNote(note)
    setAllNotes()
  }

  function handleCreateNote(name: string, content: string): void {
    if (name === '') {
      alert('Empty name')
    } else {
      const note: Note = { id: '', name, content }
      saveNote(note)
      setAllNotes()
    }
  }

  function selectNote(note: Note): void {
    setSelectedNote(note)
    setSelectedNoteContent(note.content)
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const content = e.target.value
    const _selectedNote: Note = {...selectedNote!, content} 
    setSelectedNoteContent(content)
    _updateNote(_selectedNote)
  }

  function handleDelete(note: Note): void {
    const consent: boolean = confirm('Are you sure?')
    if (consent) {
      deleteNote(note)
      setAllNotes()
      if (selectedNote && note.id === selectedNote!.id) {
        setSelectedNote(null)
        setSelectedNoteContent('')
      }
    }
  }

  function setSelectedStyle(noteId: string): any {
    if (selectedNote && noteId === selectedNote.id) return { backgroundColor: 'green', color: 'white' }
    return {}
  }

  return (
    <div>
      <h1>Note</h1>
      <p>
        Keep your data only for you -
        no data tranferring through the internet.
        All data is saved to your machine only.
      </p>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/">Home</Link>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3>Your Notes</h3>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder='New note name'
            value={newNoteName}
            onChange={(e) => setNewNoteName(e.target.value)}
          />
          <button onClick={() => handleCreateNote(newNoteName, '')}>Create note</button>
        </div>
        <div>
          {notes.map(note => {
            return (
              <div key={note.id} style={setSelectedStyle(note.id)}>
                <div style={{ display: 'inline-block', marginRight: '0.5rem' }} onClick={() => selectNote(note)}>{note.name}</div>
                <button onClick={() => handleDelete(note)}>delete</button>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        {selectedNote && (
          <textarea
            name="note"
            id="note"
            cols={30}
            rows={10}
            placeholder="Write your note here..."
            value={selectedNoteContent}
            onChange={handleContentChange}>
          </textarea>
        )}
      </div>
    </div>
  )
}