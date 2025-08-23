import { tipoUser } from "./tipoUser";

export interface User{
    id: string,
    name: string;
    surname: string;
    age: number;
    dni: number;
    average: number;
    email: string;
    password: string;
    role: tipoUser;
}

export interface Course{
    id: Number,
    name: String,
    code: String,
    credits: number
}