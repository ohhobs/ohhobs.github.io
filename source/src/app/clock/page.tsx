'use client'

import { useState, useEffect } from 'react'
import { getNow } from '@/app/clock/services/ClockService'

export default function ClockPage() {

  const [now, setNow] = useState<string>('')
  const [clockInterval, setClockInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    _setClockInterval()
    return () => {
      if (clockInterval !== null) clearInterval(clockInterval!)
    }
  })

  function _setClockInterval(): void {
    setClockInterval(setInterval(() => {
      setNow(getNow())
    }, 1000))
  }
  
  return (
    <div>{now}</div>
  )
}
