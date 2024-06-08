'use client'

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Message {
  senderId: string,
  content: string
}

export default function Chat() {

  const [message, setMessage] = useState<string>('')
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [mode, setMode] = useState<string>('CONTENT')

  useEffect(() => {
    if (websocket) {
      window.onkeyup = null
      window.onkeyup = keyEvent
    }
  }, [websocket, message])

  function keyEvent(e: KeyboardEvent): void {
    if (e.key === 'Enter') sendMessage(message)
  }

  useEffect(() => {
    if (websocket) {
      websocket!.onmessage = handleMessageEvent
      websocket!.onclose = handleCloseEvent
    }
  }, [websocket, messages])

  function sendMessage(message: string): void {
    if (!message || message === '') return;
    const _message = {
      messageType: mode,
      message,
      user: {
        id: userId
      }
    }
    websocket!.send(JSON.stringify(_message))
    setMessagesState(message, userId)
    setMessage('')
  }

  function enterChat(): void {
    const userId: string = uuidv4()
    const socket = new WebSocket(`wss://123qweasd.com/ws?userId=${userId}`)
    setWebsocket(socket)
    setUserId(userId)
  }

  function handleMessageEvent(e: MessageEvent<any>): void {
    const data = JSON.parse(e.data)
    const messageType = data.messageType
    const message = data.message
    const sender = data.user.id
    if (messageType === 'CONTENT') setMessagesState(message, sender)
    else if (messageType === 'CONNECTION') setMessagesState('님이 접속하셨습니다.', sender)
    else if (messageType === 'DISCONNECTION') setMessagesState('님이 나가셨습니다.', sender)
  }

  function handleCloseEvent(e: CloseEvent): void {
    console.log('handleCloseEvent', e)
    window.location.reload()
  }

  function setMessagesState(message: string, senderId: string): void {
    const ms = [...messages.reverse()]
    const content = message
    ms.push({ content, senderId })
    setMessages(ms.reverse())
  }

  function getStyle(senderId: string): any {
    if (senderId === userId) {
      return {
        marginBottom: '10px',
        backgroundColor: 'lightgreen'
      }
    }
    return {
      marginBottom: '10px',
      backgroundColor: 'lightblue'
    }
  }

  return (
    <div>
      <h1>Hello, chat</h1>
      {userId ? (<>
        <p>현재 모드: {mode}</p>
        <div style={{ marginBottom: '10px' }}>
          <input value={message} onChange={e => setMessage(e.target.value)} type="text" />
          <button onClick={_ => sendMessage(message)}>보내기</button>
          {mode === 'CONTENT' ? (
            <button onClick={_ => setMode('TRANSLATE')}>모드바꾸기</button>
          ) : (
            <button onClick={_ => setMode('CONTENT')}>모드바꾸기</button>
          )}
        </div>
        <div>
          {messages.map((m, i) => {
            return (
              <div key={i} style={getStyle(m.senderId)}>
                <div><b>{m.senderId}</b>:</div>
                <div>{m.content}</div>
              </div>
            )
          })}
        </div>
      </>) : (
        <button onClick={enterChat}>채팅방가기</button>
      )}
    </div>
  )
}
