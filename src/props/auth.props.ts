export interface IAuthProps {
  title: string;
  children: string | JSX.Element | JSX.Element[] | any;
}

export interface ILoginProps {
  handleSave: (token: string) => void
}