import { Role } from "./role.enum";


export interface Usuario{
    uid: string;
    email: string;
    role?: Role;

    estado ?: number;
}