/* ════════════════════════════════════════════════════════════════
   Félix Chaja Parfums — Motor de Resultados Premium
   generatePremiumResult(state) → PremiumResult

   Arquitectura:
   1. Motor de Scoring Olfativo  → calcula familia de máxima afinidad
   2. Generador de Sello         → [Prefijo][ID] [ACORDE1] [ACORDE2] [CONCENTRACIÓN]
   3. Nota del Perfumista        → descripción narrativa dinámica
   4. Pirámide Olfativa          → notas de salida / corazón / fondo
   ════════════════════════════════════════════════════════════════ */

import {
  ACORDES_CATALOG,
  EMOTION_WEIGHTS,
  INTENSIDADES,
  PERSONALIDADES_M,
  PERSONALIDADES_W,
  PERSONALITY_WEIGHTS_M,
  PERSONALITY_WEIGHTS_W,
  ZERO_WEIGHTS,
} from '@/data/perfume.data';

import type {
  AccordId,
  FamilyId,
  FamilyWeights,
  Gender,
  IntensityId,
  OlfactoryPyramid,
  PersonalityIdM,
  PersonalityIdW,
  PerfumeState,
  PremiumResult,
} from '@/types/perfume.types';

// ─────────────────────────────────────────────────────────────────
// 1. MOTOR DE SCORING OLFATIVO
// ─────────────────────────────────────────────────────────────────

/**
 * Fusiona dos mapas de pesos sumando sus valores numéricos.
 * Base para el algoritmo de scoring que combina Emoción + Personalidad.
 */
function mergeWeights(
  base: FamilyWeights,
  delta: Partial<FamilyWeights>
): FamilyWeights {
  const result = { ...base };
  for (const [key, value] of Object.entries(delta) as [FamilyId, number][]) {
    result[key] = (result[key] ?? 0) + value;
  }
  return result;
}

/**
 * Calcula la familia olfativa de máxima afinidad usando el sistema de pesos.
 *
 * Algoritmo:
 *   scores = emotionWeights[emocion] + personalityWeights[personalidad]
 *   → retorna la familia con mayor puntuación acumulada
 *
 * Si el usuario ya seleccionó una familia en el configurador, ésta prevalece.
 *
 * @example
 *   emocion: 'vitalidad'   (+5 citrico, +3 acuatico)
 *   personalidad: 'deportivo' (+5 citrico, +4 acuatico)
 *   resultado: citrico (10 pts) → salida cítrica recomendada
 */
function calculateOlfactoryFamily(state: PerfumeState): FamilyId {
  // Si el usuario eligió familia manualmente, respetamos su elección
  if (state.familia) return state.familia;

  let scores = ZERO_WEIGHTS();

  // Suma pesos de emoción
  if (state.emocion) {
    const eWeights = EMOTION_WEIGHTS[state.emocion] ?? {};
    scores = mergeWeights(scores, eWeights);
  }

  // Suma pesos de personalidad (bifurcado por género)
  if (state.personalidad) {
    const pWeights =
      state.genero === 'W'
        ? (PERSONALITY_WEIGHTS_W[state.personalidad as PersonalityIdW] ?? {})
        : (PERSONALITY_WEIGHTS_M[state.personalidad as PersonalityIdM] ?? {});

    scores = mergeWeights(scores, pWeights);
  }

  // Retorna la familia con mayor puntuación
  const sorted = (Object.entries(scores) as [FamilyId, number][]).sort(
    ([, a], [, b]) => b - a
  );

  return sorted[0]?.[0] ?? 'amaderado';
}

// ─────────────────────────────────────────────────────────────────
// 2. GENERADOR DE SELLO DE MARCA
// ─────────────────────────────────────────────────────────────────

/**
 * Devuelve el labelShort del acorde en mayúsculas.
 * Fallback al id si el acorde no existe en el catálogo.
 */
function getAccordShortLabel(accordId: AccordId | null): string {
  if (!accordId) return 'SIGNATURE';
  return (ACORDES_CATALOG[accordId]?.labelShort ?? accordId).toUpperCase();
}

