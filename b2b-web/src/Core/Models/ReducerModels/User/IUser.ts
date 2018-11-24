import { ISubscription } from './ISubscription';

export interface IUser {
    id: string,
    name: string,
    lastName: string,
    userName: string,
    email: string,
    subscription: ISubscription,
    bill: number,
    userRoles: string[]
}