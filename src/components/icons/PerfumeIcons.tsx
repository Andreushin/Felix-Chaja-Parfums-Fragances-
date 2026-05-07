/* ════════════════════════════════════════════════════════════════
   Félix Chaja Parfums — Iconografía SVG Line-Art
   Regla 3: trazos finos 0.5pt–1pt · estilo "line-art" de alta gama
   Diseño: formas abstractas, ningún icono de baño, sin flechas.
   ════════════════════════════════════════════════════════════════ */

import type { SVGProps } from 'react';

// ─────────────────────────────────────────────────────────────────
// Tipo base compartido
// ─────────────────────────────────────────────────────────────────

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

const defaultProps = {
  fill:           'none',
  stroke:         'currentColor',
  strokeLinecap:  'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox:        '0 0 24 24',
};

// ─────────────────────────────────────────────────────────────────
// GÉNERO — Abstractos minimalistas (SIN iconos de baño)
// ─────────────────────────────────────────────────────────────────

/** Dama: círculo delicado con línea descendente — estilizado, no un signo de Venus */
export function GenderWIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Óvalo elegante */}
      <ellipse cx="12" cy="9.5" rx="5.5" ry="6"/>
      {/* Línea de anclaje */}
      <line x1="12" y1="15.5" x2="12" y2="22"/>
      {/* Trazo horizontal — equilibrio */}
      <line x1="8.5" y1="19" x2="15.5" y2="19"/>
    </svg>
  );
}

/** Caballero: ángulo recto ascendente con trazo dinámico — no el signo de Marte */
export function GenderMIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Círculo base */}
      <circle cx="10.5" cy="13.5" r="5.5"/>
      {/* Diagonal ascendente */}
      <line x1="14.5" y1="9.5" x2="21" y2="3"/>
      {/* Trazo de apoyo — ángulo de 90° */}
      <polyline points="17,3 21,3 21,7"/>
    </svg>
  );
}

/** Unisex: dos óvalos superpuestos con intersección abstracta */
export function GenderUIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <ellipse cx="9" cy="12" rx="5" ry="6" transform="rotate(-15 9 12)"/>
      <ellipse cx="15" cy="12" rx="5" ry="6" transform="rotate(15 15 12)"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// EMOCIONES
// ─────────────────────────────────────────────────────────────────

/** Elegante: diamante de trazo fino — presencia refinada */
export function EleganteIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M6 3h12l4 6-10 12L2 9z"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="12" y1="3" x2="8" y2="9"/>
      <line x1="12" y1="3" x2="16" y2="9"/>
    </svg>
  );
}

/** Vitalidad: sol minimalista con rayos finos — energía radiante */
export function VitalidadIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2"    x2="12" y2="5"/>
      <line x1="12" y1="19"   x2="12" y2="22"/>
      <line x1="4.2"  y1="4.2"  x2="6.3"  y2="6.3"/>
      <line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/>
      <line x1="2"    y1="12"   x2="5"    y2="12"/>
      <line x1="19"   y1="12"   x2="22"   y2="12"/>
      <line x1="4.2"  y1="19.8" x2="6.3"  y2="17.7"/>
      <line x1="17.7" y1="6.3"  x2="19.8" y2="4.2"/>
    </svg>
  );
}

/** Seguro: escudo minimalista — protección y carácter */
export function SeguroIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// FAMILIAS OLFATIVAS
// ─────────────────────────────────────────────────────────────────

/** Cítrico: segmento de fruta con trazo de nervadura */
export function CitricoIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <ellipse cx="12" cy="13" rx="7" ry="8" transform="rotate(-20 12 13)"/>
      <path d="M12 5.5v15"/>
      <path d="M5 13h14"/>
      <path d="M6.5 8l11 10M17.5 8l-11 10"/>
      <path d="M15 5l2-3"/>
    </svg>
  );
}

/** Floral: cuatro pétalos simétricos con centro puntual */
export function FloralIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 4c2.5 2 2.5 5.5 0 8"/>
      <path d="M12 20c-2.5-2-2.5-5.5 0-8"/>
      <path d="M4 12c2-2.5 5.5-2.5 8 0"/>
      <path d="M20 12c-2 2.5-5.5 2.5-8 0"/>
    </svg>
  );
}

/**
 * Amaderado: anillos concéntricos de tronco de árbol.
 * Regla 3: PROHIBIDO usar flechas. Usar anillos de tronco.
 */
