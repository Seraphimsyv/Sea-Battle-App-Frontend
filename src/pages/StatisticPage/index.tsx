import {
  useState
} from 'react';
import {
  GridColDef,
} from '@mui/x-data-grid';
import TableComponent from "../../components/TableComponent";
import LoaderComponent from '../../components/LoaderComponent';

const cols: GridColDef[] = [];

const StatisticPage = () => {
  const [history, setHistory] = useState([]);
  return (
    <>
      {history.length > 0 ? (
        <>
          <TableComponent
            rows={[]}
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