/**
 * Selecciona el acorde secundario sugerido basándose en la familia calculada.
 * Elige el primer acorde de la familia que NO sea el acorde principal.
 */
function getSuggestedSecondaryAccord(
  state: PerfumeState,
  familia: FamilyId
): string {
  const personalidadRecord =
    state.genero === 'W'
      ? PERSONALIDADES_W[state.personalidad as PersonalityIdW]
      : PERSONALIDADES_M[state.personalidad as PersonalityIdM];

  if (personalidadRecord?.accordBias?.length) {
    // Busca el primer acorde del bias que no sea el acorde principal
    const secondary = personalidadRecord.accordBias.find(
      (a) => a !== state.acorde
    );
    if (secondary) return getAccordShortLabel(secondary);
  }

  // Fallback: label de familia en mayúsculas
  const familiaLabels: Record<FamilyId, string> = {
    citrico:   'CÍTRICO',
    floral:    'FLORAL',
    amaderado: 'AMADERADO',
    oriental:  'ORIENTAL',
    chipre:    'CHIPRE',
    fougere:   'FOUGÈRE',
    gourmand:  'GOURMAND',
    acuatico:  'ACUÁTICO',
  };
  return familiaLabels[familia] ?? familia.toUpperCase();
}

/**
 * Genera el prefijo del sello con género e ID aleatorio de 3 dígitos.
 *
 * Estructura: [Inicial de género][ID 100-999]
 * @example 'W' + 190 → 'W190' | 'M' + 342 → 'M342'
 */
function generatePrefijo(genero: Gender | null): string {
  const initial = genero === 'W' ? 'W' : genero === 'M' ? 'M' : 'N';
  const id = Math.floor(Math.random() * 900) + 100; // 100–999
  return `${initial}${id}`;
}

// ─────────────────────────────────────────────────────────────────
// 3. PIRÁMIDE OLFATIVA
// ─────────────────────────────────────────────────────────────────

/**
 * Construye la pirámide olfativa (salida / corazón / fondo)
 * combinando el acorde seleccionado con las notas de emoción
 * y los afinadores de personalidad.
 */
function buildOlfactoryPyramid(
  state: PerfumeState,
  familia: FamilyId
): OlfactoryPyramid {
  // Notas base según emoción
  const emocionMap: Record<string, OlfactoryPyramid> = {
    elegante: {
      salida:  ['bergamota fría', 'aldehídos suaves', 'iris'],
      corazon: ['rosa centifolia', 'jazmín grandiflorum', 'ylang-ylang'],
      fondo:   ['sándalo mysore', 'ámbar gris', 'musgo de roble'],
    },
    vitalidad: {
      salida:  ['bergamota de Calabria', 'limón siciliano', 'yuzu'],
      corazon: ['lavanda de Provenza', 'neroli', 'geranio bourbon'],
      fondo:   ['almizcle blanco', 'cedro del Atlas', 'vetiver verde'],
    },
    seguro: {
      salida:  ['cardamomo', 'especias cálidas', 'naranja amarga'],
      corazon: ['oud camboyano', 'incienso somalí', 'labdanum'],
      fondo:   ['vetiver haitiano', 'cuero curtido', 'resinas orientales'],
    },
  };

  const base = emocionMap[state.emocion ?? ''] ?? {
    salida:  ['bergamota', 'limón'],
    corazon: ['jazmín', 'rosa'],
    fondo:   ['sándalo', 'cedro'],
  };

  // Inserta el acorde elegido por el usuario en su posición de pirámide
  if (state.acorde) {
    const acordeRecord = ACORDES_CATALOG[state.acorde];
    if (acordeRecord) {
      const label = acordeRecord.label;
      const pos   = acordeRecord.pyramid;
      if (pos === 'salida'  && !base.salida.includes(label))  base.salida.unshift(label);
      if (pos === 'corazon' && !base.corazon.includes(label)) base.corazon.unshift(label);
      if (pos === 'fondo'   && !base.fondo.includes(label))   base.fondo.unshift(label);
    }
  }

  return {
    salida:  base.salida.slice(0, 3),
    corazon: base.corazon.slice(0, 3),
    fondo:   base.fondo.slice(0, 3),
  };
}

