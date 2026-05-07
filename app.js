/* ════════════════════════════════════════════════════════════════
   Félix Chaja Parfums — app.js
   SPA: Landing + Configurador en overlay.
   ════════════════════════════════════════════════════════════════ */


/* ── Configuración ─────────────────────────────────────────── */

const SHEETS_ENDPOINT = ""; // URL de tu Google Apps Script (opcional)
const WHATSAPP_NUMERO = "524612723409";


/* ════════════════════════════════════════════════════════════════
   DATOS DEL SISTEMA — Variables Subjetivas, Objetivas y Simbólicas
   ════════════════════════════════════════════════════════════════ */

/**
 * VARIABLE SUBJETIVA → OBJETIVA
 * Vincula cada Emoción con una sugerencia de Pirámide Olfativa.
 * Alegría/Vitalidad  → Salida cítrica
 * Elegante           → Base amaderada-floral
 * Seguro             → Fondo oriental especiado
 */
const EMOCION_FAMILIA_MAP = {
    'Vitalidad': {
        familia_sugerida: 'Cítrico',
        notas_salida:     'bergamota y limón',
        notas_corazon:    'lavanda y neroli',
        notas_fondo:      'almizcle blanco y cedro'
    },
    'Elegante': {
        familia_sugerida: 'Amaderado',
        notas_salida:     'aldehídos florales y iris',
        notas_corazon:    'rosa y jazmín',
        notas_fondo:      'sándalo, musgo de roble y ámbar'
    },
    'Seguro': {
        familia_sugerida: 'Oriental',
        notas_salida:     'especias cálidas y cardamomo',
        notas_corazon:    'oud y ámbar gris',
        notas_fondo:      'vetiver, cuero y resinas'
    }
};

/**
 * VARIABLE OBJETIVA — Catálogo de Acordes
 * Cada acorde está vinculado a su familia olfativa principal.
 */
const ACORDES_CATALOG = {
    'Vetiver':      { familia: 'Amaderado',  notas: 'tierra húmeda, madera ahumada, raíz verde' },
    'Ámbar':        { familia: 'Oriental',   notas: 'resina dulce, ámbar cálido, benjuí' },
    'Cuero':        { familia: 'Oriental',   notas: 'cuero curtido, abedul, tabaco suave' },
    'Bergamota':    { familia: 'Cítrico',    notas: 'cítrico brillante, flor de bergamota, té verde' },
    'Jazmín':       { familia: 'Floral',     notas: 'jazmín blanco, indol, ylang ylang' },
    'Lavanda':      { familia: 'Aromático',  notas: 'lavanda provenzal, romero, coumarina' },
    'Pachulí':      { familia: 'Chipre',     notas: 'tierra oscura, incienso, sándalo oscuro' },
    'Musgo Marino': { familia: 'Acuático',   notas: 'sal marina, mineral, ozono, calone' }
};

/**
 * VARIABLE SIMBÓLICA — Personalidades bifurcadas por género
 * W: Empoderada · Romántica · Audaz · Misteriosa · Natural
 * M: Vanguardista · Robusto · Sedicente · Deportivo · Minimalista
 */
