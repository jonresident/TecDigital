export interface BodyCrearUsuario {
    username: string,
    first_name: string,
    email: string,
    password: string,
    rol: string,
    is_active: boolean
}

export interface BodyActualizarUsuario {
    id: string,
    username: string,
    first_name: string,
    email: string,
    rol: string,
    is_active: boolean
}

export interface Usuario {
    id: string;
    first_name: string;
    is_superuser: boolean;
    last_login: Date;
    date_joined: Date;
    username: string;
    email: string;
    rol: string;
    is_active: boolean
}

export enum Roles {
    ADMIN = "ADMINISTRADOR",
    GUEST = "VISITANTE"
}

export function validateEmailFn(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
}