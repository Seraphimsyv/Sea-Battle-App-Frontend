import { useState } from 'react';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {
  Message
} from '../../../../types';
import {
  GameChatProps as PropsTypes
} from '../../../../props/game.props';

export const Chat = (props: PropsTypes) => {
  const [value, setValue] = useState('');
  /**
   * 
   */
  const handleSetValue = (evt: any) => {
    setValue(evt.currentTarget.value);
  }
  /**
   * 
   */
  const handleSendMessage = () => {
    setValue('');
    props.callbackSendMessage(value);
  }

  return (
    <>
      <Stack direction='column' sx={{ height: '100%', maxHeight: '35%', display: 'flex', justifyContent: 'space-between' }}>
        <Stack id="chat" direction='column' sx={{ padding: '1em', overflowY: 'scroll' }}>
          {props.messageList.map((value: Message, key) => (
            <p key={key}>{value.username} - {value.message}</p>
          ))}
        </Stack>
        <Stack direction='row' sx={{ display: 'flex', margin: '1em', marginBottom: '1em!important' }}>
          <TextField
            sx={{
              width: '100%'
            }}
            required
            label="Message"
            value={value}
            onChange={handleSetValue}
          />
          <Button
            variant='outlined'
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </>
  )
}