// ─────────────────────────────────────────────────────────────────
// 4. NOTA DEL PERFUMISTA — Descripción narrativa dinámica
// ─────────────────────────────────────────────────────────────────

/**
 * Fragmentos narrativos indexados por cada selección del usuario.
 * Se encadenan para crear descripciones únicas y coherentes.
 */
const NARRATIVA = {
  // Apertura según género
  apertura: {
    W: 'Una fragancia concebida para una presencia',
    M: 'Una composición diseñada para un carácter',
    U: 'Una fragancia creada para una identidad',
    null: 'Una fragancia diseñada para una personalidad',
  } as Record<string, string>,

  // Adjetivo de emoción
  emocion: {
    elegante:  'sofisticada y contenida',
    vitalidad: 'viva y radiante',
    seguro:    'firme e inconfundible',
  } as Record<string, string>,

  // Descripción de familia
  familia: {
    citrico:   'con una apertura de luz cítrica que despierta antes que las palabras',
    floral:    'construida sobre un corazón floral que revela delicadeza con carácter',
    amaderado: 'anclada en una base amaderada que permanece mucho después de que partas',
    oriental:  'envuelta en un fondo oriental que susurra como un secreto guardado',
    chipre:    'con la arquitectura clásica del Chipre: bergamota, musgo y profundidad',
    fougere:   'tejida con la frescura herbal de la Fougère que limpia y libera',
    gourmand:  'habitada por un universo gourmand que seduce sin pedir permiso',
    acuatico:  'abierta con la libertad mineral del océano, sal y horizonte sin fin',
  } as Record<string, string>,

  // Descripción de personalidad
  personalidad: {
    // Dama
    empoderada: 'Define el espacio antes de hablar.',
    romantica:  'Conquista con la delicadeza de lo auténtico.',
    audaz:      'Toma el riesgo y convierte la audacia en firma.',
    misteriosa: 'Guarda lo más interesante para el final.',
    natural:    'Existe sin artificio, y eso la hace extraordinaria.',
    // Caballero
    vanguardista: 'Anticipa lo que aún no tiene nombre.',
    robusto:      'Permanece cuando todo lo demás cede.',
    sedicente:    'Su autoridad no necesita volumen.',
    deportivo:    'Conquista en movimiento, sin perder elegancia.',
    minimalista:  'Dice más con lo que omite que con lo que muestra.',
  } as Record<string, string>,

  // Cierre según acorde
  acordeCierre: (acorde: AccordId | null): string => {
    if (!acorde) return '';
    const record = ACORDES_CATALOG[acorde];
    return record
      ? ` El acorde de ${record.label.toLowerCase()} —${record.notas}— define su carácter final.`
      : '';
  },

  // Cierre según concentración
  intensidadCierre: {
    edt:     'Una presencia discreta y luminosa para el día.',
    edp:     'Proyección notable que dura lo que la jornada exige.',
    extrait: 'La expresión más concentrada: larga duración y proyección singular.',
  } as Record<string, string>,
};

// ─────────────────────────────────────────────────────────────────
// FUNCIÓN PRINCIPAL
// ─────────────────────────────────────────────────────────────────

/**
 * generatePremiumResult — Genera el Sello de Marca y la Nota del Perfumista.
 *
 * @param state  Estado completo del configurador con todas las selecciones.
 * @returns PremiumResult con sello visual, prefijo, pirámide y nota narrativa.
 *
 * @example
 * const result = generatePremiumResult({
 *   genero: 'W', emocion: 'elegante', personalidad: 'empoderada',
 *   familia: 'chipre', acorde: 'cuero-russie', intensidad: 'edp',
 *   nombre: 'Ana', telefono: '...', perfumeSello: undefined, notaPerfumista: undefined
 * });
 *
 * // result.sello:         "W342 CUERO CISTE EAU DE PARFUM"
 * // result.notaPerfumista: "Una fragancia concebida para una presencia..."
 */