export function AmaderadoIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Anillos concéntricos — corte transversal de tronco */}
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="7"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="12" cy="12" r="1.5"/>
      {/* Veta radial — detalle anatómico */}
      <line x1="12" y1="2" x2="12" y2="8" strokeOpacity="0.5"/>
    </svg>
  );
}

/** Oriental: estrella de ocho puntas — símbolo de lo exótico */
export function OrientalIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 2v3M12 19v3M4 12h3M17 12h3"/>
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
      <circle cx="12" cy="12" r="3.5"/>
    </svg>
  );
}

/** Chipre: musgo abstracto sobre roca — terroso y clásico */
export function ChipreIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Roca base */}
      <path d="M3 18c0-2 2-4 5-4h8c3 0 5 2 5 4"/>
      <ellipse cx="12" cy="18" rx="9" ry="2.5"/>
      {/* Musgo sobre roca */}
      <path d="M7 14c0-3 2-6 5-6s5 3 5 6"/>
      <path d="M9 14c0-2 1-4 3-4s3 2 3 4"/>
    </svg>
  );
}

/** Fougère: espiga de lavanda — herbal y botánico */
export function FougereIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <line x1="12" y1="22" x2="12" y2="8"/>
      {/* Pares de flores en el tallo */}
      <path d="M12 18c-3 0-5-2-5-4 3 0 5 2 5 4z"/>
      <path d="M12 18c3 0 5-2 5-4-3 0-5 2-5 4z"/>
      <path d="M12 14c-2.5 0-4-1.5-4-3 2.5 0 4 1.5 4 3z"/>
      <path d="M12 14c2.5 0 4-1.5 4-3-2.5 0-4 1.5-4 3z"/>
      <path d="M12 10c-2 0-3.5-1.5-3.5-3 2 0 3.5 1.5 3.5 3z"/>
      <path d="M12 10c2 0 3.5-1.5 3.5-3-2 0-3.5 1.5-3.5 3z"/>
    </svg>
  );
}

/** Gourmand: gota de miel o cacao — placer sensorial */
export function GourmandIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 3c0 0-8 9-8 14a8 8 0 0 0 16 0C20 12 12 3 12 3z"/>
      <path d="M8 16c1 2 2.5 3.5 4 3.5" strokeOpacity="0.5"/>
    </svg>
  );
}

/** Acuático: ondas marinas con burbujas minerales */
export function AcuaticoIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M2 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      <path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      <circle cx="6"  cy="7" r="1.2" fill="currentColor" strokeWidth="0"/>
      <circle cx="14" cy="6" r="0.9" fill="currentColor" strokeWidth="0"/>
      <circle cx="18" cy="7.5" r="0.7" fill="currentColor" strokeWidth="0"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// ACORDES ESPECÍFICOS — Iconografía de alta precisión
// ─────────────────────────────────────────────────────────────────

/**
 * Vetiver: raíces finas verticales asimétricas.
 * Regla 3: "líneas verticales orgánicas asimétricas simulando raíces profundas"
 */
export function VetiverIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Tallo central */}
      <line x1="12" y1="10" x2="12" y2="3"/>
      {/* Raíces asimétricas — diferentes largos y ángulos */}
      <path d="M12 10l-4.5 12"/>   {/* izq exterior */}
      <path d="M12 10l-2 12"/>      {/* izq interior */}
      <path d="M12 10l0 12"/>        {/* centro */}
      <path d="M12 10l2 11"/>        {/* der interior */}
      <path d="M12 10l4.5 10"/>      {/* der exterior */}
      {/* Línea de tierra */}
      <line x1="5.5" y1="10" x2="18.5" y2="10"/>
    </svg>
  );
}

/**
 * Cuero de Russie: pliegue suave de piel premium.
 * Regla 3: "una curva suave o pliegue que represente la caída de piel premium"
 */
export function CueroIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Pieza de cuero con pliegue característico */}
      <path d="M4 5c0-1 1-2 2-2h12c1 0 2 1 2 2v1c0 3-3 4-3 6s3 3 3 6v1c0 1-1 2-2 2H6c-1 0-2-1-2-2v-1c0-3 3-4 3-6S4 9 4 6V5z"/>
      {/* Pliegue horizontal — detalle artesanal */}
      <line x1="4" y1="12" x2="20" y2="12" strokeOpacity="0.4"/>
      {/* Costura lateral */}
      <line x1="8" y1="3" x2="8" y2="21" strokeDasharray="2 3" strokeOpacity="0.35"/>
    </svg>
  );
}

