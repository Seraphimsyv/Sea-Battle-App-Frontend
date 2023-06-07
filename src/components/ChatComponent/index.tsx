import {
  useState
} from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Message from "./Message";
import GameService from '../../service/game-service';
import { Message as MessageType } from '../../types/game.types';
import { IChatProps as IProps } from "../../props/game.props";

const ChatComponent = ({ gameId, messages }: IProps) => {
  const [message, setInput] = useState('');

  const handleChange = (evt: any) => {
    setInput(evt.currentTarget.value);
  }

  const handleSend = () => {
    const token = window.localStorage.getItem('token');

    if (message.length === 0) return;

    if (!token) return;

    GameService.sendMessage({ token, gameId, message })
    .then(res => {
      console.log(res)
      setInput('');
    })
    .catch(err => console.log(err))
  }
  
  return (
    <>
      <div
        style={{
          margin: 'auto'
        }}
      >
        <Paper
          style={{
            width: "100%",
            margin: 10,
            overflowY: "scroll",
            height: "250px"
          }}
        >
          {messages.map((msg: MessageType, key) => (
            <Message
              key={key}
              username={msg.username}
              message={msg.message}
            />
          ))}
        </Paper>
        <div 
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            label="type here..."
            variant='standard'
            value={message}
            onChange={handleChange}
          />
          <Button
            variant='contained'
            endIcon={<SendIcon />}
            onClick={handleSend}
          />
        </div>
      </div>
    </>
  )
}

export default ChatComponent;