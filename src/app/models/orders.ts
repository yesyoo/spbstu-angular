export interface IOrder {
    age?: string | null,
    birthDay?: string | null,
    cardNumber?: string,
    tourId?: string | null,
    userId?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    citizen?: string | null,
}

export interface IInfoUser {
    userId: string,
    firstName: string,
    lastName?: string,
    age?: number,
    birthDay?: string,
    citizen?: string,
}