const PERSONALIDADES_W = [
    {
        id: 'Empoderada',
        polo: 'Chipre · poder',
        arquetipo: 'La que define',
        desc: 'Tu fragancia es una declaración. Chipre, cuero y bergamota que marcan presencia antes de que pronuncies una sola palabra.',
        svg: '<svg viewBox="0 0 24 24"><path d="M4 18V10l4 4 4-8 4 8 4-4v8z"/><line x1="4" y1="18" x2="20" y2="18"/></svg>'
    },
    {
        id: 'Romántica',
        polo: 'Floral blanco · seducción suave',
        arquetipo: 'La que seduce',
        desc: 'Rosa centifolia y jazmín grandiflorum. Una arquitectura floral que envuelve sin asfixiar — íntima, frágil y memorable.',
        svg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4"/><path d="M12 13v8"/><path d="M9.5 18.5c.8.3 1.7.5 2.5.5s1.7-.2 2.5-.5"/><path d="M10 6c0-1.5.9-2.8 2-3 1.1.2 2 1.5 2 3"/></svg>'
    },
    {
        id: 'Audaz',
        polo: 'Gourmand-Oriental · riesgo calculado',
        arquetipo: 'La que irrumpe',
        desc: 'Vainilla oscura, oud y especias. Una fragancia que no pide permiso — gourmand y oriental en una apuesta de alto voltaje.',
        svg: '<svg viewBox="0 0 24 24"><path d="M8.5 21C8.5 21 5 18 5 13c0-3 2-5 4-6-1 2 0 4 2 4 0-2 1-5 4-8 1 4 4 7 4 10 0 4-3.5 7-3.5 7"/><path d="M12 18c-1 0-2-1-2-2"/></svg>'
    },
    {
        id: 'Misteriosa',
        polo: 'Oriental oscuro · reserva intelectual',
        arquetipo: 'La que reserva',
        desc: 'Incienso somalí, labdanum y mirra. La fragancia que no revela todo de una vez — profunda, densa, inaccesible a los impacientes.',
        svg: '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    },
    {
        id: 'Natural',
        polo: 'Fougère-Acuático · autenticidad',
        arquetipo: 'La que fluye',
        desc: 'Lavanda de Provenza, geranio bourbon y musgo verde. Sin artificio, sin exceso — la elegancia más honesta es la que no busca serlo.',
        svg: '<svg viewBox="0 0 24 24"><path d="M17 8c0 0-9 2-12 11 5-2 12-7 12-7"/><path d="M5 19c0 0 5-3 4-10 4 2 8 6 8 9"/></svg>'
    }
];

const PERSONALIDADES_M = [
    {
        id: 'Vanguardista',
        polo: 'Cítrico amargo · innovación',
        arquetipo: 'El que anticipa',
        desc: 'Yuzu, pomelo rosa y naranja amarga sobre base acuática mineral. Una composición que llega primero — antes que la tendencia.',
        svg: '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/><line x1="5" y1="8" x2="5" y2="16"/></svg>'
    },
    {
        id: 'Robusto',
        polo: 'Amaderado oscuro · solidez',
        arquetipo: 'El que sostiene',
        desc: 'Vetiver haitiano, cedro Atlas y oud camboyano. Una arquitectura olfativa que no cede. El peso específico de lo que perdura.',
        svg: '<svg viewBox="0 0 24 24"><path d="M3 20l9-16 9 16z"/><line x1="3" y1="20" x2="21" y2="20"/><line x1="12" y1="4" x2="15" y2="9"/></svg>'
    },
    {
        id: 'Sedicente',
        polo: 'Oriental especiado · autoridad silenciosa',
        arquetipo: 'El que convence',
        desc: 'Ámbar gris, incienso y especias oscuras. La fragancia de quien no necesita alzar la voz para dominar cualquier espacio.',
        svg: '<svg viewBox="0 0 24 24"><path d="M3 17l3-7 6 5 6-5 3 7z"/><line x1="3" y1="17" x2="21" y2="17"/><line x1="3" y1="20" x2="21" y2="20"/></svg>'
    },
    {
        id: 'Deportivo',
        polo: 'Cítrico-Acuático · movimiento',
        arquetipo: 'El que actúa',
        desc: 'Bergamota, calone marino y musgo verde. Composición aerodinámica para quien vive en movimiento constante y no necesita parar.',
        svg: '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
    },
    {
        id: 'Minimalista',
        polo: 'Acuático mineral · esencialidad',
        arquetipo: 'El que esencia',
        desc: 'Sal mineral, ambrette y calone puro. Lo prescindible ya fue eliminado. Queda solo lo que importa — nítido, limpio, preciso.',
        svg: '<svg viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12"/><circle cx="12" cy="12" r="1.5"/></svg>'
    }
];


/* ── Estado del configurador ───────────────────────────────── */

let data    = {};
const flow  = ['inicio','identidad','genero','emocion','familia','personalidad','acordes','intensidad','resultado'];
let history = ['inicio'];


/* ════════════════════════════════════════════════════════════════
   OVERLAY — Abrir / Cerrar el configurador
   ════════════════════════════════════════════════════════════════ */

function openConfigurador() {
    const overlay = document.getElementById('cfg-overlay');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cfg-open');

    // Foco accesible al primer elemento interactivo
    setTimeout(() => {
        const firstBtn = overlay.querySelector('button:not(.cfg-close)');
        if (firstBtn) firstBtn.focus();
    }, 450);

    show('inicio');
}

function closeConfigurador() {
    const overlay = document.getElementById('cfg-overlay');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cfg-open');

    // Devuelve el foco al botón que abrió el overlay
    document.querySelector('.nav-cta')?.focus();
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('cfg-open')) {
        closeConfigurador();
    }
});


