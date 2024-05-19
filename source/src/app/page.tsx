import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Apps</h1>
      <ul>
        <li style={{marginBottom:'7px'}}><Link href="/note">Note</Link></li>
        <li style={{marginBottom:'7px'}}><Link href="/clock">Colck</Link></li>
        <li><Link href="/chat">Chat</Link></li>
      </ul>
    </div>
  )
}
