class WhatsappComponent extends HTMLElement {
    constructor(){
        super();
        this._shadow = this.attachShadow ({mode: 'open'});
    }

    connectedCallback(){
        this._shadow.innerHTML = `<style>
        /* Contenedor principal */
.whatsapp-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-family: Arial, sans-serif;
    
    /* ESTO ES LO QUE SOLUCIONA EL PROBLEMA: */
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* Alinea tarjeta y botón a la derecha del contenedor */
}

/* Botón flotante redondo */
.whatsapp-button {
    background-color: #25d366;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: transform 0.3s;
}

.whatsapp-button img {
    width: 35px;
    margin-top: 5px;
}

.whatsapp-button:hover {
    transform: scale(1.1);
}

/* Tarjeta desplegable (oculta por defecto) */
.whatsapp-card {
    display: none; /* Se activa con JS */
    width: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    margin-bottom: 15px;
    overflow: hidden;
    animation: fadeIn 0.3s ease;
}

.card-header {
    background: #075e54;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body {
    padding: 15px;
    text-align: center;
}

.send-btn {
    display: block;
    background: #25d366;
    color: white;
    text-decoration: none;
    padding: 8px;
    border-radius: 5px;
    margin-top: 10px;
}

.wa-close {
    background-color: rgba(0, 0, 0, 0.2); /* Fondo oscuro suave */
    border: none;
    border-radius: 50%; /* Hace que sea un círculo */
    color: white;
    cursor: pointer;
    
    /* Tamaño del botón */
    width: 28px;
    height: 28px;
    
    /* Centrado de la 'X' */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Tipografía */
    font-size: 18px;
    line-height: 1;
    font-family: Arial, sans-serif;
    
    /* Transición suave al pasar el ratón */
    transition: background 0.3s ease;
    padding: 0;
}

/* Efecto al pasar el ratón */
.wa-close:hover {
    background-color: rgba(0, 0, 0, 0.4);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
    .whatsapp-card {
        display: none; /* Se activa con JS */
        width: 300px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        margin-bottom: 15px;
        overflow: hidden;
        animation: fadeIn 0.3s ease;
    }
}
</style>
`+ this.template;

const btn = this._shadow.querySelector('.whatsapp-button');
const closeBtn = this._shadow.querySelector('.wa-close');

// Asignamos el evento
btn.addEventListener('click', () => this.toggleWhatsapp());
closeBtn.addEventListener('click', () => this.toggleWhatsapp());

}

toggleWhatsapp() {
    const card = this._shadow.getElementById('whatsappCard');
    if (card.style.display === 'block') {
        card.style.display = 'none';
    } else {
        card.style.display = 'block';
    }

    document.addEventListener("click", (e) => {
            const path = e.composedPath(); 
            if (!path.includes(this)) {
                card.style.display = 'none';
            }
        });
}



    get template(){
        return `
        <div class="whatsapp-container">
        <div class="whatsapp-card" id="whatsappCard">
            <div class="card-header">
                <span>¿Necesitas ayuda?</span>
                <button class="wa-close" onclick="toggleWhatsapp()">x</button>
            </div>
            <div class="card-body">
                <p><strong>¡Hola! 👋</strong></p>
                <p>¿Buscas apoyo escolar o información sobre nuestros servicios?</p>
                <p>En nuestra academia ayudamos a alumnos de Primaria, ESO y Bachillerato a mejorar sus notas y lograr
                    sus objetivos.</p>
                <p>Cuéntanos qué asignatura se le resiste y te informamos sin compromiso. 📚✨</p>
                <a href="https://wa.me/652081700" target="_blank" class="send-btn">
                    Abrir chat
                </a>
            </div>
        </div>

        <button class="whatsapp-button" onclick="toggleWhatsapp()">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
        </button>
    </div>
        `;
    }
}
export let etiquetaWhatsapp = window.customElements.define('whatsapp-componente', WhatsappComponent);