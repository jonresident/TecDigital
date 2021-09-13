export interface FilterData {
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