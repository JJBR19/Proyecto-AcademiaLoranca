// archivo: grupo.js
class GrupoComponente extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Encapsula estilos
    }

    connectedCallback() {
        const grupoId = this.getAttribute('id-grupo') || '1';
        const nombre = this.getAttribute('nombre') || `Grupo ${grupoId}`;
        const nivel = this.getAttribute('nivel') || 'Primaria';
        const img = this.getAttribute('img') || '../imagenes/niños_grupos1.png';
        const profesora = this.getAttribute('profesora') || 'Isabel Martínez';
        const horario = this.getAttribute('horario') || 'Lunes a Jueves (15:00-21:00)';
        const plazas = this.getAttribute('plazas') || '8 alumnos';

        this.shadowRoot.innerHTML = `
        <style>
            .zona-grupos {
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(12px);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.25);
                box-shadow: 0 12px 40px rgba(0,0,0,0.15);
                padding: 25px;
                margin-bottom: 45px;
                text-align: center;
                transition: transform 0.35s ease, box-shadow 0.35s ease;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeUp 0.6s forwards;
            }
            .zona-grupos:hover { transform: translateY(-8px); box-shadow: 0 25px 60px rgba(0,0,0,0.2); }
            .zona-grupos h3 { font-size: 1.7rem; margin-bottom: 15px; color: #2563eb; font-weight: 600; }
            .zona-grupos p { font-size: 0.95rem; color: #475569; margin-bottom: 8px; }
            .zona-grupos img { width: 100%; max-width: 340px; height: 200px; object-fit: cover; border-radius: 16px; margin-bottom: 15px; }
            .boton-info { display: inline-block; background: linear-gradient(135deg, #2563eb, #22d3ee); color: white; padding: 14px 30px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 1.05rem; cursor: pointer; }
            .POPUP { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(30,41,59,0.85); justify-content: center; align-items: center; z-index: 1000; padding: 20px; }
            .POPUP-contenido { background: rgba(255,255,255,0.95); backdrop-filter: blur(15px); padding: 40px 45px; border-radius: 24px; max-width: 560px; width: 95%; box-shadow: 0 25px 70px rgba(0,0,0,0.18); text-align: center; position: relative; }
            .cerrar { position: absolute; top: 18px; right: 22px; font-size: 2rem; font-weight: bold; color: #334155; cursor: pointer; }
            @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        </style>

        <div class="zona-grupos">
            <h3>${nombre}</h3>
            <img src="${img}" alt="${nombre}">
            <p><strong>Nivel:</strong> ${nivel}</p>
            <div class="div-apuntarme">
                <span class="boton-info" id="btn-${grupoId}">Más Información</span>
            </div>
        </div>

        <div id="POPUP-${grupoId}" class="POPUP">
            <div class="POPUP-contenido">
                <span class="cerrar" id="cerrar-${grupoId}">&times;</span>
                <h2>${nombre}</h2>
                <p><strong>Profesora:</strong> ${profesora}</p>
                <p><strong>Horario:</strong> ${horario}</p>
                <p><strong>Plazas:</strong> ${plazas}</p>
            </div>
        </div>
        `;

        // Funcionalidad pop-up
        const btn = this.shadowRoot.getElementById(`btn-${grupoId}`);
        const popup = this.shadowRoot.getElementById(`POPUP-${grupoId}`);
        const cerrar = this.shadowRoot.getElementById(`cerrar-${grupoId}`);

        btn.addEventListener('click', () => popup.style.display = 'flex');
        cerrar.addEventListener('click', () => popup.style.display = 'none');
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.style.display = 'none';
        });
    }
}

customElements.define('grupo-componente', GrupoComponente);