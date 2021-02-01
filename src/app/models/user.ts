import { IUser } from "../interfaces/i.user";

export class User implements IUser {
    id: number;
    login: string;
    familiya: string;
    imya: string;
    email: string;
    password1: string;
    password2: string;

}