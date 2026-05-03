# Félix Chaja · Parfums & Fragrances

Configurador web de perfumes personalizados. Pequeña aplicación de una sola página, 100% estática, que guía al cliente paso a paso por la creación de su fragancia y envía la solicitud final por WhatsApp.

## Demo

Una vez desplegado en GitHub Pages, la aplicación está disponible en:

```
[https://andreushin.github.io/Felix-Chaja-Parfums-Fragances-/]
```

## Características

- Flujo guiado de 6 pasos: datos personales, emoción, familia olfativa, inspiración, acordes e intensidad.
- Indicador de progreso, botón "Atrás" y opción de reiniciar.
- Generación automática del nombre del perfume y descripción a partir de las elecciones del usuario.
- Envío de la solicitud al número de WhatsApp del negocio con todos los datos del configurador.
- Diseño responsive (mobile-first) con tipografía editorial y paleta negro/dorado.
- Sin dependencias de build: HTML, CSS y JavaScript puros.

## Estructura del proyecto

```
.
├── index.html      # Estructura y contenido
├── styles.css      # Tema visual (variables, layout, responsive)
└── app.js          # Lógica del flujo y envío a WhatsApp
```

### Personalizar opciones

Las opciones de cada paso (emoción, familia, acordes, intensidad) viven directamente en `index.html` como `<div class="option">`. Para añadir o cambiar una, basta con duplicar la línea y editar el texto.

### Cambiar la paleta o tipografía

Las variables de color están al inicio de `styles.css`:

```css
:root{
    --bg:#0B0B0B;
    --gold:#C8A96A;
    --text:#F5F1EA;
    /* ... */
}
```

Las fuentes (`Cormorant Garamond` e `Inter`) se cargan desde Google Fonts en `index.html`.

## Licencia

Version de prueba propiedad de Félix Chaja Parfums. Todos los derechos reservados.
