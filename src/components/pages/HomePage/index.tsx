import * as React from 'react';
import { useState } from 'react';
import { TemplatePage } from '../TemplatePage';

interface IMainProps {
  callbackSetCreate: () => void,
  callbackSetConnect: () => void,
  callbackLogout: () => void
}

const MainWindow : React.FC<IMainProps> = (props: IMainProps) => {
  return (
    <>
      <button onClick={props.callbackSetCreate}>Create game</button>
      <button onClick={props.callbackSetConnect}>Connect game</button>
      <button onClick={props.callbackLogout}>Log-out</button>
    </>
  )
}

interface ICreateProps {
  callbackClose: () => void
}

const CreateWindow : React.FC<ICreateProps> = (props: ICreateProps) => {
  const [value, setValue] = useState("");

  const handleSetValue = (evt: React.FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  }

  return (
    <>
      <input type="text" onChange={handleSetValue} />
      <input type="submit" value="Create" onClick={() => {
        localStorage.setItem('password', value);
        window.location.href = '/game'
      }} />
      <input type="button" value="Close" onClick={props.callbackClose} />
    </>
  )
}

interface IConnectProps {
  callbackClose: () => void
}

const ConnectWindow : React.FC<IConnectProps> = (props: IConnectProps) => {
  const [value, setValue] = useState("");

  const handleSetValue = (evt: React.FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  }

  return (
    <>
      <input type="text" onChange={handleSetValue} />
      <input type="submit" value="Connect" onClick={() => {
        localStorage.setItem('password', value);
        window.location.href = '/game'
      }} />
      <input type="button" value="Close" onClick={props.callbackClose} />
    </>
  )
}

export const HomePage  = () => {
  const [currentWindow, setWindow] = useState<0 | 1 | 2 | 4>(0);

  return (
    <>
      <TemplatePage>
        <div className='div__menu'>
          {currentWindow === 0 ? <>
            <MainWindow 
              callbackSetCreate={() => setWindow(1)}
              callbackSetConnect={() => setWindow(2)}
              callbackLogout={() => {
                localStorage.clear();
                window.location.href = '/log-in';
              }}
            />
          </> : currentWindow === 1 ? <>
            <CreateWindow
              callbackClose={() => setWindow(0)}
            />
          </> : currentWindow === 4 ? <>
          </> : <>
            <ConnectWindow
              callbackClose={() => setWindow(0)}
            />
          </>}
        </div>
      </TemplatePage>
    </>
  )
}