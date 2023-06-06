import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { ILoaderProps } from '../../props/main.props';

const LoaderComponent = ({ active, children }: ILoaderProps) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 3) {
        setCount(1);
      } else {
        setCount(count + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [count])

  return (
    <>
      {active && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <CircularProgress sx={{ margin: 'auto' }} />
          <Typography variant='h5' sx={{ fontSize: '20px', marginTop: '1em' }}>
            {children}
            {Array(count).fill(null).map((v, k) => '.')}
          </Typography>
        </div>
      )}
    </>
  )  
}

export default LoaderComponent;