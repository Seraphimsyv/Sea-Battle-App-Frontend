import {
  useState,
  useEffect,
} from 'react';
import {
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import TableComponent from "../../components/TableComponent";
import LoaderComponent from '../../components/LoaderComponent';
import ConnectionComponent from '../../components/ConnectionComponent';
import GameService from '../../service/game-service';

const cols: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 3
  },
  {
    field: 'name',
    headerName: 'Name',
    sortable: true,
    flex: 3
  },
  {
    field: 'privacy',
    headerName: 'Privacy',
    sortable: true,
    filterable: false,
    renderCell: (params) => {
      switch (params.value) {
        case true:
          return <SecurityIcon color='error' />
        case false:
          return <PublicIcon color='info' />
      }
    },
    flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    valueGetter: (params: GridValueGetterParams) => {
      switch (params.value) {
        case 0: 
          return 'Waiting';
        case 1:
          return 'Preparation';
        case 2:
          return 'In Game';
        default:
          return 'Finish';
      }
    },
    flex: 1
  },
  {
    field: 'options',
    headerName: '',
    sortable: false,
    renderCell: (params) => (
      <>
        <ConnectionComponent params={params} />
      </>
    ),
    flex: 3
  }
];

const GamesPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [games, setGames] = useState<Object[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      setTimeout(() => {
        GameService.loadGames(token)
        .then(data => {
          setLoaded(true);
          setGames(data);
        });
      }, 0)
    }
  })

  return (
    <>
      {loaded ? (
        <>
          <TableComponent
            rows={games}
            columns={cols}
            pageSize={10}
          />
        </>
      ) : (
        <>
          <LoaderComponent active>
            Loading
          </LoaderComponent>
        </>
      )}
    </>
  )
}

export default GamesPage;