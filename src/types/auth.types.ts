export type LogIn = {
  login: string,
  password: string
}

export type SignIn = LogIn & {
  username: string,
}