import * as React from 'react';
import { useState, createContext } from 'react';

import {
  EnumAlertType
} from '../enum/main.enum';

import {
  Alert,
  AlertContextValue
} from '../types/main.types';

import { IAlertProvider } from '../props/main.props';

const AlertContext = createContext<AlertContextValue>({
  alerts: [],
  addAlert: () => {},
  remAlert: () => {}
});

const useAlerts = () => React.useContext(AlertContext);

const AlertProvider = ({ children }: IAlertProvider) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (variant: EnumAlertType, message: string) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      variant,
      message
    };

    setAlerts((lastAlerts) => [...lastAlerts, newAlert]);

    setTimeout(() => {
      remAlert(newAlert.id)
    }, 5000)
  }

  const remAlert = (id: string) => {
    setAlerts((lastAlerts) => lastAlerts.filter((alert) => alert.id !== id));
  }

  const alertContextValue: AlertContextValue = {
    alerts,
    addAlert,
    remAlert
  }

  return (
    <AlertContext.Provider value={alertContextValue}>
      {children}
    </AlertContext.Provider>
  )
}

export { AlertProvider, AlertContext, useAlerts }