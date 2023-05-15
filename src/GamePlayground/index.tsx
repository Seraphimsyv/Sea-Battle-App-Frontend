import React, { useState, useEffect } from 'react';
import * as io from 'socket.io-client';

export const GamePlayground = () => {

  useEffect(() => {

    const socket = io.connect('', {
      path: '/api/ws/game',
      extraHeaders: {
        "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      }
    })

    socket.on('connect', () => {
      console.log('Connected');
    })

  })

  return (
    <>
    </>
  )
}