export interface IUser {
    login: string,
    email?: string,
    psw: string,
    cardNumber?: string,
    token?: string | null,
    id?: string | null,
    role?: Role | null
}
export type Role = 'admin' | 'superadmin' | 'user'
