'use client'

import Link from 'next/link'

export default function PTEPage() {
  return (
    <div>
      <h1>PTE Templates Practice</h1>
      <ul>
        <li style={{marginBottom:'7px'}}><Link href="/">Home</Link></li>
        <li><Link href="/pte/describe-image">Describe Image</Link></li>
      </ul>
    </div>
  )
}
