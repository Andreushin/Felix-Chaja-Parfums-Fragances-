/* ════════════════════════════════════════════════════════════════
   Félix Chaja Parfums — app.js
   SPA: Landing + Configurador en overlay.
   ════════════════════════════════════════════════════════════════ */


/* ── Configuración ─────────────────────────────────────────── */

const SHEETS_ENDPOINT = ""; // URL de tu Google Apps Script (opcional)
const WHATSAPP_NUMERO = "524612723409";


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

function crearPerfume() {
    if (!data.intensidad) {
        alert('Selecciona una intensidad');
        return;
    }

    // Nombre generado
    const nombres = ['Obsidian', 'Noiré', 'Velours', 'Éter', 'Solstice', 'Aureum'];
    const n       = nombres[Math.floor(Math.random() * nombres.length)];
    const num     = Math.floor(Math.random() * 20) + 1;
    data.perfume  = `${n} Nº ${num}`;

    // Descripción narrativa
    const partes = [];
    if (data.genero)      partes.push(data.genero.toLowerCase() === 'unisex' ? 'unisex' : `para ${data.genero.toLowerCase()}`);
    if (data.emocion)     partes.push(`sensación ${data.emocion.toLowerCase()}`);
    if (data.familia)     partes.push(`familia ${data.familia.toLowerCase()}`);
    if (data.personalidad) partes.push(`personalidad ${data.personalidad.toLowerCase()}`);
    if (data.acordes)     partes.push(`acorde de ${data.acordes.toLowerCase()}`);
    if (data.intensidad)  partes.push(`intensidad ${data.intensidad.toLowerCase()}`);

    // Renderizar en pantalla de resultado
    const nameEl = document.getElementById('perfume-name');
    const descEl = document.getElementById('perfume-desc');
    if (nameEl) nameEl.innerText = data.perfume;
    if (descEl) descEl.innerText = 'Una composición ' + partes.join(', ') + '.';

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
    const mensaje =
`Hola, quiero reservar un perfume personalizado:

Nombre:       ${data.nombre       || '-'}
Teléfono:     ${data.telefono     || '-'}
Perfume:      ${data.perfume      || '-'}
Género:       ${data.genero       || '-'}
Emoción:      ${data.emocion      || '-'}
Familia:      ${data.familia      || '-'}
Personalidad: ${data.personalidad || '-'}
Acorde:       ${data.acordes      || '-'}
Intensidad:   ${data.intensidad   || '-'}

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
