import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ITableProps } from '../../props/main.props';


const TableComponent = ({ rows, columns, pageSize }: ITableProps) => {
  return (
    <>
      <Box
        sx={{
          width: '90%',
          height: '100%',
          margin: 'auto',
          marginTop: '1em'
        }}
      >
        <DataGrid
          sx={{
            minHeight: '65vh'
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize
              }
            }
          }}
          localeText={{ noRowsLabel: 'No data' }}
          pageSizeOptions={[pageSize]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

export default TableComponent;