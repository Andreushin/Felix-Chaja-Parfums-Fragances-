/* ════════════════════════════════════════════════════════════════
   Félix Chaja Parfums — Catálogo de Datos
   Fuente única de verdad: emociones, familias, acordes, personalidades.
   Bifurcación de género aplicada en PersonalityRecord (W / M).
   ════════════════════════════════════════════════════════════════ */

import type {
  AccordId,
  AccordRecord,
  EmotionRecord,
  FamilyId,
  FamilyRecord,
  FamilyWeights,
  IntensityRecord,
  OlfactoryEngine,
  PersonalityIdM,
  PersonalityIdW,
  PersonalityRecord,
} from '@/types/perfume.types';

// ─────────────────────────────────────────────────────────────────
// EMOCIONES — Variables Subjetivas (3 estados internos)
// ─────────────────────────────────────────────────────────────────

export const EMOCIONES: EmotionRecord[] = [
  {
    id:            'elegante',
    label:         'Elegante',
    description:   'Una presencia sofisticada y contenida. La fragancia que deja huella sin alzar la voz.',
    olfactoryBias: ['amaderado', 'floral', 'chipre', 'oriental'],
    pirSalida:     ['aldehídos suaves', 'iris', 'bergamota fría'],
    pirCorazon:    ['rosa centifolia', 'jazmín grandiflorum', 'ylang-ylang'],
    pirFondo:      ['sándalo mysore', 'ámbar gris', 'musgo de roble'],
  },
  {
    id:            'vitalidad',
    label:         'Vitalidad',
    description:   'Energía radiante y renovadora. La sensación de estar en tu mejor versión: presente y en plena forma.',
    olfactoryBias: ['citrico', 'acuatico', 'fougere', 'floral'],
    pirSalida:     ['bergamota de Calabria', 'limón siciliano', 'yuzu'],
    pirCorazon:    ['lavanda de Provenza', 'neroli', 'geranio bourbon'],
    pirFondo:      ['almizcle blanco', 'cedro del Atlas', 'vetiver verde'],
  },
  {
    id:            'seguro',
    label:         'Seguro',
    description:   'Carácter firme y reconocible. Una fragancia que te respalda en cada decisión importante.',
    olfactoryBias: ['oriental', 'amaderado', 'chipre', 'fougere'],
    pirSalida:     ['cardamomo', 'especias cálidas', 'naranja amarga'],
    pirCorazon:    ['oud camboyano', 'incienso somalí', 'labdanum'],
    pirFondo:      ['vetiver haitiano', 'cuero', 'resinas orientales'],
  },
];

// ─────────────────────────────────────────────────────────────────
// PERSONALIDADES DAMA (W) — Bifurcación de género
// Polo aromático diferenciado de Empoderada ≠ Audaz ≠ Misteriosa
// ─────────────────────────────────────────────────────────────────

export const PERSONALIDADES_W: Record<PersonalityIdW, PersonalityRecord> = {
  empoderada: {
    id:          'empoderada',
    label:       'Empoderada',
    description: 'Defines el espacio antes de hablar. Fragancias Chipre con cuero y musgo que proyectan presencia sin pedirla.',
    polo:        'Chipre · Cuero · Amaderado',
    arquetipo:   'La que define el espacio',
    accordBias:  ['cuero-russie', 'bergamota-musgo', 'musgo-chipre', 'labdanum-ciste'],
    familyBoost: { chipre: 4, amaderado: 3, oriental: 1 },
  },
  romantica: {
    id:          'romantica',
    label:       'Romántica',
    description: 'Seduces con delicadeza. Florales blancos e iris que envuelven sin aprisionar.',
    polo:        'Floral blanco · Powdery · Suave',
    arquetipo:   'La que conquista sin esfuerzo',
    accordBias:  ['rosa-centifolia', 'jazmin-grandiflorum', 'iris-pallida', 'peonia'],
    familyBoost: { floral: 5, gourmand: 2, oriental: 1 },
  },
  audaz: {
    id:          'audaz',
    label:       'Audaz',
    description: 'Tomas el riesgo y ganas. Gourmand-Oriental con notas inesperadas que no piden disculpas.',
    polo:        'Gourmand · Oriental · Frutal',
    arquetipo:   'La que toma el riesgo',
    accordBias:  ['vainilla-cremosa', 'caramelo-salado', 'tuberosa', 'incienso-somali'],
    familyBoost: { gourmand: 4, oriental: 3, chipre: 1 },
  },
  misteriosa: {
    id:          'misteriosa',
    label:       'Misteriosa',
    description: 'Guardas lo más interesante. Orientales oscuros con oud y resinas que sólo revelan una parte.',
    polo:        'Oriental oscuro · Oud · Incienso',
    arquetipo:   'La que reserva el misterio',
    accordBias:  ['oud-camboyano', 'incienso-somali', 'mirra', 'violeta-bourbon'],
    familyBoost: { oriental: 5, chipre: 2, amaderado: 1 },
  },
  natural: {
    id:          'natural',
    label:       'Natural',
    description: 'Tu autenticidad es tu lujo. Fougères verdes y acuáticos que huelen a piel limpia y campo abierto.',
    polo:        'Fougère · Acuático · Verde',
    arquetipo:   'La que vive sin artificio',
    accordBias:  ['lavanda-provenza', 'musgo-marino', 'vetiver-verde', 'algas-atlantico'],
    familyBoost: { fougere: 4, acuatico: 3, citrico: 1 },
  },
};

