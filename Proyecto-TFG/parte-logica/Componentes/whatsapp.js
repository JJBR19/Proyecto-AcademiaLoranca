class WhatsappComponent extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._shadow.innerHTML = `
        <style>
        .whatsapp-container {
            position: fixed;
            bottom: 15px;
            right: 15px;
            z-index: 1000;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
        }

        /* BOTÓN */
        .boton-whatsapp {
            background-color: #25d366;
            border: none;
            border-radius: 50%;
            width: 56px;
            height: 56px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: transform 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .boton-whatsapp img {
            width: 30px;
            height: 30px;
        }

        .boton-whatsapp:hover {
            transform: scale(1.1);
        }

        /* PANEL */
        .div-whatsapp {
            width: 360px;
            max-width: 90vw;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            overflow: hidden;
            opacity: 0;
            transform: translateY(10px);
            pointer-events: none;
            transition: all 0.25s ease;
        }

        .div-whatsapp.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        /* HEADER */
        .header {
            background: #075e54;
            color: white;
            padding: 12px 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 15px;
        }

        .boton-cerrar {
            background: rgba(255,255,255,0.15);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            width: 28px;
            height: 28px;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s;
        }

        .boton-cerrar:hover {
            background: rgba(255,255,255,0.3);
        }

        /* BODY */
        .body {
            padding: 14px;
            text-align: center;
            font-size: 14px;
            line-height: 1.4;
        }

        .boton-enviar {
            display: block;
            background: #25d366;
            color: white;
            text-decoration: none;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
            font-size: 14px;
            transition: 0.2s;
        }

        .boton-enviar:hover {
            filter: brightness(1.05);
        }

        /* ===== RESPONSIVE ===== */

        /* móviles pequeños */
        @media (max-width: 360px) {
            .boton-whatsapp {
                width: 48px;
                height: 48px;
            }
            .boton-whatsapp img {
                width: 24px;
                height: 24px;
            }
            .div-whatsapp {
                width: 92vw;
            }
        }

        /* móviles */
        @media (min-width: 361px) and (max-width: 480px) {
            .boton-whatsapp {
                width: 50px;
                height: 50px;
            }
            .boton-whatsapp img {
                width: 26px;
                height: 26px;
            }
            .div-whatsapp {
                width: 92vw;
            }
        }

        /* tablets */
        @media (min-width: 481px) and (max-width: 768px) {
            .boton-whatsapp {
                width: 54px;
                height: 54px;
            }
            .boton-whatsapp img {
                width: 28px;
                height: 28px;
            }
        }

        /* laptops */
        @media (min-width: 769px) and (max-width: 1024px) {
            .boton-whatsapp {
                width: 56px;
                height: 56px;
            }
        }

        /* pantallas grandes */
        @media (min-width: 1440px) {
            .div-whatsapp {
                width: 380px;
            }
            .boton-whatsapp {
                width: 60px;
                height: 60px;
            }
        }

        </style>

        ${this.template}
        `;

        const btn = this._shadow.querySelector('.boton-whatsapp');
        const closeBtn = this._shadow.querySelector('.boton-cerrar');
        const card = this._shadow.getElementById('div-whatsapp');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWhatsapp(card);
        });

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWhatsapp(card);
        });

        document.addEventListener("click", (e) => {
            if (!e.composedPath().includes(this)) {
                card.classList.remove('open');
            }
        });
    }

    toggleWhatsapp(card) {
        card.classList.toggle('open');
    }

    get template() {
        return `
        <div class="whatsapp-container">
            <div class="div-whatsapp" id="div-whatsapp">
                <div class="header">
                    <span>¿Necesitas ayuda?</span>
                    <button class="boton-cerrar">×</button>
                </div>

                <div class="body">
                    <p><strong>¡Hola! 👋</strong></p>
                    <p>¿Buscas apoyo escolar o información sobre nuestros servicios?</p>
                    <p>Ayudamos a alumnos de Primaria, ESO y Bachillerato a mejorar sus notas.</p>
                    <p>Cuéntanos tu caso y te informamos sin compromiso 📚✨</p>

                    <a class="boton-enviar" href="https://wa.me/652081700" target="_blank">
                        Información Primaria y 1ºESO (Isabel)
                    </a>

                    <a class="boton-enviar" href="https://wa.me/665927240" target="_blank">
                         Información 2ºESO - 4ºESO-Bachillerato  (Laura)
                    </a>
                </div>
            </div>

            <button class="boton-whatsapp">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
            </button>
        </div>
        `;
    }
}

window.customElements.define('whatsapp-componente', WhatsappComponent);