/* ════════════════════════════════════════════════════════════════
   NAVEGACIÓN DE PASOS
   ════════════════════════════════════════════════════════════════ */

function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add('active');

    if (history[history.length - 1] !== id) history.push(id);
    updateChrome(id);

    // Poblar personalidades con las opciones correctas según género
    if (id === 'personalidad') renderPersonalidades();

    // Scroll interno del overlay al inicio del paso
    const wrap = document.querySelector('.cfg-wrap');
    if (wrap) wrap.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    if (history.length <= 1) return;
    history.pop();
    const prev = history[history.length - 1];
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(prev);
    if (target) target.classList.add('active');
    updateChrome(prev);
}

function updateChrome(id) {
    const idx = flow.indexOf(id);

    // Botón "Atrás": visible entre paso 1 y penúltimo (no en inicio ni resultado)
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.classList.toggle('visible', idx > 0 && id !== 'resultado');
    }

    // Progress dots
    const progress = document.getElementById('progress');
    if (!progress) return;

    if (idx <= 0 || id === 'resultado') {
        progress.classList.add('hidden');
    } else {
        progress.classList.remove('hidden');
        progress.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.remove('active', 'done');
            // idx-1 porque "inicio" (idx 0) no cuenta como paso numerado
            if      (i < idx - 1)  dot.classList.add('done');
            else if (i === idx - 1) dot.classList.add('active');
        });
    }
}

function next(targetId, requiredKey) {
    if (requiredKey && !data[requiredKey]) {
        alert('Selecciona una opción para continuar');
        return;
    }
    show(targetId);
}


/* ════════════════════════════════════════════════════════════════
   BIFURCACIÓN DE PERSONALIDAD POR GÉNERO
   W → Empoderada · Romántica · Audaz · Misteriosa · Natural
   M → Vanguardista · Robusto · Sedicente · Deportivo · Minimalista
   ════════════════════════════════════════════════════════════════ */

function renderPersonalidades() {
    const generoKey = (data.genero || '').toLowerCase();
    const isW = generoKey === 'dama';
    const isM = generoKey === 'caballero';

    const lista = isM ? PERSONALIDADES_M : PERSONALIDADES_W; // Unisex → W como base

    // Actualizar encabezado y texto guía según género
    const heading = document.getElementById('personalidad-heading');
    const lead    = document.querySelector('#personalidad .cfg-lead');
    if (heading) {
        heading.innerText = isM
            ? 'Tu carácter, tu sello'
            : isW
                ? 'Tu esencia, tu sello'
                : 'Tu personalidad, tu sello';
    }
    if (lead) {
        lead.innerText = isM
            ? 'El carácter define la fragancia. Elige el tuyo.'
            : isW
                ? 'Elige la esencia de quien eres. Tu perfume hablará con tu voz.'
                : 'Elige la actitud que mejor describe tu estilo de vida.';
    }

    // Limpiar selección anterior y re-renderizar opciones
    data.personalidad = null;
    const grid = document.getElementById('personalidades-grid');
    if (!grid) return;

    grid.innerHTML = lista.map(p => `
        <div class="option" onclick="select(this,'personalidad')" role="radio" aria-checked="false" tabindex="0"
             data-desc="${p.desc}">
            <div class="option-icon" aria-hidden="true">${p.svg}</div>
            <div class="option-label">${p.id}</div>
        </div>
    `).join('');
}


/* ════════════════════════════════════════════════════════════════
   SELECCIÓN DE OPCIONES
   ════════════════════════════════════════════════════════════════ */

function select(el, type) {
    const label = el.querySelector('.option-label');
    data[type]  = (label ? label.innerText : el.innerText).trim();

    // Actualizar estado visual y ARIA
    el.parentNode.querySelectorAll('.option').forEach(o => {
        o.classList.remove('selected');
        o.setAttribute('aria-checked', 'false');
    });
    el.classList.add('selected');
    el.setAttribute('aria-checked', 'true');

    // Descripción expandible
    const descBox = document.getElementById('desc-' + type);
    if (descBox) {
        const desc = el.dataset.desc || '';
        if (desc) {
            descBox.innerText = desc;
            descBox.classList.add('visible');
        } else {
            descBox.classList.remove('visible');
        }
    }
}

