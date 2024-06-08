'use client'

import { ChangeEvent, useState, useEffect } from 'react'

const answers: string[] = [
  'The given image represents a beautiful image.',
  'There must have been a popular debate about information present in the image for the keywords A and B.',
  'However, information present for C and D seems to be false.',
  'From the image, it is clear that maximum value seems to be constant which further states the importance of the topic present in the image.',
  'In conclusion, the given image includes complicated data and the analysis with all the sufficient data.'
]

export default function DescribeImagePage() {

  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([])

  useEffect(() => {
    setInitialUserAnswers()
  }, [])

  function setInitialUserAnswers(): void {
    const currentAnswers: string[] = []
    for (let i = 0; i < answers.length; i++) {
      currentAnswers.push('')
    }
    setUserAnswers(currentAnswers)
  }

  function handleAnswerChange(event: ChangeEvent<HTMLInputElement>, index: number): void {
    const value: string = event.target.value
    const currentAnswers: string[] = [...userAnswers]
    currentAnswers[index] = value
    setUserAnswers(currentAnswers)
  }

  function handleSubmitButtonClick(): void {
    setIncorrectIndices(getIncorrectAnswerIndices(userAnswers, answers))
  }

  function getIncorrectAnswerIndices(userAnswers: string[], answers: string[]): number[] {
    const incorrectIndices: number[] = []
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer !== answers[index]) incorrectIndices.push(index)
    })
    return incorrectIndices
  }

  return (
    <div>
      <h1>Describe Image Template</h1>
      {userAnswers.map((answer, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <label style={{ width: '20px' }}>{index + 1}.</label>
            <input
              style={{ boxSizing: 'border-box', width: '100%' }}
              type="text" value={answer}
              onChange={e => handleAnswerChange(e, index)}
            />
          </div>
        )
      })}
      <div>
        <button onClick={_ => handleSubmitButtonClick()}>Submit</button>
      </div>
      <div>Incorrect numbers: {incorrectIndices.reduce((acc: string, cur: number, index: number) => {
        if (index === 0) return `${cur + 1}`
        return `${acc}, ${cur + 1}`
      }, '')}</div>
    </div>
  )
}