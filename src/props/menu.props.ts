export interface IMainProps {
  callbackSetCreate: () => void,
  callbackSetConnect: () => void,
  callbackLogout: () => void
}

export interface ICreateProps {
  callbackClose: () => void
}

export interface IConnectProps {
  callbackClose: () => void
}