/* ════════════════════════════════════════════════════════════════
   Félix Chaja Parfums — Sistema de Tipos TypeScript
   Arquitectura: Variables Subjetivas · Objetivas · Simbólicas
   ════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────
// CAPA I — VARIABLES DE GÉNERO (Punto de bifurcación del flujo)
// ─────────────────────────────────────────────────────────────────

/** Prefijo del sello de marca: W = Dama · M = Caballero · U = Unisex */
export type Gender = 'W' | 'M' | 'U';

// ─────────────────────────────────────────────────────────────────
// CAPA II — VARIABLES SUBJETIVAS (Emoción · Personalidad)
// ─────────────────────────────────────────────────────────────────

/** Estados emocionales que guían la composición (estados internos, no descriptores táctiles) */
export type EmotionId = 'elegante' | 'vitalidad' | 'seguro';

/**
 * Rasgos de carácter para Dama (W).
 * Diferenciados conceptualmente: Empoderada ≠ Audaz ≠ Misteriosa.
 */
export type PersonalityIdW =
  | 'empoderada'   // polo: Chipre / poder
  | 'romantica'    // polo: Floral blanco / seducción suave
  | 'audaz'        // polo: Gourmand-Oriental / riesgo calculado
  | 'misteriosa'   // polo: Oriental oscuro / reserva intelectual
  | 'natural';     // polo: Fougère-Acuático / autenticidad

/**
 * Rasgos de carácter para Caballero (M).
 * Dinámico ≠ Carismático ≠ Deportivo (diferenciación por polo aromático).
 */
export type PersonalityIdM =
  | 'vanguardista' // polo: Cítrico amargo / innovación
  | 'robusto'      // polo: Amaderado oscuro / solidez
  | 'sedicente'    // polo: Oriental especiado / autoridad silenciosa
  | 'deportivo'    // polo: Cítrico-Acuático / movimiento
  | 'minimalista'; // polo: Acuático mineral / esencialidad

export type PersonalityId = PersonalityIdW | PersonalityIdM;

// ─────────────────────────────────────────────────────────────────
// CAPA III — VARIABLES OBJETIVAS (Familia · Acorde · Concentración)
// ─────────────────────────────────────────────────────────────────

/** Ocho familias olfativas canónicas de alta perfumería */
export type FamilyId =
  | 'citrico'
  | 'floral'
  | 'amaderado'
  | 'oriental'
  | 'chipre'
  | 'fougere'
  | 'gourmand'
  | 'acuatico';

/** Concentración de la fragancia — determina el sufijo del sello */
export type IntensityId = 'edt' | 'edp' | 'extrait';

/**
 * Catálogo completo de acordes (6-9 por familia).
 * Cada ID es kebab-case del nombre de la materia prima.
 */
export type AccordId =
  // ── Cítrico (7) ─────────────────────────────────────────────
  | 'bergamota'
  | 'limon-siciliano'
  | 'mandarina'
  | 'yuzu'
  | 'pomelo-rosa'
  | 'naranja-amarga'
  | 'lima-persa'
  // ── Floral (9) ──────────────────────────────────────────────
  | 'jazmin-grandiflorum'
  | 'rosa-centifolia'
  | 'peonia'
  | 'ylang-ylang'
  | 'neroli'
  | 'iris-pallida'
  | 'gardenia'
  | 'tuberosa'
  | 'violeta-bourbon'
  // ── Amaderado (8) ───────────────────────────────────────────
  | 'vetiver-haitiano'
  | 'cedro-atlas'
  | 'sandalo-mysore'
  | 'oud-camboyano'
  | 'musgo-roble'
  | 'hinoki'
  | 'hiba'
  | 'guayaco'
  // ── Oriental (7) ────────────────────────────────────────────
  | 'ambar-gris'
  | 'vainilla-bourbon'
  | 'benjui-siam'
  | 'incienso-somali'
  | 'mirra'
  | 'labdanum'
  | 'opoponax'
  // ── Chipre (6) ──────────────────────────────────────────────
  | 'cuero-russie'
  | 'labdanum-ciste'
  | 'vetiver-seco'
  | 'bergamota-musgo'
  | 'patchouli-oscuro'
  | 'musgo-chipre'
  // ── Fougère (7) ─────────────────────────────────────────────
  | 'lavanda-provenza'
  | 'geranio-bourbon'
  | 'cumarina'
  | 'roble-alisamia'
  | 'bergamota-herbal'
  | 'vetiver-verde'
  | 'musgo-fougere'
  // ── Gourmand (6) ────────────────────────────────────────────
  | 'vainilla-cremosa'
  | 'caramelo-salado'
  | 'cafe-arabica'
  | 'cacao-bruto'
  | 'pralinee-almendra'
  | 'miel-acacia'
  // ── Acuático (6) ────────────────────────────────────────────
  | 'musgo-marino'
  | 'calone'
  | 'algas-atlantico'
  | 'sal-mineral'
  | 'violeta-mar'
  | 'ambrette';

