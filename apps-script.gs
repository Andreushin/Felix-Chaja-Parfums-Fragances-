/**
 * Felix Chaja Parfums — Endpoint para registrar leads en Google Sheets.
 *
 * Cómo usarlo:
 *   1. Crea una Google Sheet nueva.
 *   2. En la primera fila escribe estos encabezados (en este orden):
 *        Fecha | Nombre | Teléfono | Perfume | Género | Emoción | Familia | Personalidad | Acordes | Intensidad
 *   3. Menú: Extensiones → Apps Script.
 *   4. Borra el código por defecto y pega este archivo completo.
 *   5. Guarda (icono del disco). Asígnale un nombre al proyecto.
 *   6. Pulsa "Implementar" → "Nueva implementación".
 *        - Tipo: Aplicación web
 *        - Ejecutar como: Yo (tu cuenta)
 *        - Quién tiene acceso: Cualquiera
 *   7. Copia la URL de la implementación (termina en /exec) y pégala
 *      en la constante SHEETS_ENDPOINT del archivo app.js.
 *   8. Cada vez que cambies este script tienes que crear una NUEVA
 *      implementación o "gestionar implementaciones" → editar versión.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const p = (e && e.parameter) ? e.parameter : {};

    sheet.appendRow([
      p.fecha        || new Date().toISOString(),
      p.nombre       || "",
      p.telefono     || "",
      p.perfume      || "",
      p.genero       || "",
      p.emocion      || "",
      p.familia      || "",
      p.personalidad || "",
      p.acordes      || "",
      p.intensidad   || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite probar la URL en el navegador (debería responder "Felix Chaja API OK")
function doGet() {
  return ContentService
    .createTextOutput("Felix Chaja API OK")
    .setMimeType(ContentService.MimeType.TEXT);
}