let vozActiva = true;

// Configuración
const SELECTOR_FOCUSABLE = `
  a, button, input, textarea, select,
  [tabindex]:not([tabindex="-1"]),
  h1, h2, h3
`;

// Función para obtener texto limpio
function obtenerTexto(el) {
  return (
    el.getAttribute("aria-label") ||
    el.innerText ||
    el.alt ||
    ""
  ).trim();
}

// Función de lectura
function leerElemento(elemento) {
  if (!vozActiva) return;

  const texto = obtenerTexto(elemento);

  // Evitar textos vacíos o muy largos
  if (!texto || texto.length > 200) return;

  const mensaje = new SpeechSynthesisUtterance(texto);
  mensaje.lang = "es-ES";

  speechSynthesis.cancel();
  speechSynthesis.speak(mensaje);
}

// Detectar foco global (clave para tu caso)
document.addEventListener("focusin", (e) => {
  const el = e.target;

  if (el.matches(SELECTOR_FOCUSABLE)) {
    leerElemento(el);
  }
});

// Botón toggle accesible global
window.toggleVoz = function () {
  vozActiva = !vozActiva;

  const estado = vozActiva ? "Voz activada" : "Voz desactivada";

  const mensaje = new SpeechSynthesisUtterance(estado);
  mensaje.lang = "es-ES";
  speechSynthesis.speak(mensaje);
};