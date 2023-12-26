export interface IUser {
    login: string,
    email?: string,
    psw: string,
    cardNumber?: number,
    token?: string | null,
    id?: string | null,
    role?: Role | null,
}

export interface IUserInfo {
    firstName?: string,
    lastName?: string,
    citizen?: string,
    age?: number,
    birthDay?: string,
    cardNumber?: number,
    userId?: string | null
}
export type Role = 'admin' | 'superadmin' | 'user'

export type User = IUser | null
