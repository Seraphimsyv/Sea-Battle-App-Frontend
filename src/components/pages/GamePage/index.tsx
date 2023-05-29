import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import socket from '../../../sockets/ws';
import { GameService } from '../../../service/game-service';
import { TemplatePage } from '../../TemplatePage';
import { Loader } from '../../Loader';
import { Header } from './Header';
import { Menu } from './Menu';
import { Chat } from './Chat';
import { PlayerBoard } from './PlayerBoard';
import { OpponentBoard } from './OpponentBoard';
import {
  EnumGameStatus,
  EnumOpponentStatus
} from '../../../enum';
import {
  Message,
  GameStatus,
  OpponentStatus,
  PointsList
} from '../../../types';
import { MAX_SHIP } from '../../../constants';

export const GamePage = () => {
  const [password] = useState(localStorage.getItem('password') || undefined);
  const [token] = useState(localStorage.getItem('token') || undefined);
  const [playerPlaygroundPoints, setPlayerPlaygroundPoints] = useState<PointsList | undefined>(undefined);
  const [opponentPlaygroundPoints, setOpponentPlaygroundPoints] = useState<PointsList | undefined>(undefined);
  const [playerGamePoint, setPlayerGamePoint] = useState<number>(0);
  const [opponentGamePoint, setOpponentGamePoint] = useState<number>(0);
  const [gameTurn, setGameTurn] = useState<number | undefined>(undefined);
  const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(undefined);
  const [opponentStatus, setOpponentStatus] = useState<OpponentStatus | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  /**
   * Player exit handler
   */
  const handleLeaveGame = () => {
    fetch('/api/game/leave', {
      method: 'POST',
      body: JSON.stringify({
        token: token,
        password: password
      })
    })
    .then(res => window.location.href = '/');
  }
  /**
   * Chat message send handler
   * @param message 
   */
  const handleSendMessage = (message: string) => {
    const userStorage = localStorage.getItem('user');

    if (typeof userStorage === 'string') {
      const username = JSON.parse(userStorage)['username'];
      
      fetch('/api/game/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          password: password,
          username: username,
          message: message
        })
      })
    }
  }
  /**
   * User ship loading handler
   * @param ship 
   */
  const handleUploadShips = (point: { x: number, y: number }) => {
    fetch('/api/game/player-add-ship', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, password: password, point: point })
    });
  }
  /**
   * Shot validation handler
   * @param point 
   */
  const handleCheckShot = (point: { x: number, y: number }) => {
    if (!gameStatus) return;

    if (!opponentStatus) return;

    if (gameStatus.status !== EnumGameStatus.PROCESSING) return;

    if (gameTurn === 0) {
      alert("Opponent turn");
      return;
    }

    fetch('/api/game/player-check-shot', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, password: password, point: point })
    });
  }
  /**
   * Player readiness handler
   */
  const handleCompletePlayground = () => {
    if (!gameStatus) return;

    if (!opponentStatus) return;

    if (gameStatus.status !== EnumGameStatus.PREPARE) return;

    const ships = GameService.ships;

    if (ships.length < MAX_SHIP) {
      alert('Не все корабли раставленні')
      return;
    }
    for (let i = 0; i < ships.length; i++) {
      handleUploadShips({ x: ships[i].col, y: ships[i].row });
    }

    fetch('/api/game/player-set-ready', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, password: password })
    });
  }
  /**
   * Socket Event Hook
   */
  useEffect(() => {
    if (token === undefined) {
      window.location.href = '/log-in';
    }
    if (password === undefined) {
      window.location.href = '/';
    }

    socket.connect();

    socket.on('connect', () => {
      socket.emit('game:connect', { token: token, password: password });
    })

    socket.on('response:game:event-turn', (evt) => {
      setGameTurn(evt.turn);
    })

    socket.on('response:game:get-status', (evt) => {
      setGameStatus(evt);
    })

    socket.on('response:opponent:get-status', (evt) => {
      setOpponentStatus(evt);
    })

    socket.on('response:game:points', (evt) => {
      setPlayerPlaygroundPoints(evt.player);
      setOpponentPlaygroundPoints(evt.opponent);
    })

    socket.on('response:game-error-connect', (evt) => {
      localStorage.removeItem('password');
      window.location.href = '/';
    });

    socket.on('response:player:points', (evt) => {
      setPlayerGamePoint(evt?.player);
      setOpponentGamePoint(evt?.opponent);
    });

    socket.on('response:messages', (evt) => {
      setMessages(evt.messages);
    });

    return () => {
      localStorage.removeItem('password');
      socket.disconnect();
    }
  }, [token, password]);

  return (
    <>
      <Header
        gameStatus={gameStatus}
        opponentStatus={opponentStatus}
        gameTurn={gameTurn}
        playersPoints={{
          player: playerGamePoint,
          opponent: opponentGamePoint
        }}
      />
      {opponentStatus === undefined ? (
        <>
          <TemplatePage>
            <Loader />
          </TemplatePage>
        </>
      ) : opponentStatus?.status === EnumOpponentStatus.NOT_CONNECTED ? (
        <>
          <TemplatePage>
            <Loader />
          </TemplatePage>
        </>
      ) : (
        <>
          <Stack direction='row' sx={{ margin: '2.5em' }}>
            <PlayerBoard
              gameStatus={gameStatus}
              callbackUploadShips={handleUploadShips}
              playerPlaygroundPoints={playerPlaygroundPoints}
            />
            <Menu
              gameStatus={gameStatus}
              opponentStatus={opponentStatus}
              callbackSetReady={handleCompletePlayground}
              callbackLeaveGame={handleLeaveGame}
            />
            <OpponentBoard
              gameStatus={gameStatus}
              opponentStatus={opponentStatus}
              callbackCheckShot={handleCheckShot}
              missedList={opponentPlaygroundPoints?.missedList}
              destroyedList={opponentPlaygroundPoints?.destroyedList}
            />
          </Stack>
          <Chat
            messageList={messages}
            callbackSendMessage={handleSendMessage}
          />
        </>
      )}
    </>
  )
}