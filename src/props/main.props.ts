import { GridColDef } from '@mui/x-data-grid'
import { 
  EnumHomeWindow,
  EnumAlertType
} from "../enum/main.enum";

export interface IAsideProps {
  currentWindow: EnumHomeWindow;
  callbackChangeWindow: (window: EnumHomeWindow) => void;
}

export interface IAlertProps {
  id: string;
  variant: EnumAlertType;
  message: string;
  callbackClose: (id: string) => void;
}

export interface IAlertProvider {
  children: string | JSX.Element | JSX.Element[] | any
}

export interface ILoaderProps {
  active?: true | undefined;
  children: string | JSX.Element | JSX.Element[] | any;
}

export interface ITableProps {
  rows: any[];
  columns: GridColDef[];
  pageSize: number;
}
