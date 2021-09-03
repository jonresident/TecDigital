export interface IndicadorUnoDetail {
    faseDiagnostico: number;
    faseMapeo: number;
    faseEvaluacion: number;
    faseConsolidacion: number;
    faseDespegue: number;
    nivel_1_basicas: number;
    nivel_2_basicas: number;
    nivel_3_basicas: number;
    nivel_4_basicas: number;
    nivel_1_avanzadas: number;
    nivel_2_avanzadas: number;
    nivel_3_avanzadas: number;
    nivel_4_avanzadas: number;
    beneficiario_departamento: Beneficiario_departamento;
    tabla: Tabla;
}

export interface Tabla {
    NombreEmpresa: string[];
    Direccion: string[];
    Departamento: string[];
    Telefono: string[];
    CorreoElectronico: string[];
    NombresRepresentanteLegal: string[];
    ApellidosRepresentanteLegal: string[];
    NombresPersonaEncargadaProceso: string[];
    ApellidosPersonaE: string[];
    CorreoElectronicoPersonaEncargadaProceso: string[];
    TelefonoPersonaEncargadaProceso: string[];
    SitioWeb: string[];
}

export interface Beneficiario_departamento {
    Departamento: string[];
    Cantidad: number[];
}

export interface IndicadorDosDetail {
    empresasRegistradas: number;
    portafoliosOfertados: number;
    sectores: Sectores;
    oferentesPorTipoEmpresas: OferentesPorTipoEmpresas;
    cantidadTiposApoyo: CantidadTiposApoyo;
}

export interface Sectores {
    sectores: string[];
    cantidad: number[];
}

export interface OferentesPorTipoEmpresas {
    emprendedor: number;
    microempresas: number;
    empresaspequenas: number;
    medianasempresas: number;
    grandesempresas: number;
    gobierno: number;
    academia: number;
    entidadessoporte: number;
    personasnaturales: number;
    otrosusuarioobjetivo: number;
}

export interface CantidadTiposApoyo {
    capacitacionformacion: number;
    plataformasbasesdatosestudios: number;
    asesoriaconsultoriaasistenciatecnica: number;
    relacionamiento: number;
    financiero: number;
    reembolsable: number;
    contrapartida: number;
    otrostipoapoyo: number;
}