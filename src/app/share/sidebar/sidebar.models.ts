export interface PathData {
    ruta: string;
    ciclos: Cycle[];
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