'use client'

import { useState } from 'react'

interface Response {
  corrected_sentence: string
  explanation: string
}

export default function EnglishGrammarPage() {

  const [sentence, setSentence] = useState<string>('')
  const [response, setResponse] = useState<Response | null>(null)

  function handleClick(sentence: string) {
    const prodUrl = 'https://123qweasd.com/english-grammar-check'
    const url = 'http://localhost:9000/english-grammar-check'
    const postData = { sentence }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      return response.json()
    })
    .then(data => {
      setResponse({
        corrected_sentence: data.corrected_sentence,
        explanation: data.explanation
      })
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
  }

  return (
    <div>
      <h1>English Grammar Checker</h1>
      {response !== null ? (
        <div>
          <p>Crrected: {response.corrected_sentence}</p>
          <p>Reason: {response.explanation}</p>
        </div>
      ) : null}
      <div>
        <textarea value={sentence} onChange={e => setSentence(e.target.value)} name="sentence"></textarea>
      </div>
      <div>
        <button onClick={_ => handleClick(sentence)}>check</button>
      </div>
    </div>
  )
}
