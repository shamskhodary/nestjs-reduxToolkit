export interface IUser {
 id: number
 username: string
 email: string
 password: string
 gender: 'male' | 'female'
 createdAt: Date
 updatedAt: Date
}

export interface IUserState {
  user: IUser | null
  isLogged: boolean
  error: string
}
