import { IMessageProps as IProps } from "../../props/game.props";

const Message = ({ username, message }: IProps) => {
  return (
    <>
      <p>{username} - {message}</p>
    </>
  )
}

export default Message;