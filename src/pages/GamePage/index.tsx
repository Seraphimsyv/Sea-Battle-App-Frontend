import {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import HeaderComponent from '../../components/HeaderComponent';
import LoaderComponent from '../../components/LoaderComponent';
import { GameManager } from '../../manager/game-manager';
import { GameService } from '../../service/game-service';
import { AlertContext } from '../../manager/alert-manager';
import { EnumAlertType } from '../../enum/main.enum';
import {
  EnumGameStatus
} from '../../enum/game.enum';
import { Location, GameInfo } from '../../types/game.types';
import { InfoPanel, PlayerPlayground, OpponentPlayground } from '../../components/GameComponents';
import { AccountService } from '../../service/account-service';

const CELL_SIZE = 30;
const CANVAS_SIZE = 330;

const GamePage = () => {
  // Player
  const [playerId, setPlayerId] = useState<number | undefined>(undefined);
  // Game


  const { addAlert } = useContext(AlertContext);
  const { gameId } = useParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameInfo | undefined>(undefined);
  // Canvas
  const playerCanvasRef = useRef<HTMLCanvasElement>(null);
  const opponentCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<HTMLDivElement | null>(null);
  // Ships
  const [smallCount, setSmallCount] = useState(3);
  const [mediumCount, setMediumCount] = useState(2);
  const [largeCount, setLargeCount] = useState(1);

  
  const SHIP_COUNT = {
    small: {
      current: smallCount,
      default: 1,
    },
    medium: {
      current: mediumCount,
      default: 2,
    },
    large: {
      current: largeCount,
      default: 3,
    },
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!token) return;

    AccountService.loadProfile(token)
    .then(res => setPlayerId(res.id))
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token && gameId && playerId) {
      setTimeout(() => {
        GameService.check({ token, gameId })
        .then(() => {

          const sock = GameService.getSocket(token);
          sock.emit('joinGame', { gameId, playerId });
          setSocket(sock)
          setLoaded(true);
        })
        .catch(err => {
          addAlert(EnumAlertType.error, err.message);
          setTimeout(() => window.location.href = '/', 1500);
        });
      }, 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, playerId])

  useEffect(() => {
    if (socket) {
      socket.on('gameInfo', (evt) => {
        setGameInfo(evt);
      })
    }

  }, [gameId, socket])


  const handleRemoveShip = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    evt.preventDefault();

    if (!gameInfo) return;

    if (gameInfo.info.status !== EnumGameStatus.Preparation) return;

    const canvas = playerCanvasRef.current;
    
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = evt.clientX - rect.left;
    const offsetY = evt.clientY - rect.top;

    const col = Math.floor(offsetX / CELL_SIZE);
    const row = Math.floor(offsetY / CELL_SIZE);

    GameManager.del({x: col, y: row})
    .then(size => {
      if (size === 1) {
        setSmallCount(smallCount + 1);
        return;
      };

      if (size === 2) {
        setMediumCount(mediumCount + 1);
        return;
      };

      if (size === 3) {
        setLargeCount(largeCount + 1);
        return;
      };
    })
  }
  
  const handleDragStart = (shipSize: number, evt: React.DragEvent<HTMLDivElement>) : void => {
    if (!gameInfo) return;

    if (gameInfo.info.status !== EnumGameStatus.Preparation) return;

    if (shipSize === 1 && smallCount === 0) return;

    if (shipSize === 2 && mediumCount === 0) return;

    if (shipSize === 3 && largeCount === 0) return;

    const target = evt.target as HTMLDivElement;
    evt.dataTransfer?.setData("text/plain", target.id);
    evt.dataTransfer?.setData("text/size", String(shipSize));

    setIsDragging(true);
    setDraggedElement(target)
  }

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedElement(null);
  }

  const handleDragEnter = (evt: React.DragEvent<HTMLCanvasElement>) => {
    const target = evt.target as HTMLDivElement;
    evt.dataTransfer?.setData("text/plain", target.id);
  }

  const handleDragOver = (evt: React.DragEvent<HTMLCanvasElement>) => {
    evt.preventDefault();
  }

  const handleDragLeave = (evt: React.DragEvent<HTMLCanvasElement>) => {
    evt.preventDefault();
  }

  const handleDragDrop = (evt: React.DragEvent<HTMLCanvasElement>) => {
    evt.preventDefault();

    if (!isDragging) return;
    if (!draggedElement) return;

    const data = evt.dataTransfer?.getData("text/plain");
    const size = Number(evt.dataTransfer?.getData("text/size"));

    if (data) {
      const col = Math.floor(evt.nativeEvent.offsetX / CELL_SIZE);
      const row = Math.floor(evt.nativeEvent.offsetY / CELL_SIZE);


      if ((col === 0 || row === 0) || (row + size > 11)) {
        addAlert(EnumAlertType.warning, 'Out playground');
        return;
      } else {
        const locations : Location[] = []

        switch (size) {
          case 1:
            locations.push({ x: col, y: row });
            break;
          case 2:
            locations.push(
              { x: col, y: row },
              { x: col, y: row + 1 }
            );
            break;
          case 3:
            locations.push(
              { x: col, y: row },
              { x: col, y: row + 1 },
              { x: col, y: row + 2 }
            );
            break;
        }

        GameManager.add(locations, size)
        .then(() => {
          switch (size) {
            case 1: 
              setSmallCount(smallCount - 1);
              break;
            case 2: 
              setMediumCount(mediumCount - 1);
              break;
            case 3: 
              setLargeCount(largeCount - 1);
              break; 
          }
        })
        .catch(err => addAlert(EnumAlertType.warning, `Too close another ship - ${err}`))
      }
    }
  }

  const handleOnClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameInfo && gameInfo.info.status !== EnumGameStatus.InGame) return;

    const canvas = opponentCanvasRef.current;
    
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = evt.clientX - rect.left;
    const offsetY = evt.clientY - rect.top;

    const col = Math.floor(offsetX / CELL_SIZE);
    const row = Math.floor(offsetY / CELL_SIZE);
    const location = { x: col, y: row };

    const token = window.localStorage.getItem('token');

    if (token && gameId) {
      GameService.checkShot({ token, gameId, location })
      .then(res => addAlert(EnumAlertType.info, res.msg))
      .catch(err => addAlert(EnumAlertType.error, err.message));
    }
  }

  const handleSetReady = () => {
    const token = window.localStorage.getItem('token');

    if (token && gameId && playerId) {
      const ships = GameManager.ships;

      if (smallCount !== 0 || mediumCount !== 0 || largeCount !== 0) {
        addAlert(EnumAlertType.warning, 'Not all ships are placed!');
      } else {
        GameService.addShip({ token, gameId, ships })
        .then(() => {
          GameService.updateStatus({ token, gameId, playerId })
          .then(res => addAlert(EnumAlertType.success, res.msg))
          .catch(err => addAlert(EnumAlertType.error, err.message));
        })
        .catch(err => console.log(err))
      }
    }
  }

  return (
    <>
      {gameInfo && loaded ? (
        <>
          <HeaderComponent />
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <div
              id="playgrounds"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
              }}
            >
              <PlayerPlayground
                gameInfo={gameInfo}
                playerId={playerId}
                count={SHIP_COUNT}
                canvasRef={playerCanvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                cellSize={CELL_SIZE}
                callbackContextMenu={handleRemoveShip}
                callbackDragEnter={handleDragEnter}
                callbackDragOver={handleDragOver}
                callbackDragLeave={handleDragLeave}
                callbackOnDrop={handleDragDrop}
                callbackDragStart={handleDragStart}
                callbackDragEnd={handleDragEnd}
              />
              {gameInfo && gameInfo.info.status !== EnumGameStatus.Waiting ? (
                <>
                  <OpponentPlayground
                    canvasRef={opponentCanvasRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                    cellSize={CELL_SIZE}
                    onClick={handleOnClick}
                  />
                </>
              ) : (
                <>
                  <LoaderComponent active>
                    Waiting for an opponent
                  </LoaderComponent>
                </>
              )}
            </div>
            {gameInfo && (
              <>
                <InfoPanel
                  gameInfo={gameInfo}
                  callbackPlayerStatus={handleSetReady}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            id="container__game"
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <LoaderComponent active>
              Connection
            </LoaderComponent>
          </div>
        </>
      )}
    </>
  )
}

export default GamePage;