/**
 * Extravagante: diamante tallado asimétricamente.
 * Regla 3: "diamante tallado asimétricamente o forma geométrica que rompa la simetría"
 */
export function ExtravagantIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      {/* Contorno asimétrico — corona más amplia en la derecha */}
      <path d="M5 3h14l4 7L12 22 1 10l4-7z"/>
      {/* Línea de cintura */}
      <line x1="1" y1="10" x2="23" y2="10"/>
      {/* Facetas internas — asimétricas intencionalmente */}
      <line x1="5"  y1="3" x2="8"  y2="10"/>
      <line x1="19" y1="3" x2="15" y2="10"/>
      <line x1="8"  y1="10" x2="12" y2="22"/>
      <line x1="15" y1="10" x2="12" y2="22"/>
      {/* Faceta adicional asimétrica */}
      <line x1="12" y1="3" x2="16" y2="10" strokeOpacity="0.5"/>
    </svg>
  );
}

/** Ámbar: gota resinosa — cálido y sensual */
export function AmbarIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 3c0 0-8 9-8 14a8 8 0 0 0 16 0C20 12 12 3 12 3z"/>
      <path d="M8 17c1 2.5 3 4 4 4" strokeOpacity="0.45"/>
    </svg>
  );
}

/** Bergamota: rodaja cítrica con gajos internos */
export function BergamotaIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="13" r="8"/>
      <line x1="12" y1="5" x2="12" y2="21"/>
      <line x1="4" y1="13" x2="20" y2="13"/>
      <line x1="6.3" y1="7.3" x2="17.7" y2="18.7" strokeOpacity="0.5"/>
      <line x1="17.7" y1="7.3" x2="6.3" y2="18.7" strokeOpacity="0.5"/>
      {/* Ramita característica */}
      <path d="M16 4l1.5-2.5M17.5 1.5l1.5 1"/>
    </svg>
  );
}

/** Jazmín: cinco pétalos estrellados con centro detallado */
export function JazminIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="1.5"/>
      {/* Cinco pétalos elongados */}
      <path d="M12 10.5V5"/>
      <path d="M12 13.5V19"/>
      <path d="M10.7 11.2l-4.6-3"/>
      <path d="M13.3 12.8l4.6 3"/>
      <path d="M10.2 12.7l-4.6 3"/>
      <path d="M13.8 11.3l4.6-3"/>
    </svg>
  );
}

/** Lavanda: espiga herbácea con flores alternadas */
export function LavandaIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <line x1="12" y1="22" x2="12" y2="9"/>
      <path d="M12 18c-2.5-1-3.5-2.5-3.5-4 2.5 0 3.5 1.5 3.5 4z"/>
      <path d="M12 18c2.5-1 3.5-2.5 3.5-4-2.5 0-3.5 1.5-3.5 4z"/>
      <path d="M12 14c-2-1-3-2.5-3-4 2 0 3 1.5 3 4z"/>
      <path d="M12 14c2-1 3-2.5 3-4-2 0-3 1.5-3 4z"/>
      <path d="M12 10c-1.5-1-2.5-2-2.5-3.5 1.5 0 2.5 1 2.5 3.5z"/>
      <path d="M12 10c1.5-1 2.5-2 2.5-3.5-1.5 0-2.5 1-2.5 3.5z"/>
    </svg>
  );
}

/** Pachulí: hoja orgánica oscura con nervaduras */
export function PachuliIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 21c-5.5-4.5-8-9.5-5-15 2 1 4 3.5 5 6.5 1-3 3-5.5 5-6.5 3 5.5 0.5 10.5-5 15z"/>
      {/* Nervadura central */}
      <line x1="12" y1="21" x2="12" y2="12" strokeOpacity="0.4"/>
    </svg>
  );
}

/** Musgo Marino: ondas con gotas de bruma */
export function MusgoMarinoIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M2 11c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0"/>
      <path d="M2 16c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0"/>
      {/* Aerosol marino */}
      <circle cx="6"  cy="7.5" r="1.2" fill="currentColor" strokeWidth="0"/>
      <circle cx="14" cy="6.5" r="0.9" fill="currentColor" strokeWidth="0"/>
      <circle cx="19" cy="8"   r="0.7" fill="currentColor" strokeWidth="0"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// PERSONALIDADES — Dama (W)
// ─────────────────────────────────────────────────────────────────

/** Empoderada: corona minimalista */
export function EmpoderadaIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M2 18l3.5-9 6.5 6 6.5-6 3.5 9z"/>
      <line x1="2" y1="21" x2="22" y2="21"/>
    </svg>
  );
}

