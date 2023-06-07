import ReactDOM from 'react-dom';
import {
  useEffect
} from 'react';
import Alert from '@mui/material/Alert';
import { EnumAlertType } from '../../enum/main.enum';
import { IAlertProps } from '../../props/main.props';

const AlertComponent = (props: IAlertProps) => {
  const container = window.document.createElement('div');
  const root = window.document.getElementById('alert-root');

  useEffect(() => {
    
    if (root) {
      root.appendChild(container);
    }

    return () => {
      if (root) {
        root.removeChild(container)
      }
    }
  })

  return ReactDOM.createPortal(
    <Alert 
      id="alert"
      severity={props.variant === EnumAlertType.error
        ? 'error' : props.variant === EnumAlertType.info
        ? 'info' : props.variant === EnumAlertType.success
        ? 'success' : 'warning'}
      sx={{
        margin: '1em',
        width: 'max-content'
      }}
      onClose={() => props.callbackClose(props.id)}
    >
      {props.message}
    </Alert>,
    container
  )
}

export default AlertComponent;