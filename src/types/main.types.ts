import { EnumAlertType } from '../enum/main.enum';

export type Alert = {
  id: string,
  variant: EnumAlertType,
  message: string
}

export type AlertContextValue = {
  alerts: Alert[],
  addAlert: (variant: EnumAlertType, message: string) => void,
  remAlert: (id: string) => void
}