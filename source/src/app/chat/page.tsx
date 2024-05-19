'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Router from "next/router"
import { v4 as uuidv4 } from 'uuid'

interface Message {
  senderId: string,
  content: string
}

export default function Chat() {

    // function connectSocket() {
  //   const socket = new WebSocket(`ws://20.190.123.30/ws?userId=${userId}`)
  //   setWebsocket(socket)
  // }

  // function setSocketEvents(socket: WebSocket): void {
  //   socket.onopen = function(event) {
  //     console.log('WebSocket connection established.')
  //   }
  //   socket.onmessage = function(event) {
  //     console.log('Message received from server:', event.data)
  //   }
  //   socket.onerror = function(error) {
  //     console.error('WebSocket error:', error)
  //   }
  //   socket.onclose = function(event) {
  //     console.log('WebSocket connection closed:', event.code, event.reason);
  //   }
  // }

  const router = useRouter()

  const [message, setMessage] = useState<string>('')
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

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
      messageType: "CONTENT",
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
    if (senderId === userId) return {
      marginBottom: '10px', backgroundColor: 'lightgreen'
    }
    return {
      marginBottom: '10px', backgroundColor: 'lightblue'
    }
  }

  function generateRandomColor() {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 156) + 100; // Adjusted to ensure darker colors
    const green = Math.floor(Math.random() * 156) + 100; // Adjusted to ensure darker colors
    const blue = Math.floor(Math.random() * 156) + 100; // Adjusted to ensure darker colors
    
    // Construct the hexadecimal color code
    const colorCode = "#" + red.toString(16).padStart(2, '0') + 
                            green.toString(16).padStart(2, '0') + 
                            blue.toString(16).padStart(2, '0');
    
    return colorCode;
  }

  return (
    <div>
      <h1>Hello, chat</h1>
      {userId ? (<>
        <h3>당신의 아이디: {userId}</h3>
        <div style={{ marginBottom: '10px' }}>
          <input value={message} onChange={e => setMessage(e.target.value)} type="text" />
          <button onClick={_ => sendMessage(message)}>보내기</button>
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
