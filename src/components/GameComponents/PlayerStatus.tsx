import Chip from '@mui/material/Chip';
import { EnumPlayerStatus } from '../../enum/game.enum';
import { IPlayerStatusProps as IProps } from "../../props/game.props";

const PlayerStatus = ({ status }: IProps) => {
  return (
    <>
      <Chip
        sx={{ margin: '1em' }}
        label={EnumPlayerStatus[status]}
        color={
          status === EnumPlayerStatus.Preparation
          ? 'primary'
          : status === EnumPlayerStatus.Ready 
          ? 'success'
          : status === EnumPlayerStatus.InGame
          ? 'secondary'
          : status === EnumPlayerStatus.Finish
          ? 'info' : 'default'
        }
      />
    </>
  )
}

export default PlayerStatus;