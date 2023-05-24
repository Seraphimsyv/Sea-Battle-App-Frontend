import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

interface IProps {
  children: React.ReactNode
}

export const TemplatePage : React.FC<IProps> = ({ children } : IProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 'auto',
            width: 280,
            height: 280,
          },
          height: '100vh',
          width: '100vw',
          margin: 'auto'
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'space-between',
            padding: '1em'
          }}
        >
          <Box sx={{ margin: 'auto' }}>
            {children}
          </Box>
        </Paper>
      </Box>
    </>
  )
}