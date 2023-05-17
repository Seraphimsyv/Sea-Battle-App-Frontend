import * as React from 'react';
import { useState, useEffect } from 'react';
import { Canvas } from './Canvas';
import gameSocket from '../../../sockets/ws';
import { GameService } from '../../../service/game-service';

export const GamePage = () => {
  // eslint-disable-next-line
  const [password, setPassword] = useState(localStorage.getItem('password') || undefined);

  useEffect(() => {
    if (password === undefined) {
      window.location.href = '/';
    }

    gameSocket.on('connect', () => {
      setInterval(() => {
        gameSocket.emit('gameConnection', { password: localStorage.getItem('password') })
      }, 5000)
    })

    gameSocket.on('connectionGameStatus', (evt: any) => {
      console.log(evt)
    })
  }, [password])

  return (
    <>
      <Canvas cellSize={40} />
    </>
  )
}