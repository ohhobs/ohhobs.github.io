'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { save, load } from '@/app/note/services/NoteService'

export default function Note() {

  const [note, setNote] = useState<string>('')

  useEffect(() => {
    const content = load()
    setNote(content)
  }, [])

  return (
    <div>
      <h1>Note</h1>
      <p>Keep your data only for you.</p>
      <p>No data tranferring through the internet.</p>
      <p>All data is saved to your machine only.</p>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/">Home</Link>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <textarea
          name="note"
          id="note"
          cols={30}
          rows={10}
          placeholder="Write your note here..."
          value={note}
          onChange={e => {
            const content = e.target.value
            setNote(content)
            save(content)
          }}>
        </textarea>
      </div>
    </div>
  )
}