import { useState } from 'react';
import Stack from '@mui/material/Stack';
import HeaderComponent from "../../components/HeaderComponent";
import AsideMenuComponent from "../../components/AsideMenuComponent";
import CreatePage from '../CreatePage';
import GamesPage from '../GamesPage';
import StatisticPage from '../StatisticPage';

import { EnumHomeWindow } from '../../enum/main.enum';

const HomePage = () => {
  const [currentWindow, setWindow] = useState(EnumHomeWindow.Creation);

  return (
    <>
      <HeaderComponent />
      <Stack
        sx={{
          height: '100%',
          width: '100%',
          justifyContent: 'space-between'
        }}
        direction='row'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '25%',
            background: 'whitesmoke',
            padding: '1em'
          }}
        >
          <AsideMenuComponent
            currentWindow={currentWindow}
            callbackChangeWindow={(window) => setWindow(window)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {currentWindow === EnumHomeWindow.Creation ? (
            <>
              <CreatePage />
            </>
          ) : currentWindow === EnumHomeWindow.GameList ? (
            <>
              <GamesPage />
            </>
          ) : currentWindow === EnumHomeWindow.Statistic ? (
            <>
              <StatisticPage />
            </>
          ) : (
            <>Default</>
          )}
        </div>
      </Stack>
    </>
  )
}

export default HomePage;