// Accesibilidad: activar opciones con teclado (Enter / Space)
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('option')) {
        e.preventDefault();
        e.target.click();
    }
});


/* ════════════════════════════════════════════════════════════════
   VALIDACIÓN DE IDENTIDAD
   ════════════════════════════════════════════════════════════════ */

function validarIdentidad() {
    const nombre   = document.getElementById('nombre')?.value.trim()   ?? '';
    const telefono = document.getElementById('telefono')?.value.trim() ?? '';

    if (!nombre || !telefono) {
        alert('Por favor completa nombre y teléfono');
        return;
    }
    data.nombre   = nombre;
    data.telefono = telefono;
    show('genero');
}


/* ════════════════════════════════════════════════════════════════
   CREACIÓN DEL PERFUME
   ════════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────
   HELPERS DEL MOTOR PREMIUM
   ──────────────────────────────────────────────────────────── */

/** ID determinista 100-999 derivado de las selecciones */
function _seleccionId(vals) {
    const str = vals.join('');
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
    return 100 + (Math.abs(h) % 900);
}

/** Nota del perfumista construida desde fragmentos por selección */
function _generarNota(d, prefijo, familiaEfectiva, concentracion) {
    const gk = (d.genero || '').toLowerCase();

    const INTROS = {
        dama:      'Una fragancia diseñada para quien marca presencia sin alzar la voz.',
        caballero: 'Una composición forjada para quien sabe exactamente quién es.',
        unisex:    'Una creación que trasciende convenciones y pertenece a quien la lleva.',
        _:         'Una fragancia concebida para ser irrepetible.'
    };

    const CUERPOS = {
        'Vitalidad': 'Construida sobre una arquitectura viva y energizante — la frescura del primer impulso de un día que comienza con fuerza.',
        'Elegante':  'Diseñada con la precisión de lo que no necesita explicación. Cada nota ocupa su lugar con una certeza que no admite dudas.',
        'Seguro':    'Una fórmula de confianza absoluta. La seguridad tiene aroma — y este es el tuyo.'
    };

    const ACORDE_NOTAS = {
        'Vetiver':      'El vetiver ancla la composición con su raíz terrosa e inconfundible.',
        'Ámbar':        'El ámbar despliega su calidez resinosa como un abrazo que permanece.',
        'Cuero':        'El cuero aporta su carácter curtido: una firma de autoridad olfativa.',
        'Bergamota':    'La bergamota abre el juego con su brillo cítrico y su toque floral de fondo.',
        'Jazmín':       'El jazmín grandiflorum infunde un corazón indólico de profundidad excepcional.',
        'Lavanda':      'La lavanda de Provenza traza el hilo aromático que une frescura y calidez.',
        'Pachulí':      'El pachulí oscuro recuerda que las raíces más profundas son también las más duraderas.',
        'Musgo Marino': 'El musgo marino recrea la transparencia salada de un horizonte sin límite.'
    };

    const CIERRES = {
        'Empoderada':   'Hecha para quien define las reglas.',
        'Romántica':    'Una fragancia que se entrega sin perder su núcleo.',
        'Audaz':        'Para quien el riesgo es el único camino que vale la pena.',
        'Misteriosa':   'Lo que no se revela del todo, no se olvida jamás.',
        'Natural':      'Sin artificio. Sin exceso. Solo autenticidad.',
        'Vanguardista': 'Siempre un paso antes que la tendencia.',
        'Robusto':      'Lo que está construido para durar, dura.',
        'Sedicente':    'La autoridad más poderosa es la que no necesita proclamarse.',
        'Deportivo':    'En movimiento constante. Sin pausa. Sin pretexto.',
        'Minimalista':  'Menos, para que todo lo que quede importe más.'
    };

    const intro   = INTROS[gk]             || INTROS['_'];
    const cuerpo  = CUERPOS[d.emocion]     || '';
    const acNota  = ACORDE_NOTAS[d.acordes]|| '';
    const cierre  = CIERRES[d.personalidad]|| '';

    return [intro, cuerpo, acNota, cierre].filter(Boolean).join(' ');
}