// ─────────────────────────────────────────────────────────────────
// PERSONALIDADES CABALLERO (M) — Bifurcación de género
// Dinámico ≠ Deportivo · Vanguardista ≠ Minimalista (polo distinto)
// ─────────────────────────────────────────────────────────────────

export const PERSONALIDADES_M: Record<PersonalityIdM, PersonalityRecord> = {
  vanguardista: {
    id:          'vanguardista',
    label:       'Vanguardista',
    description: 'Anticipas lo que aún no existe. Cítricos amargos con minerales que no siguen ninguna tendencia.',
    polo:        'Cítrico amargo · Mineral · Acuático frío',
    arquetipo:   'El que anticipa',
    accordBias:  ['naranja-amarga', 'yuzu', 'sal-mineral', 'bergamota-musgo'],
    familyBoost: { citrico: 3, acuatico: 3, amaderado: 1 },
  },
  robusto: {
    id:          'robusto',
    label:       'Robusto',
    description: 'Tu solidez es palpable. Maderas oscuras con cuero y tabaco que sólo el tiempo construye.',
    polo:        'Amaderado oscuro · Cuero · Tabaco',
    arquetipo:   'El que permanece',
    accordBias:  ['oud-camboyano', 'cuero-russie', 'vetiver-haitiano', 'guayaco'],
    familyBoost: { amaderado: 5, oriental: 2, chipre: 1 },
  },
  sedicente: {
    id:          'sedicente',
    label:       'Sedicente',
    description: 'Tu autoridad no necesita volumen. Orientales especiados con incienso que definen sin necesidad de explicar.',
    polo:        'Oriental especiado · Incienso · Oud',
    arquetipo:   'El que declara sin hablar',
    accordBias:  ['incienso-somali', 'labdanum', 'oud-camboyano', 'mirra'],
    familyBoost: { oriental: 5, amaderado: 2, chipre: 2 },
  },
  deportivo: {
    id:          'deportivo',
    label:       'Deportivo',
    description: 'Conquistas en movimiento. Cítricos brillantes y acuáticos que mantienen el ritmo sin perder elegancia.',
    polo:        'Cítrico brillante · Acuático · Fougère',
    arquetipo:   'El que conquista en movimiento',
    accordBias:  ['bergamota', 'limon-siciliano', 'musgo-marino', 'calone'],
    familyBoost: { citrico: 4, acuatico: 3, fougere: 2 },
  },
  minimalista: {
    id:          'minimalista',
    label:       'Minimalista',
    description: 'Dices más con menos. Maderas finas y acuáticos minerales que respetan el silencio como forma de presencia.',
    polo:        'Acuático mineral · Madera fina · Musgo',
    arquetipo:   'El que dice más con menos',
    accordBias:  ['sal-mineral', 'hinoki', 'ambrette', 'musgo-fougere'],
    familyBoost: { acuatico: 4, fougere: 3, citrico: 1 },
  },
};

// ─────────────────────────────────────────────────────────────────
// FAMILIAS OLFATIVAS — 8 Familias con 6-9 Acordes c/u
// ─────────────────────────────────────────────────────────────────