// ─────────────────────────────────────────────────────────────────
// ESTADO GLOBAL DEL CONFIGURADOR
// ─────────────────────────────────────────────────────────────────

/**
 * PerfumeState — Fuente única de verdad del configurador.
 * Avanza secuencialmente; genero bifurca el árbol de personalidades.
 */
export interface PerfumeState {
  // Datos de contacto (Paso 1)
  nombre:       string;
  telefono:     string;
  // Selecciones del usuario
  genero:       Gender      | null;
  emocion:      EmotionId   | null;
  familia:      FamilyId    | null;
  personalidad: PersonalityId | null;
  acorde:       AccordId    | null;
  intensidad:   IntensityId | null;
  // Resultado generado al completar el flujo
  perfumeSello?:       string;   // "W190 FLORAL JASMIN EAU DE PARFUM"
  notaPerfumista?:     string;
  familiaCalculada?:   FamilyId; // familia sugerida por el motor olfativo
}

// ─────────────────────────────────────────────────────────────────
// RECORDS DE CATÁLOGO
// ─────────────────────────────────────────────────────────────────

/** Registro de emoción con vinculación a pirámide olfativa */
export interface EmotionRecord {
  id:            EmotionId;
  label:         string;
  description:   string;
  /** Familias sugeridas, ordenadas de mayor a menor probabilidad */
  olfactoryBias: FamilyId[];
  /** Notas de pirámide por defecto para esta emoción */
  pirSalida:     string[];
  pirCorazon:    string[];
  pirFondo:      string[];
}

/** Registro de personalidad con motor de pesos olfativos */
export interface PersonalityRecord {
  id:          PersonalityId;
  label:       string;
  description: string;
  polo:        string;     // "Cítrico / movimiento"
  arquetipo:   string;     // "El que actúa"
  accordBias:  AccordId[]; // acordes afinados a esta personalidad
  /** Pesos olfativos que se suman al motor de scoring */
  familyBoost: Partial<FamilyWeights>;
}

/** Registro de acorde con posición en pirámide y sesgo de género */
export interface AccordRecord {
  id:          AccordId;
  label:       string;         // "Bergamota de Calabria"
  labelShort:  string;         // "BERGAMOTA" — para el sello
  familia:     FamilyId;
  notas:       string;         // notas olfativas descriptivas
  description: string;
  genderBias:  Gender[];
  /** Posición típica en la pirámide olfativa */
  pyramid:     'salida' | 'corazon' | 'fondo';
}

/** Registro de familia olfativa con catálogo de 6-9 acordes */
export interface FamilyRecord {
  id:            FamilyId;
  label:         string;
  description:   string;
  accords:       AccordId[];    // 6-9 acordes por familia
  genderDefault: Gender[];
}

/** Registro de concentración e intensidad */
export interface IntensityRecord {
  id:            IntensityId;
  label:         string;        // "Eau de Parfum"
  sello:         string;        // "EAU DE PARFUM"
  description:   string;
  concentration: string;        // "15-20%"
  duracion:      string;        // "6-8 horas"
}

// ─────────────────────────────────────────────────────────────────
// MOTOR DE MAPEO OLFATIVO
// ─────────────────────────────────────────────────────────────────

/** Mapa de pesos numéricos por familia (mayor = mayor probabilidad) */
export type FamilyWeights = Record<FamilyId, number>;

/**
 * Estructura completa del motor de mapeo.
 * Los pesos de emoción + personalidad se suman para calcular
 * la familia de mayor afinidad del usuario.
 *
 * Ejemplo:
 *   Vitalidad (+4 cítrico) + Deportivo (+4 cítrico) = 8 cítrico → Salida cítrica
 */
export interface OlfactoryEngine {
  emotionWeights:      Record<EmotionId, Partial<FamilyWeights>>;
  personalityWeightsW: Record<PersonalityIdW, Partial<FamilyWeights>>;
  personalityWeightsM: Record<PersonalityIdM, Partial<FamilyWeights>>;
}

// ─────────────────────────────────────────────────────────────────
// RESULTADO PREMIUM
// ─────────────────────────────────────────────────────────────────

export interface OlfactoryPyramid {
  salida:   string[];  // notas de salida (top notes)
  corazon:  string[];  // notas de corazón (heart notes)
  fondo:    string[];  // notas de fondo (base notes)
}

/**
 * PremiumResult — Sello de Marca y Nota del Perfumista.
 * Generado por generatePremiumResult(state).
 *
 * @example
 * sello:          "W190 FLORAL JASMIN EAU DE PARFUM"
 * prefijo:        "W190"
 * notaPerfumista: "Una fragancia diseñada para..."
 */
export interface PremiumResult {
  sello:           string;
  prefijo:         string;
  familiaBase:     FamilyId;
  acordePrimario:  string;   // label del acorde principal en mayúsculas
  acordeSecundario: string;  // label del acorde secundario sugerido
  notaPerfumista:  string;
  piramide:        OlfactoryPyramid;
}
