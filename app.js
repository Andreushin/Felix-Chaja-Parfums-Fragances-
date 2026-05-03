/* ─────────────────────────────────────────────────────────────
   CONFIGURACIÓN
   Pega aquí la URL de tu Web App de Google Apps Script.
   Si la dejas vacía, el formulario sigue funcionando con WhatsApp,
   pero NO se guardará nada en la hoja de cálculo.
   ───────────────────────────────────────────────────────────── */
const SHEETS_ENDPOINT = ""; // Ej: "https://script.google.com/macros/s/AKfycbx.../exec"
const WHATSAPP_NUMERO = "524612723409";

let data = {};
const flow = ['inicio','identidad','emocion','familia','personalidad','acordes','intensidad','resultado'];
let history = ['inicio'];

function show(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    target.classList.add('active');
    if(history[history.length-1] !== id) history.push(id);
    updateChrome(id);
    window.scrollTo({top:0, behavior:'smooth'});
}

function goBack(){
    if(history.length <= 1) return;
    history.pop();
    const prev = history[history.length-1];
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(prev).classList.add('active');
    updateChrome(prev);
}

function updateChrome(id){
    const idx = flow.indexOf(id);
    document.getElementById('backBtn').classList.toggle('visible', idx > 0 && idx < flow.length-1);
    const progress = document.getElementById('progress');
    if(idx <= 0 || id === 'resultado'){
        progress.classList.add('hidden');
    } else {
        progress.classList.remove('hidden');
        const dots = progress.querySelectorAll('.dot');
        dots.forEach((d,i) => {
            d.classList.remove('active','done');
            if(i < idx-1) d.classList.add('done');
            else if(i === idx-1) d.classList.add('active');
        });
    }
}

function select(el, type){
    // Tomamos solo el texto del label (no del icono SVG si lo hay)
    const label = el.querySelector('.option-label');
    data[type] = (label ? label.innerText : el.innerText).trim();

    el.parentNode.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');

    // Mostramos la descripción asociada (data-desc) en el contenedor del paso
    const descBox = document.getElementById('desc-' + type);
    if(descBox){
        const desc = el.dataset.desc || '';
        if(desc){
            descBox.innerText = desc;
            descBox.classList.add('visible');
        } else {
            descBox.classList.remove('visible');
        }
    }
}

function next(targetId, requiredKey){
    if(requiredKey && !data[requiredKey]){
        alert("Selecciona una opción para continuar");
        return;
    }
    show(targetId);
}

function validarIdentidad(){
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    if(!nombre || !telefono){
        alert("Por favor completa nombre y teléfono");
        return;
    }
    data.nombre = nombre;
    data.telefono = telefono;
    show("emocion");
}

function crearPerfume(){
    if(!data.intensidad){
        alert("Selecciona una intensidad");
        return;
    }
    const nombres = ["Obsidian","Noiré","Velours","Éter"];
    const n = nombres[Math.floor(Math.random()*nombres.length)];
    const num = Math.floor(Math.random()*20)+1;

    data.perfume = n + " Nº " + num;

    document.getElementById("perfume").innerText = data.perfume;

    const partes = [];
    if(data.emocion)      partes.push(`sensación ${data.emocion.toLowerCase()}`);
    if(data.familia)      partes.push(`familia ${data.familia.toLowerCase()}`);
    if(data.personalidad) partes.push(`personalidad ${data.personalidad.toLowerCase()}`);
    if(data.acordes)      partes.push(`acorde de ${data.acordes.toLowerCase()}`);
    if(data.intensidad)   partes.push(`intensidad ${data.intensidad.toLowerCase()}`);
    document.getElementById("desc").innerText = "Una composición de " + partes.join(", ") + ".";

    // Registrar el lead en Google Sheets en cuanto se completa el configurador,
    // aunque el cliente no llegue a apretar el botón de WhatsApp.
    guardarEnSheet();

    show("resultado");
}

/**
 * Envía los datos del formulario a Google Sheets vía Apps Script.
 * Usa application/x-www-form-urlencoded para evitar el preflight CORS,
 * de modo que la petición se realiza como "simple request".
 * Si falla la red, se loggea pero no se interrumpe el flujo del usuario.
 */
async function guardarEnSheet(){
    if(!SHEETS_ENDPOINT) return;

    const params = new URLSearchParams({
        fecha: new Date().toISOString(),
        nombre: data.nombre || "",
        telefono: data.telefono || "",
        perfume: data.perfume || "",
        emocion: data.emocion || "",
        familia: data.familia || "",
        personalidad: data.personalidad || "",
        acordes: data.acordes || "",
        intensidad: data.intensidad || ""
    });

    try {
        await fetch(SHEETS_ENDPOINT, {
            method: "POST",
            body: params
        });
    } catch (err) {
        console.error("No se pudo guardar en Sheets:", err);
    }
}

function confirmarEnvio(){
    if(confirm("¿Deseas enviar tu solicitud por WhatsApp?")){
        enviarWhats();
    }
}

function enviarWhats(){
    const mensaje = `Hola, quiero reservar un perfume personalizado:

Nombre: ${data.nombre}
Teléfono: ${data.telefono}
Perfume: ${data.perfume}
Emoción: ${data.emocion || ""}
Familia: ${data.familia || ""}
Personalidad: ${data.personalidad || ""}
Acorde: ${data.acordes || ""}
Intensidad: ${data.intensidad || ""}

Quedo atento para continuar con el proceso.`;
    window.open("https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensaje), "_blank");
}

function reiniciar(){
    data = {};
    history = ['inicio'];
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    document.querySelectorAll('.option-desc').forEach(d => d.classList.remove('visible'));
    show('inicio');
}

updateChrome('inicio');