export const FAMILIAS: FamilyRecord[] = [
  {
    id:            'citrico',
    label:         'Cítrico',
    description:   'Luz líquida. Bergamota, yuzu y limón siciliano que despiertan los sentidos antes que las palabras.',
    genderDefault: ['M', 'U'],
    accords:       [
      'bergamota',
      'limon-siciliano',
      'mandarina',
      'yuzu',
      'pomelo-rosa',
      'naranja-amarga',
      'lima-persa',
    ],
  },
  {
    id:            'floral',
    label:         'Floral',
    description:   'El jardín secreto del alma. Rosa centifolia, jazmín grandiflorum e iris pallida.',
    genderDefault: ['W', 'U'],
    accords:       [
      'jazmin-grandiflorum',
      'rosa-centifolia',
      'peonia',
      'ylang-ylang',
      'neroli',
      'iris-pallida',
      'gardenia',
      'tuberosa',
      'violeta-bourbon',
    ],
  },
  {
    id:            'amaderado',
    label:         'Amaderado',
    description:   'Raíces profundas, silencio cálido. Cedro, sándalo mysore y vetiver que anclan tu presencia.',
    genderDefault: ['M', 'U'],
    accords:       [
      'vetiver-haitiano',
      'cedro-atlas',
      'sandalo-mysore',
      'oud-camboyano',
      'musgo-roble',
      'hinoki',
      'hiba',
      'guayaco',
    ],
  },
  {
    id:            'oriental',
    label:         'Oriental',
    description:   'Noche sin tiempo. Ámbar gris, incienso somalí y resinas que susurran como secretos.',
    genderDefault: ['W', 'M', 'U'],
    accords:       [
      'ambar-gris',
      'vainilla-bourbon',
      'benjui-siam',
      'incienso-somali',
      'mirra',
      'labdanum',
      'opoponax',
    ],
  },
  {
    id:            'chipre',
    label:         'Chipre',
    description:   'La arquitectura de la perfumería clásica. Bergamota, musgo de roble y labdanum en equilibrio eterno.',
    genderDefault: ['W', 'M'],
    accords:       [
      'cuero-russie',
      'labdanum-ciste',
      'vetiver-seco',
      'bergamota-musgo',
      'patchouli-oscuro',
      'musgo-chipre',
    ],
  },
  {
    id:            'fougere',
    label:         'Fougère',
    description:   'Campo al amanecer. Lavanda de Provenza, cumarina y roble que limpian el espíritu.',
    genderDefault: ['M', 'U'],
    accords:       [
      'lavanda-provenza',
      'geranio-bourbon',
      'cumarina',
      'roble-alisamia',
      'bergamota-herbal',
      'vetiver-verde',
      'musgo-fougere',
    ],
  },
  {
    id:            'gourmand',
    label:         'Gourmand',
    description:   'Placer sin disculpas. Vainilla cremosa, cacao bruto y pralinée para quienes abrazan el deseo.',
    genderDefault: ['W', 'U'],
    accords:       [
      'vainilla-cremosa',
      'caramelo-salado',
      'cafe-arabica',
      'cacao-bruto',
      'pralinee-almendra',
      'miel-acacia',
    ],
  },
  {
    id:            'acuatico',
    label:         'Acuático',
    description:   'Sal, brisa y horizonte. Musgo marino, calone y minerales que evocan libertad sin fronteras.',
    genderDefault: ['M', 'U'],
    accords:       [
      'musgo-marino',
      'calone',
      'algas-atlantico',
      'sal-mineral',
      'violeta-mar',
      'ambrette',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// CATÁLOGO DE ACORDES — Cada materia prima con datos completos
// ─────────────────────────────────────────────────────────────────

export const ACORDES_CATALOG: Record<AccordId, AccordRecord> = {
  // ── Cítrico ───────────────────────────────────────────────────
  bergamota: {
    id: 'bergamota', familia: 'citrico', pyramid: 'salida',
    label: 'Bergamota de Calabria', labelShort: 'BERGAMOTA',
    notas: 'cítrico brillante, floral verde, ligero té',
    description: 'La apertura perfecta. Luminosa y mediterránea, define el primer acto de toda gran fragancia.',
    genderBias: ['M', 'U'],
  },
  'limon-siciliano': {
    id: 'limon-siciliano', familia: 'citrico', pyramid: 'salida',
    label: 'Limón Siciliano', labelShort: 'LIMÓN',
    notas: 'cítrico agudo, zesty, verde',
    description: 'Claridad inmediata. Despierta el sistema olfativo y prepara el camino para el corazón.',
    genderBias: ['M', 'U'],
  },
  mandarina: {
    id: 'mandarina', familia: 'citrico', pyramid: 'salida',
    label: 'Mandarina Italiana', labelShort: 'MANDARINA',
    notas: 'dulce cítrico, floral suave, jugoso',
    description: 'Cítrico con carácter más dulce. Versátil y accesible, ideal para composiciones unisex.',
    genderBias: ['W', 'U'],
  },
  yuzu: {
    id: 'yuzu', familia: 'citrico', pyramid: 'salida',
    label: 'Yuzu Japonés', labelShort: 'YUZU',
    notas: 'cítrico complejo, verde amargo, floral',
    description: 'El cítrico de la vanguardia. Más amargo y complejo que el limón, con un halo floral único.',
    genderBias: ['M', 'U'],
  },
  'pomelo-rosa': {
    id: 'pomelo-rosa', familia: 'citrico', pyramid: 'salida',
    label: 'Pomelo Rosa', labelShort: 'POMELO',
    notas: 'amargo cítrico, dulce, ligeramente floral',
    description: 'Frescura con carácter. La amargura del pomelo añade sofisticación a cualquier apertura.',
    genderBias: ['W', 'U'],
  },
  'naranja-amarga': {
    id: 'naranja-amarga', familia: 'citrico', pyramid: 'salida',
    label: 'Naranja Amarga', labelShort: 'NARANJA AMARGA',
    notas: 'amargo, cálido, especiado leve',
    description: 'La naranja del Mediterráneo. Más compleja y menos dulce, aporta carácter masculino a la apertura.',
    genderBias: ['M'],
  },
  'lima-persa': {
    id: 'lima-persa', familia: 'citrico', pyramid: 'salida',
    label: 'Lima Persa', labelShort: 'LIMA',
    notas: 'cítrico frío, verde intenso, mineral',
    description: 'La más fría de los cítricos. Ideal para composiciones acuáticas o minimalistas.',
    genderBias: ['M', 'U'],
  },

  // ── Floral ────────────────────────────────────────────────────
  'jazmin-grandiflorum': {
    id: 'jazmin-grandiflorum', familia: 'floral', pyramid: 'corazon',
    label: 'Jazmín Grandiflorum', labelShort: 'JASMIN',
    notas: 'floral blanco intenso, indol, frutal',
    description: 'La reina de la perfumería. Sensual, romántico e inconfundible. El corazón de los grandes clásicos.',
    genderBias: ['W'],
  },
  'rosa-centifolia': {
    id: 'rosa-centifolia', familia: 'floral', pyramid: 'corazon',
    label: 'Rosa Centifolia', labelShort: 'ROSA',
    notas: 'floral rico, miel, ligero polvoso',
    description: 'La rosa más preciada de Grasse. Compleja, elegante y atemporal en cualquier composición.',
    genderBias: ['W', 'U'],
  },
  peonia: {
    id: 'peonia', familia: 'floral', pyramid: 'corazon',
    label: 'Peonía', labelShort: 'PEONÍA',
    notas: 'floral fresco, rosa verde, suave',
    description: 'Floral limpio y primaveral. Más fresco que la rosa, con un perfil luminoso y accesible.',
    genderBias: ['W', 'U'],
  },
  'ylang-ylang': {
    id: 'ylang-ylang', familia: 'floral', pyramid: 'corazon',
    label: 'Ylang-Ylang', labelShort: 'YLANG',
    notas: 'floral cremoso, exótico, balsámico',
    description: 'Exótico y sensual. Aporta calidez y profundidad al corazón floral, con carácter tropical.',
    genderBias: ['W'],
  },
  neroli: {
    id: 'neroli', familia: 'floral', pyramid: 'corazon',
    label: 'Neroli de Maroc', labelShort: 'NEROLI',
    notas: 'floral cítrico, verde, ligeramente amargo',
    description: 'Flor de naranjo en estado puro. Puente entre cítrico y floral, brillante y aristocrático.',
    genderBias: ['W', 'U'],
  },
  'iris-pallida': {
    id: 'iris-pallida', familia: 'floral', pyramid: 'corazon',
    label: 'Iris Pallida', labelShort: 'IRIS',
    notas: 'polvoso, violeta, zanahoria, mantequilla',
    description: 'La nota más lujosa de la perfumería. Polvoso y sofisticado, símbolo de la elegancia sin tiempo.',
    genderBias: ['W'],
  },
  gardenia: {
    id: 'gardenia', familia: 'floral', pyramid: 'corazon',
    label: 'Gardenia', labelShort: 'GARDENIA',
    notas: 'floral cremoso, coco, ligeramente verde',
    description: 'Suntuosa y envolvente. Floral de alto impacto con proyección excepcional.',
    genderBias: ['W'],
  },
  tuberosa: {
    id: 'tuberosa', familia: 'floral', pyramid: 'corazon',
    label: 'Tuberosa Mexicana', labelShort: 'TUBEROSA',
    notas: 'floral intenso, cremoso, especiado',
    description: 'La flor más audaz. Intensa y sin complejos, elige quién la lleva con determinación.',
    genderBias: ['W'],
  },
  'violeta-bourbon': {
    id: 'violeta-bourbon', familia: 'floral', pyramid: 'corazon',
    label: 'Violeta Bourbon', labelShort: 'VIOLETA',
    notas: 'floral polvoso, dulce, suave',
    description: 'Delicadeza con carácter. Polvosa y romántica, aporta una dimensión vintage a la composición.',
    genderBias: ['W', 'U'],
  },

  // ── Amaderado ─────────────────────────────────────────────────
  'vetiver-haitiano': {
    id: 'vetiver-haitiano', familia: 'amaderado', pyramid: 'fondo',
    label: 'Vetiver Haitiano', labelShort: 'VETIVER',
    notas: 'tierra húmeda, madera ahumada, raíz verde, mineral',
    description: 'Raíz aromática sin igual. Frescura seca, carácter terroso y duración excepcional.',
    genderBias: ['M', 'U'],
  },
  'cedro-atlas': {
    id: 'cedro-atlas', familia: 'amaderado', pyramid: 'fondo',
    label: 'Cedro del Atlas', labelShort: 'CEDRO',
    notas: 'madera seca, ligeramente especiada, balsámica',
    description: 'La columna vertebral de la perfumería masculina. Seco, elegante y de gran fijación.',
    genderBias: ['M', 'U'],
  },
  'sandalo-mysore': {
    id: 'sandalo-mysore', familia: 'amaderado', pyramid: 'fondo',
    label: 'Sándalo Mysore', labelShort: 'SÁNDALO',
    notas: 'madera cremosa, leche, suave, balsámico',
    description: 'La madera más preciada. Cremoso y sedoso, une el corazón con el fondo sin costuras.',
    genderBias: ['W', 'U'],
  },
  'oud-camboyano': {
    id: 'oud-camboyano', familia: 'amaderado', pyramid: 'fondo',
    label: 'Oud Camboyano', labelShort: 'OUD',
    notas: 'madera oscura, animal, cuero, resinoso',
    description: 'El oro líquido de la perfumería oriental. Complejo, animal y perturbadoramente adictivo.',
    genderBias: ['M', 'W'],
  },
  'musgo-roble': {
    id: 'musgo-roble', familia: 'amaderado', pyramid: 'fondo',
    label: 'Musgo de Roble', labelShort: 'MUSGO ROBLE',
    notas: 'musgo, tierra, madera húmeda, verde',
    description: 'La firma del Chipre clásico. Terroso y profundo, ancora cualquier composición con autoridad.',
    genderBias: ['M', 'U'],
  },
  hinoki: {
    id: 'hinoki', familia: 'amaderado', pyramid: 'fondo',
    label: 'Hinoki Japonés', labelShort: 'HINOKI',
    notas: 'madera fría, limón suave, seco, fresco',
    description: 'El cedro del Japón. Minimalista y sofisticado, con una frescura única que lo distingue.',
    genderBias: ['M', 'U'],
  },
  hiba: {
    id: 'hiba', familia: 'amaderado', pyramid: 'fondo',
    label: 'Hiba', labelShort: 'HIBA',
    notas: 'madera limpia, floral suave, mineral',
    description: 'Madera rara del norte de Japón. Limpia y casi floral, para el minimalista de alta exigencia.',
    genderBias: ['U'],
  },
  guayaco: {
    id: 'guayaco', familia: 'amaderado', pyramid: 'fondo',
    label: 'Guayaco', labelShort: 'GUAYACO',
    notas: 'madera ahumada, cuero, tabaco, incienso',
    description: 'Madera de América con alma antigua. Ahumada y profunda, aporta carácter inconfundible.',
    genderBias: ['M'],
  },

  // ── Oriental ──────────────────────────────────────────────────
  'ambar-gris': {
    id: 'ambar-gris', familia: 'oriental', pyramid: 'fondo',
    label: 'Ámbar Gris', labelShort: 'ÁMBAR',
    notas: 'marino, animal, cálido, sensual',
    description: 'El acorde más antiguo y misterioso. Cálido, sensual e irresistiblemente atrayente.',
    genderBias: ['W', 'M', 'U'],
  },
  'vainilla-bourbon': {
    id: 'vainilla-bourbon', familia: 'oriental', pyramid: 'fondo',
    label: 'Vainilla Bourbon', labelShort: 'VAINILLA',
    notas: 'dulce cremoso, balsámico, cálido',
    description: 'Calidez reconfortante. La vainilla de Madagascar que convierte el fondo en una caricia.',
    genderBias: ['W', 'U'],
  },
  'benjui-siam': {
    id: 'benjui-siam', familia: 'oriental', pyramid: 'fondo',
    label: 'Benjuí de Siam', labelShort: 'BENJUÍ',
    notas: 'vainilla balsámica, resinoso, suave',
    description: 'Resina dulce y misteriosa. Añade calidez y profundidad sin la pesadez de otros orientales.',
    genderBias: ['W', 'U'],
  },
  'incienso-somali': {
    id: 'incienso-somali', familia: 'oriental', pyramid: 'corazon',
    label: 'Incienso Somalí', labelShort: 'INCIENSO',
    notas: 'resinoso, limón, frío, espiritual',
    description: 'El incienso más puro. Frío y ceremonial, transforma cualquier fragancia en una experiencia.',
    genderBias: ['M', 'W'],
  },
  mirra: {
    id: 'mirra', familia: 'oriental', pyramid: 'fondo',
    label: 'Mirra', labelShort: 'MIRRA',
    notas: 'resinoso, especiado, ligeramente amargo',
    description: 'Resina de la Antigüedad. Oscura, compleja y con una profundidad espiritual sin igual.',
    genderBias: ['M', 'W'],
  },
  labdanum: {
    id: 'labdanum', familia: 'oriental', pyramid: 'fondo',
    label: 'Labdanum', labelShort: 'LABDANUM',
    notas: 'ámbar, animal, cuero suave, musgo',
    description: 'El alma del Chipre. Cálido y ligeramente animal, la base de los grandes clásicos modernos.',
    genderBias: ['M', 'W'],
  },
  opoponax: {
    id: 'opoponax', familia: 'oriental', pyramid: 'fondo',
    label: 'Opoponax', labelShort: 'OPOPONAX',
    notas: 'balsámico dulce, incienso suave, vainilla',
    description: 'La mirra dulce. Más suave y cálida que la mirra clásica, con un perfil amable y profundo.',
    genderBias: ['W', 'U'],
  },

  // ── Chipre ────────────────────────────────────────────────────
  'cuero-russie': {
    id: 'cuero-russie', familia: 'chipre', pyramid: 'fondo',
    label: 'Cuero de Russie', labelShort: 'CUERO',
    notas: 'cuero curtido, abedul, tabaco suave, floral',
    description: 'El cuero más sofisticado de la perfumería. Animal y elegante, para personalidades fuertes.',
    genderBias: ['M', 'W'],
  },
  'labdanum-ciste': {
    id: 'labdanum-ciste', familia: 'chipre', pyramid: 'fondo',
    label: 'Labdanum Ciste', labelShort: 'CISTE',
    notas: 'ámbar oscuro, animal, resina fría',
    description: 'La versión más compleja del labdanum. Oscuro y magnético, el fondo del Chipre moderno.',
    genderBias: ['W', 'M'],
  },
  'vetiver-seco': {
    id: 'vetiver-seco', familia: 'chipre', pyramid: 'fondo',
    label: 'Vetiver Seco', labelShort: 'VETIVER SECO',
    notas: 'tierra, humo frío, mineral, seco',
    description: 'Vetiver en su expresión más austera. Sin dulzura ni humedad, pura mineralidad olfativa.',
    genderBias: ['M'],
  },
  'bergamota-musgo': {
    id: 'bergamota-musgo', familia: 'chipre', pyramid: 'salida',
    label: 'Bergamota-Musgo', labelShort: 'BERGAMOTA MUSGO',
    notas: 'cítrico verde, musgo húmedo, floral',
    description: 'La apertura del Chipre clásico. Bergamota fría sobre musgo de roble: el lujo hecho apertura.',
    genderBias: ['W', 'U'],
  },
  'patchouli-oscuro': {
    id: 'patchouli-oscuro', familia: 'chipre', pyramid: 'fondo',
    label: 'Pachulí Oscuro', labelShort: 'PACHULÍ',
    notas: 'tierra, oscuro, especiado, madera resinosa',
    description: 'Pachulí en su versión más oscura y compleja. Magnético, terroso y de gran proyección.',
    genderBias: ['W', 'M'],
  },
  'musgo-chipre': {
    id: 'musgo-chipre', familia: 'chipre', pyramid: 'fondo',
    label: 'Musgo Chipre', labelShort: 'MUSGO',
    notas: 'musgo verde, húmedo, tierra, mineral',
    description: 'El elemento definitorio del género Chipre. Verde y terroso, la firma de una categoría entera.',
    genderBias: ['W', 'M'],
  },

  // ── Fougère ───────────────────────────────────────────────────
  'lavanda-provenza': {
    id: 'lavanda-provenza', familia: 'fougere', pyramid: 'corazon',
    label: 'Lavanda de Provenza', labelShort: 'LAVANDA',
    notas: 'herbal limpio, floral, ligeramente mentolado',
    description: 'La lavanda más clásica. Herbácea y limpia, el corazón de la familia Fougère desde 1882.',
    genderBias: ['M', 'U'],
  },
  'geranio-bourbon': {
    id: 'geranio-bourbon', familia: 'fougere', pyramid: 'corazon',
    label: 'Geranio Bourbon', labelShort: 'GERANIO',
    notas: 'rosa verde, herbal, mentolado leve',
    description: 'Puente natural entre floral y herbal. Añade frescura botánica con una sutileza floral.',
    genderBias: ['M', 'U'],
  },
  cumarina: {
    id: 'cumarina', familia: 'fougere', pyramid: 'fondo',
    label: 'Cumarina', labelShort: 'CUMARINA',
    notas: 'heno dulce, vainilla suave, almendra',
    description: 'El dulzor discreto de la Fougère. Cálida y reconfortante, suaviza los acordes herbales.',
    genderBias: ['M', 'U'],
  },
  'roble-alisamia': {
    id: 'roble-alisamia', familia: 'fougere', pyramid: 'fondo',
    label: 'Roble Alisamia', labelShort: 'ROBLE',
    notas: 'musgo, madera suave, cálido, seco',
    description: 'La variante del musgo de roble para Fougère. Más seca y cálida, ancla la composición.',
    genderBias: ['M'],
  },
  'bergamota-herbal': {
    id: 'bergamota-herbal', familia: 'fougere', pyramid: 'salida',
    label: 'Bergamota Herbal', labelShort: 'BERGAMOTA HERBAL',
    notas: 'cítrico verde, herbal, limpio',
    description: 'La apertura clásica de la Fougère. Bergamota con matices herbales que preparan el corazón.',
    genderBias: ['M'],
  },
  'vetiver-verde': {
    id: 'vetiver-verde', familia: 'fougere', pyramid: 'fondo',
    label: 'Vetiver Verde', labelShort: 'VETIVER VERDE',
    notas: 'raíz verde, fresco, mineral, herbal',
    description: 'Vetiver en clave fresca. Menos terroso, más verde y mineral: el fondo del Fougère moderno.',
    genderBias: ['M', 'U'],
  },
  'musgo-fougere': {
    id: 'musgo-fougere', familia: 'fougere', pyramid: 'fondo',
    label: 'Musgo Fougère', labelShort: 'MUSGO HERBAL',
    notas: 'musgo verde, fresco, floral leve',
    description: 'Musgo con expresión fresca. La versión limpia y botánica del musgo, para composiciones modernas.',
    genderBias: ['M', 'U'],
  },

  // ── Gourmand ──────────────────────────────────────────────────
  'vainilla-cremosa': {
    id: 'vainilla-cremosa', familia: 'gourmand', pyramid: 'fondo',
    label: 'Vainilla Cremosa', labelShort: 'VAINILLA CREMOSA',
    notas: 'vainilla dulce, leche, suave',
    description: 'Vainilla en su expresión más lujosa. Cremosa y envolvente, crea un aura de confort irresistible.',
    genderBias: ['W', 'U'],
  },
  'caramelo-salado': {
    id: 'caramelo-salado', familia: 'gourmand', pyramid: 'corazon',
    label: 'Caramelo Salado', labelShort: 'CARAMELO',
    notas: 'dulce, salado, mantequilla, toffee',
    description: 'La dualidad perfecta. El contraste dulce-salado crea un acorde adictivo y contemporáneo.',
    genderBias: ['W'],
  },
  'cafe-arabica': {
    id: 'cafe-arabica', familia: 'gourmand', pyramid: 'corazon',
    label: 'Café Arábica', labelShort: 'CAFÉ',
    notas: 'café tostado, especiado, cacao',
    description: 'Gourmand con carácter. El café aporta amargura sofisticada al universo dulce del gourmand.',
    genderBias: ['M', 'U'],
  },
  'cacao-bruto': {
    id: 'cacao-bruto', familia: 'gourmand', pyramid: 'corazon',
    label: 'Cacao Bruto', labelShort: 'CACAO',
    notas: 'chocolate oscuro, amargo, terroso',
    description: 'Cacao sin procesar. Terroso y complejo, más cercano a la selva que a la confitería.',
    genderBias: ['M', 'U'],
  },
  'pralinee-almendra': {
    id: 'pralinee-almendra', familia: 'gourmand', pyramid: 'fondo',
    label: 'Pralinée de Almendra', labelShort: 'PRALINÉE',
    notas: 'nuez tostada, caramelo, dulce cálido',
    description: 'La sofisticación de la confitería francesa. Cálido y comforting, de proyección muy femenina.',
    genderBias: ['W'],
  },
  'miel-acacia': {
    id: 'miel-acacia', familia: 'gourmand', pyramid: 'fondo',
    label: 'Miel de Acacia', labelShort: 'MIEL',
    notas: 'miel, floral, cera, suave',
    description: 'Dulzura natural. La miel floral añade calidez orgánica sin la artificialidad del azúcar.',
    genderBias: ['W', 'U'],
  },

  // ── Acuático ──────────────────────────────────────────────────
  'musgo-marino': {
    id: 'musgo-marino', familia: 'acuatico', pyramid: 'corazon',
    label: 'Musgo Marino', labelShort: 'MUSGO MARINO',
    notas: 'marino, mineral, algas, sal',
    description: 'La firma del Acuático. Evoca el Atlántico con toda su libertad y su mineral intensidad.',
    genderBias: ['M', 'U'],
  },
  calone: {
    id: 'calone', familia: 'acuatico', pyramid: 'salida',
    label: 'Calone', labelShort: 'CALONE',
    notas: 'melón marino, acuático, fresco',
    description: 'La molécula que inventó el género Acuático. Fresca e inmediata, sinónimo de brisa marina.',
    genderBias: ['M', 'U'],
  },
  'algas-atlantico': {
    id: 'algas-atlantico', familia: 'acuatico', pyramid: 'corazon',
    label: 'Algas del Atlántico', labelShort: 'ALGAS',
    notas: 'marino vegetal, verde, salino',
    description: 'Lo orgánico del océano. Verde y salino, añade autenticidad botánica al universo marino.',
    genderBias: ['M', 'U'],
  },
  'sal-mineral': {
    id: 'sal-mineral', familia: 'acuatico', pyramid: 'fondo',
    label: 'Sal Mineral', labelShort: 'SAL MINERAL',
    notas: 'mineral, salino, piedra, frío',
    description: 'Pureza mineral absoluta. Para el minimalista que entiende que menos siempre es más.',
    genderBias: ['M'],
  },
  'violeta-mar': {
    id: 'violeta-mar', familia: 'acuatico', pyramid: 'corazon',
    label: 'Violeta de Mar', labelShort: 'VIOLETA MARINA',
    notas: 'floral marino, suave, acuático',
    description: 'La feminidad del océano. Floral con carácter acuático, para composiciones unisex sofisticadas.',
    genderBias: ['W', 'U'],
  },
  ambrette: {
    id: 'ambrette', familia: 'acuatico', pyramid: 'fondo',
    label: 'Ambrette', labelShort: 'AMBRETTE',
    notas: 'almizcle suave, pera, floral, cálido',
    description: 'El almizcle natural del acuático. Sedoso y cálido, ancla la frescura con elegancia.',
    genderBias: ['U'],
  },
};

// ─────────────────────────────────────────────────────────────────
// INTENSIDADES — Concentración y sello visual
// ─────────────────────────────────────────────────────────────────

export const INTENSIDADES: Record<string, IntensityRecord> = {
  edt: {
    id:            'edt',
    label:         'Eau de Toilette',
    sello:         'EAU DE TOILETTE',
    description:   'Discreta y luminosa. Perfecta para uso diario y ambientes formales.',
    concentration: '8–12%',
    duracion:      '3–5 horas',
  },
  edp: {
    id:            'edp',
    label:         'Eau de Parfum',
    sello:         'EAU DE PARFUM',
    description:   'Presencia notable sin saturar. La concentración más versátil y moderna.',
    concentration: '15–20%',
    duracion:      '6–8 horas',
  },
  extrait: {
    id:            'extrait',
    label:         'Parfum / Extrait',
    sello:         'EXTRAIT DE PARFUM',
    description:   'La expresión máxima. Larga duración y proyección importante para ocasiones singulares.',
    concentration: '25–40%',
    duracion:      '10–12 horas',
  },
};

// ─────────────────────────────────────────────────────────────────
// MOTOR OLFATIVO — Pesos numéricos para el sistema de scoring
// ─────────────────────────────────────────────────────────────────

/** Inicializa un mapa de pesos en cero para todas las familias */
export const ZERO_WEIGHTS = (): FamilyWeights => ({
  citrico:   0,
  floral:    0,
  amaderado: 0,
  oriental:  0,
  chipre:    0,
  fougere:   0,
  gourmand:  0,
  acuatico:  0,
});

/**
 * Pesos que cada EMOCIÓN aporta al motor de scoring.
 * Se suman con los pesos de personalidad para calcular la familia óptima.
 *
 * Vitalidad → fuerte bias cítrico/acuático
 * Elegante  → fuerte bias amaderado/chipre
 * Seguro    → fuerte bias oriental
 */
export const EMOTION_WEIGHTS: Record<string, Partial<FamilyWeights>> = {
  elegante:  { amaderado: 4, floral: 2, chipre: 3, oriental: 1 },
  vitalidad: { citrico: 5, acuatico: 3, fougere: 2 },
  seguro:    { oriental: 5, amaderado: 2, chipre: 2 },
};

/**
 * Pesos de personalidad para DAMA (W).
 * Combinados con EMOTION_WEIGHTS determinan la familia olfativa.
 */
export const PERSONALITY_WEIGHTS_W: Record<PersonalityIdW, Partial<FamilyWeights>> = {
  empoderada: { chipre: 5, amaderado: 3, oriental: 1 },
  romantica:  { floral: 5, gourmand: 2, oriental: 1 },
  audaz:      { gourmand: 4, oriental: 3, chipre: 2 },
  misteriosa: { oriental: 5, chipre: 2, amaderado: 2 },
  natural:    { fougere: 5, acuatico: 3, citrico: 1 },
};

/**
 * Pesos de personalidad para CABALLERO (M).
 * Vanguardista ≠ Deportivo aunque ambos usan cítrico (polo distinto).
 */
export const PERSONALITY_WEIGHTS_M: Record<PersonalityIdM, Partial<FamilyWeights>> = {
  vanguardista: { citrico: 4, acuatico: 3, amaderado: 1 },
  robusto:      { amaderado: 5, oriental: 2, chipre: 2 },
  sedicente:    { oriental: 5, amaderado: 2, chipre: 3 },
  deportivo:    { citrico: 5, acuatico: 4, fougere: 2 },
  minimalista:  { acuatico: 5, fougere: 3, citrico: 1 },
};

/**
 * Acordes disponibles filtrados por género.
 * Regla de Negocio 1: bifurcación tras selección de género.
 */
export const ACCORDES_BY_GENDER: Record<'W' | 'M', AccordId[]> = {
  W: [
    // Floral blanco → prioridad dama
    'jazmin-grandiflorum', 'rosa-centifolia', 'peonia', 'ylang-ylang',
    'gardenia', 'tuberosa', 'violeta-bourbon', 'iris-pallida', 'neroli',
    // Frutal dulce
    'mandarina', 'pomelo-rosa',
    // Aldehídico / Polvoso
    'iris-pallida', 'violeta-bourbon',
    // Musky / Oriental
    'ambar-gris', 'vainilla-cremosa', 'labdanum', 'opoponax',
    // Chipre dama
    'cuero-russie', 'bergamota-musgo', 'musgo-chipre',
    // Gourmand
    'vainilla-cremosa', 'caramelo-salado', 'pralinee-almendra', 'miel-acacia',
    // Acuático femenino
    'violeta-mar', 'ambrette',
  ],
  M: [
    // Cítrico amargo → prioridad caballero
    'bergamota', 'limon-siciliano', 'yuzu', 'naranja-amarga', 'lima-persa',
    // Aromático herbal
    'lavanda-provenza', 'geranio-bourbon', 'bergamota-herbal',
    // Tabaco / Cuero
    'cuero-russie', 'guayaco',
    // Mineral / Acuático frío
    'musgo-marino', 'calone', 'sal-mineral', 'algas-atlantico',
    // Especiado frío
    'incienso-somali', 'mirra', 'labdanum',
    // Amaderado oscuro
    'vetiver-haitiano', 'cedro-atlas', 'oud-camboyano', 'hinoki', 'hiba',
    // Fougère
    'cumarina', 'vetiver-verde', 'musgo-fougere',
  ],
};
