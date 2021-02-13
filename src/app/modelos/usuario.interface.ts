export interface Usuario{
    uid: string;
    email: string;
    role?: Role;
}

export enum Role {
    Cliente,
    Cajero,
    Cocinero,
    Delivery,
    Admin
}
