import {
  useState,
  useEffect
} from 'react';
import {
  GridColDef,
} from '@mui/x-data-grid';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import TableComponent from "../../components/TableComponent";
import LoaderComponent from '../../components/LoaderComponent';
import AccountService from '../../service/account-service';

const cols: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'steps',
    headerName: 'Steps',
    sortable: true,
  },
  {
    field: 'winnerStatus',
    headerName: 'Winner',
    sortable: true,
    renderCell: (params) => {
      switch (params.value) {
        case 1:
          return <DoneOutlineIcon color='success' />
        case 0:
          return <DoDisturbIcon color='error' />
      }
    }
  },
  {
    field: 'winnerPoints',
    headerName: 'Winner Points',
    sortable: true,
  },
  {
    field: 'loserPoints',
    headerName: 'Loser Points',
    sortable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    sortable: true,
    flex: 3
  },
  {
    field: 'finishAt',
    headerName: 'Finished',
    sortable: true,
    flex: 3
  }
];

type History = {
  createdAt: Date,
  finishAt: Date,
  id: number,
  steps: number,
  loserPoints: number,
  winnerPoints: number,
  winnerStatus: 0 | 1,
}

const StatisticPage = () => {
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!token) return;

    AccountService.loadHistory(token)
    .then(res => setHistory(res))
  })

  return (
    <>
      {history.length > 0 ? (
        <>
          <TableComponent
            rows={history}
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

export default StatisticPage;