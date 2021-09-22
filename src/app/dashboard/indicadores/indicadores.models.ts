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
    categoria: string[];
    TamanoEmpresa: string[];
    FechaFinDatosBasicos: Date[];
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

export interface IndicadorTresDetail { 
    cantidad_emails: number;
    cantidad_telefono: number;
    cantidad_registrado: number;
    fuente_leads: number;
    fuente_referidos: number;
    fuente_ingresos: number;
    informe_tecnalia: InformeTecnalia;
    datos_leads: DatosLeads;
    
}

export interface InformeTecnalia {
    "depuracion representante legal": number;
    "empresas registradas en la plataforma": number;
    "en contacto activo (telefono - whatsapp) ": number;
    "intentos de contacto sin respuesta";
    "por contactar": number;
    "registrado como oferente": number;
}

export interface DatosLeads {
    fecha_creacion_lead: Date;
    nombre: string;
    genero_municipio: string;
    mail: string;
    telefono: string;
    contacto_previo: string;
    fecha_contacto_anterior: Date;
    fecha_nuevo_contacto: Date;
}