export function generatePremiumResult(state: PerfumeState): PremiumResult {

  // ── 1. Motor olfativo: familia de máxima afinidad ──────────────
  const familiaBase = calculateOlfactoryFamily(state);

  // ── 2. Sello de marca ──────────────────────────────────────────
  const prefijo      = generatePrefijo(state.genero);
  const acordePrimario  = getAccordShortLabel(state.acorde);
  const acordeSecundario = getSuggestedSecondaryAccord(state, familiaBase);
  const concentracion   = state.intensidad
    ? INTENSIDADES[state.intensidad]?.sello ?? 'EAU DE PARFUM'
    : 'EAU DE PARFUM';

  // Regla 5: [Prefijo][ID] [ACORDE 1] [ACORDE 2] [CONCENTRACIÓN]
  const sello = `${prefijo} ${acordePrimario} ${acordeSecundario} ${concentracion}`;

  // ── 3. Pirámide olfativa ───────────────────────────────────────
  const piramide = buildOlfactoryPyramid(state, familiaBase);

  // ── 4. Nota del Perfumista ─────────────────────────────────────
  const generoKey      = state.genero ?? 'null';
  const emocionKey     = state.emocion   ?? '';
  const familiaKey     = familiaBase;
  const personalidadKey = state.personalidad ?? '';
  const intensidadKey  = state.intensidad ?? '';

  const notaPerfumista = [
    // Apertura: género + emoción
    `${NARRATIVA.apertura[generoKey] ?? NARRATIVA.apertura['null']} ${NARRATIVA.emocion[emocionKey] ?? ''}.`,

    // Familia olfativa
    NARRATIVA.familia[familiaKey]
      ? `${NARRATIVA.familia[familiaKey][0]!.toUpperCase()}${NARRATIVA.familia[familiaKey].slice(1)}.`
      : '',

    // Rasgo de personalidad
    NARRATIVA.personalidad[personalidadKey] ?? '',

    // Acorde principal
    NARRATIVA.acordeCierre(state.acorde),

    // Concentración
    NARRATIVA.intensidadCierre[intensidadKey] ?? '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return {
    sello,
    prefijo,
    familiaBase,
    acordePrimario,
    acordeSecundario,
    notaPerfumista,
    piramide,
  };
}

// ─────────────────────────────────────────────────────────────────
// UTILIDADES EXPORTADAS (para uso en componentes)
// ─────────────────────────────────────────────────────────────────

/**
 * Retorna la familia olfativa sugerida sin generar el resultado completo.
 * Útil para mostrar la recomendación al usuario antes del paso final.
 */
export { calculateOlfactoryFamily as getSuggestedFamily };

/**
 * Serializa el PerfumeState para el mensaje de WhatsApp.
 *
 * @example
 * const msg = buildWhatsAppMessage(state, result);
 * window.open(`https://wa.me/524612723409?text=${encodeURIComponent(msg)}`);
 */
export function buildWhatsAppMessage(
  state: PerfumeState,
  result: PremiumResult
): string {
  const intensidadLabel =
    state.intensidad ? (INTENSIDADES[state.intensidad]?.label ?? '-') : '-';

  const acordeLabel = state.acorde
    ? (ACORDES_CATALOG[state.acorde]?.label ?? state.acorde)
    : '-';

  const piramide = [
    `  Salida:   ${result.piramide.salida.join(', ')}`,
    `  Corazón:  ${result.piramide.corazon.join(', ')}`,
    `  Fondo:    ${result.piramide.fondo.join(', ')}`,
  ].join('\n');

  return `
Hola, quiero reservar un perfume personalizado de Félix Chaja Parfums.

━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${result.sello}
━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre:       ${state.nombre   || '-'}
Teléfono:     ${state.telefono || '-'}

Género:        ${state.genero       || '-'}
Emoción:       ${state.emocion      || '-'}
Familia:       ${result.familiaBase}
Personalidad:  ${state.personalidad || '-'}
Acorde:        ${acordeLabel}
Concentración: ${intensidadLabel}

Pirámide olfativa:
${piramide}

Nota del Perfumista:
"${result.notaPerfumista}"

Quedo atento para continuar con el proceso.
`.trim();
}