/** Construye el HTML de la pirámide olfativa */
function _construirPiramide(d, mapaEmocion) {
    const PIRA = {
        'Cítrico':   { salida:'Bergamota, limón siciliano, yuzu',    corazon:'Neroli, lavanda',            fondo:'Almizcle blanco, cedro' },
        'Floral':    { salida:'Neroli, bergamota',                   corazon:'Jazmín, rosa centifolia, peonía', fondo:'Almizcle, sándalo' },
        'Amaderado': { salida:'Aldehídos florales, iris',            corazon:'Rosa, geranio bourbon',      fondo:'Sándalo, vetiver, cedro Atlas' },
        'Oriental':  { salida:'Cardamomo, especias cálidas',         corazon:'Oud, ámbar gris',            fondo:'Vetiver, cuero, resinas' },
        'Chipre':    { salida:'Bergamota, limón',                    corazon:'Rosa, muguet',               fondo:'Musgo de roble, labdanum, vetiver' },
        'Fougère':   { salida:'Lavanda, romero',                     corazon:'Geranio, neroli',            fondo:'Coumarina, musgo de roble, cedro' },
        'Gourmand':  { salida:'Bergamota, caramelo',                 corazon:'Vainilla, café arabica',     fondo:'Benjuí, musgo, ámbar' },
        'Acuático':  { salida:'Calone, musgo marino',                corazon:'Violeta de mar, neroli',     fondo:'Sal mineral, almizcle blanco' }
    };

    const familia = d.familia || mapaEmocion.familia_sugerida || 'Amaderado';
    const pir     = PIRA[familia] || PIRA['Amaderado'];

    const salida  = mapaEmocion.notas_salida   || pir.salida;
    const corazon = mapaEmocion.notas_corazon  || pir.corazon;
    const fondo   = mapaEmocion.notas_fondo    || pir.fondo;

    return `
        <div class="pir-row"><span class="pir-label">Salida</span><span class="pir-notas">${salida}</span></div>
        <div class="pir-row"><span class="pir-label">Corazón</span><span class="pir-notas">${corazon}</span></div>
        <div class="pir-row"><span class="pir-label">Fondo</span><span class="pir-notas">${fondo}</span></div>
    `;
}


/* ════════════════════════════════════════════════════════════════
   CREACIÓN DEL PERFUME — SELLO PREMIUM
   Formato: [W/M/U][ID] | [ACORDE] · [FAMILIA] · [CONCENTRACIÓN]
   ════════════════════════════════════════════════════════════════ */

function crearPerfume() {
    if (!data.intensidad) {
        alert('Selecciona una intensidad');
        return;
    }

    // ── Prefijo de género
    const gk = (data.genero || '').toLowerCase();
    const prefixLetter = gk === 'caballero' ? 'M' : gk === 'dama' ? 'W' : 'U';

    // ── ID determinista 100-999
    const selId  = _seleccionId([data.genero, data.emocion, data.familia, data.personalidad, data.acordes, data.intensidad]);
    const prefijo = `${prefixLetter}${selId}`;

    // ── Concentración → sello textual
    const CONC_SELLO = { 'Suave': 'EAU DE TOILETTE', 'Equilibrado': 'EAU DE PARFUM', 'Intenso': 'EXTRAIT DE PARFUM' };
    const concentracion = CONC_SELLO[data.intensidad] || 'EAU DE PARFUM';

    // ── Familia efectiva
    const mapaEmocion     = EMOCION_FAMILIA_MAP[data.emocion] || {};
    const familiaEfectiva = data.familia || mapaEmocion.familia_sugerida || '';
    const familiaLabel    = familiaEfectiva.toUpperCase();

    // ── Acorde primario (elección del usuario, mayúsculas)
    const acordePrim = (data.acordes || '').toUpperCase();

    // ── Sello completo
    const sello = `${prefijo} ${acordePrim} ${familiaLabel} ${concentracion}`;
    data.perfume          = sello;
    data.sello            = sello;
    data.notaPerfumista   = _generarNota(data, prefijo, familiaEfectiva, concentracion);

    // ── Renderizar resultado
    const nameEl  = document.getElementById('perfume-name');
    const selloEl = document.getElementById('perfume-sello');
    const descEl  = document.getElementById('perfume-desc');
    const pirEl   = document.getElementById('perfume-piramide');

    if (nameEl)  nameEl.innerText  = prefijo;
    if (selloEl) selloEl.innerText = `${acordePrim} · ${familiaLabel} · ${concentracion}`;
    if (descEl)  descEl.innerText  = data.notaPerfumista;
    if (pirEl)   pirEl.innerHTML   = _construirPiramide(data, mapaEmocion);

    guardarEnSheet();
    show('resultado');
}