/** Romántica: corazón con trazo de pluma */
export function RomanticaIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

/** Audaz: rayo asimétrico — riesgo y determinación */
export function AudazIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M14 2L4 14h9l-1 8 11-13h-9l1-7z"/>
    </svg>
  );
}

/** Misteriosa: luna creciente con estrella */
export function MisteriosIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

/** Natural: hoja simple con nervadura */
export function NaturalIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6" strokeOpacity="0.6"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// PERSONALIDADES — Caballero (M)
// ─────────────────────────────────────────────────────────────────

/** Vanguardista: flecha diagonal — anticipación */
export function VanguardistaIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  );
}

/** Robusto: tres líneas horizontales de peso creciente */
export function RobustoIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <line x1="4" y1="8"  x2="20" y2="8"  strokeWidth="0.7"/>
      <line x1="2" y1="13" x2="22" y2="13" strokeWidth="0.9"/>
      <line x1="4" y1="18" x2="20" y2="18" strokeWidth="1.2"/>
    </svg>
  );
}

/** Sedicente: estrella de cuatro puntas — autoridad silenciosa */
export function SedICenteIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 2l2.5 7.5H22l-6.2 4.5 2.4 7.5L12 17l-6.2 4.5 2.4-7.5L2 9.5h7.5z"/>
    </svg>
  );
}

/** Deportivo: rayo limpio — movimiento constante */
export function DeportivoIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}

/** Minimalista: punto y línea — esencialidad */
export function MinimalistaIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" strokeWidth="0"/>
      <line x1="4"  y1="12" x2="10" y2="12"/>
      <line x1="14" y1="12" x2="20" y2="12"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// INTENSIDAD
// ─────────────────────────────────────────────────────────────────

/** EDT — Nube ligera */
export function IntensidadEdtIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M18 18a4 4 0 0 0 0-8 6 6 0 0 0-12 0 4 4 0 0 0 0 8h12z"/>
    </svg>
  );
}

/** EDP — Balanza equilibrada */
export function IntensidadEdpIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M5 7h14"/>
      <path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7z"/>
      <path d="M19 7l-3 7a3 3 0 0 0 6 0l-3-7z"/>
    </svg>
  );
}

/** Extrait — Llama viva */
export function IntensidadExtraitIcon({ size = 24, strokeWidth = 0.85, ...props }: IconProps) {
  return (
    <svg width={size} height={size} {...defaultProps} strokeWidth={strokeWidth} {...props}>
      <path d="M12 22a8 8 0 0 0 8-8c0-4-3-6-4-9-1 2-2 3-2 5-2-1-3-3-3-5-2 2-3 5-3 9a8 8 0 0 0 4 8z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAPA DE ICONOS — Para uso dinámico desde el catálogo
// ─────────────────────────────────────────────────────────────────

export const FAMILY_ICONS = {
  citrico:   CitricoIcon,
  floral:    FloralIcon,
  amaderado: AmaderadoIcon,
  oriental:  OrientalIcon,
  chipre:    ChipreIcon,
  fougere:   FougereIcon,
  gourmand:  GourmandIcon,
  acuatico:  AcuaticoIcon,
} as const;

export const ACCORD_ICONS = {
  'vetiver-haitiano':    VetiverIcon,
  'cuero-russie':        CueroIcon,
  'bergamota':           BergamotaIcon,
  'jazmin-grandiflorum': JazminIcon,
  'lavanda-provenza':    LavandaIcon,
  'patchouli-oscuro':    PachuliIcon,
  'musgo-marino':        MusgoMarinoIcon,
  'ambar-gris':          AmbarIcon,
} as const;

export const EMOTION_ICONS = {
  elegante:  EleganteIcon,
  vitalidad: VitalidadIcon,
  seguro:    SeguroIcon,
} as const;

export const GENDER_ICONS = {
  W: GenderWIcon,
  M: GenderMIcon,
  U: GenderUIcon,
} as const;

export const PERSONALITY_ICONS_W = {
  empoderada: EmpoderadaIcon,
  romantica:  RomanticaIcon,
  audaz:      AudazIcon,
  misteriosa: MisteriosIcon,
  natural:    NaturalIcon,
} as const;

export const PERSONALITY_ICONS_M = {
  vanguardista: VanguardistaIcon,
  robusto:      RobustoIcon,
  sedicente:    SedICenteIcon,
  deportivo:    DeportivoIcon,
  minimalista:  MinimalistaIcon,
} as const;
