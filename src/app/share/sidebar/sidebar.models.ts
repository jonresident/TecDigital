export interface FilterDataUno {
    idUser: string;
    fecha: string;
    departamento: string;
}

export interface FilterDataDos {
    idUser: string;
    fecha: string;
    departamento: string;
}

export interface FilterDataTres {
    idUser: string;
    fecha: string;
    departamento: string;
}

export interface Cycle {
    ciclo: string;
    semanas: [];
}

export enum RoutesData {
    ROUTE = "Ruta",
    CYCLE = "Ciclo",
    WEEK = "Semana"   
}