/* ════════════════════════════════════════════════════════════════
   GOOGLE SHEETS (opcional)
   ════════════════════════════════════════════════════════════════ */

async function guardarEnSheet() {
    if (!SHEETS_ENDPOINT) return;

    const params = new URLSearchParams({
        fecha:        new Date().toISOString(),
        nombre:       data.nombre       || '',
        telefono:     data.telefono     || '',
        perfume:      data.perfume      || '',
        genero:       data.genero       || '',
        emocion:      data.emocion      || '',
        familia:      data.familia      || '',
        personalidad: data.personalidad || '',
        acordes:      data.acordes      || '',
        intensidad:   data.intensidad   || ''
    });

    try {
        await fetch(SHEETS_ENDPOINT, { method: 'POST', body: params });
    } catch (err) {
        console.error('No se pudo guardar en Sheets:', err);
    }
}


/* ════════════════════════════════════════════════════════════════
   WHATSAPP
   ════════════════════════════════════════════════════════════════ */

function confirmarEnvio() {
    if (confirm('¿Deseas enviar tu solicitud por WhatsApp?')) enviarWhats();
}

function enviarWhats() {
    const sello = data.sello || data.perfume || '-';
    const nota  = data.notaPerfumista || '';

    const mensaje =
`Hola, quiero reservar un perfume personalizado de Félix Chaja Parfums.

✦ Sello: ${sello}

Nombre:       ${data.nombre       || '-'}
Teléfono:     ${data.telefono     || '-'}

— Configuración —
Género:       ${data.genero       || '-'}
Emoción:      ${data.emocion      || '-'}
Familia:      ${data.familia      || '-'}
Personalidad: ${data.personalidad || '-'}
Acorde:       ${data.acordes      || '-'}
Intensidad:   ${data.intensidad   || '-'}

— Nota del perfumista —
${nota}

Quedo atento para continuar con el proceso.`;

    window.open(
        `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`,
        '_blank'
    );
}


/* ════════════════════════════════════════════════════════════════
   REINICIAR
   ════════════════════════════════════════════════════════════════ */

function reiniciar() {
    data    = {};
    history = ['inicio'];

    // Limpiar campos de texto
    const nombre   = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    if (nombre)   nombre.value   = '';
    if (telefono) telefono.value = '';

    // Limpiar selecciones y descripciones
    document.querySelectorAll('.option').forEach(o => {
        o.classList.remove('selected');
        o.setAttribute('aria-checked', 'false');
    });
    document.querySelectorAll('.option-desc').forEach(d => d.classList.remove('visible'));

    // Cerrar overlay y volver a la landing
    closeConfigurador();
}


/* ════════════════════════════════════════════════════════════════
   NAVBAR — Fondo sólido al hacer scroll
   ════════════════════════════════════════════════════════════════ */

(function initNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 70);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();


/* ════════════════════════════════════════════════════════════════
   SCROLL SUAVE — Anchor links con offset de la navbar
   ════════════════════════════════════════════════════════════════ */

(function initSmoothScroll() {
    const NAV_OFFSET = 76; // px — altura de .l-nav + margen

    document.querySelectorAll('a[href^="#"].js-scroll, .nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href   = link.getAttribute('href');
            const target = href && href !== '#' ? document.querySelector(href) : null;
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();


/* ════════════════════════════════════════════════════════════════
   REVEAL ON SCROLL — IntersectionObserver
   ════════════════════════════════════════════════════════════════ */

(function initReveal() {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();


/* ════════════════════════════════════════════════════════════════
   INIT — Estado inicial del configurador
   ════════════════════════════════════════════════════════════════ */

updateChrome('inicio');
