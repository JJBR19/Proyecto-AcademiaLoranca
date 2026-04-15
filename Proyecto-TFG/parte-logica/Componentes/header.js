class HeaderComponent extends HTMLElement {

    constructor(){
        super();
        this._shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this._shadow.innerHTML = `
        <style>
            /* ----------------------------ESTILOS HEADER---------------------------- */
            header {
                width: 100%;
                background: #3962e9;
                background: linear-gradient(440deg, #2a17cf, #00d5ff);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                position: sticky;
                top: 0;
                z-index: 100;
                box-sizing: border-box;
                backdrop-filter: blur(12px);
            }

            header > div {
                max-width: 1200px;
                margin: auto;
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            /* ----------------------------LOGO---------------------------- */
            #logo {
                height: 90px;
                cursor: pointer;
                transition: transform 0.3s;
            }

            #logo:hover {
                transform: scale(1.05);
            }

            #div-logo {
                display: flex;
                align-items: center;
                gap: 30px;
                flex-direction: row;
            }

            /* Nombre academia */
            #nombre_academia {
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-size: 22px;
                font-weight: 700;
                font-style: italic;
                color: #f2f3f0;
                letter-spacing: 1px;
                cursor: pointer;
                transition: transform 0.3s;
                text-decoration: none;
            }

            #nombre_academia:hover {
                transform: scale(1.05);
                text-decoration: none;
            }

            a{
                text-decoration: none;
            }

            /*------------------ MENÚ ------------------*/
            #menu-header {
                display: flex;
                gap: 25px;
            }

            .link-encabezado {
                text-decoration: none;
                color: #ffffff;
                font-weight: 500;
                transition: 0.3s ease;
                cursor: pointer;
                position: relative;
            }

            .link-encabezado:hover {
                color: #dbdbdb;
                transform: scale(1.2, 1.2);
                padding: 0px 12px;
            }

            .link-encabezado::after {
                content: "";
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0%;
                height: 2px;
                background: white;
                transition: width 0.3s ease;
            }

            .link-encabezado:hover::after {
                width: 100%;
            }

            /* ----------------------------MENÚ MÓVIL/TABLET---------------------------- */

            /* No visible cuando el tamaño de la pantalla es mayor a 1000px*/
            .boton-menu-movil {
                display: none;
                font-size: 2rem;
                color: white;
                cursor: pointer;
            }

            /* MODO MÓVIL */
            @media (max-width: 1000px) {

                /* Ocultamos menú normal */
                #menu-header {
                    position: absolute;
                    top: 101px;
                    right: 0;
                    width: 30%;
                    background: linear-gradient(15deg, #6064af, #26cae3);
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    padding: 20px 0;
                    display: none;
                    border:1px solid #8dedfc
                }

                .link-encabezado {
                    font-size: 1.2rem;
                }

                .boton-menu-movil {
                    display: block;
                }

                #menu-header.active {
                    display: flex;
                    animation: slideDown 0.3s ease;
                }
            }
            @media (max-width: 480px) {
                #menu-header {
                    position: absolute;
                    top: 102px;
                    right: 0;
                    width: 30%;
                    background: linear-gradient(15deg, #6064af, #26cae3);
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    padding: 20px 0;
                    display: none;
                }

                .link-encabezado {
                    font-size: 1.2rem;
                }

                .boton-menu-movil {
                    display: block;
                    
                }

                #menu-header.active {
                    display: flex;
                    animation: slideDown 0.3s ease;
                }
            }
        </style>
        ` + this.template;

        // Modificación del enlace de contactos para que vaya mejor a la posición de contactos
        const horariosLink = this._shadow.querySelector('.link-encabezado[href="#horarios"]');
        horariosLink.addEventListener('click', (event) => {
            event.preventDefault();  // Previene el comportamiento por defecto del enlace
            
            // Buscar el componente footer-componente
            const footer = document.querySelector('footer-componente');
            
            if (footer) {
                const shadowRoot = footer.shadowRoot;

                // Acceder a la sección de 'horarios' dentro del shadow DOM
                const horariosSection = shadowRoot.querySelector('#horarios');
                
                // Hacer scroll hacia ella
                if (horariosSection) {
                    horariosSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // ----------------------------MENÚ MOVIL---------------------------- //
        const botonMenu = this._shadow.getElementById("menuToggle");
        const menu = this._shadow.getElementById("menu-header");

        // Abrir-Cerrar menú
        botonMenu.addEventListener("click", () => {
            menu.classList.toggle("active");
        });

        // Cerrar menú al pulsar un link
        const links = this._shadow.querySelectorAll(".link-encabezado");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
            });
        });
        document.addEventListener("click", (e) => {
            const path = e.composedPath(); 
            if (!path.includes(this)) {
                menu.classList.remove("active");
            }
        });
    }

    get template(){
        return `
        <header>
            <div>
                <div id="div-logo">
                    <a href="../parte-html/Index.html">
                        <img src="../imagenes/logo.png" id="logo" alt="Logo Academia Loranca">
                    </a>
                    <a href="../parte-html/Index.html">
                        <div id="nombre_academia">ACADEMIA <br>LORANCA</div>
                    </a>
                </div>

                <!-- BOTÓN MENÚ MÓVIL (Aparece solamente en movil o reducir el tamaño de la pantalla) -->
                <div class="boton-menu-movil" id="menuToggle">
                    ☰
                </div>

                <!-- ZONA LINKS -->
                <menu id="menu-header">
                    <a class="link-encabezado" href="./Index.html">Inicio</a>
                    <a class="link-encabezado" href="./grupos.html">Cursos</a>
                    <a class="link-encabezado" href="./Index.html#servicios">Servicios</a>
                    <a class="link-encabezado" href="#horarios">Horarios</a>
                    <a class="link-encabezado" href="./contactos.html">Contacto</a>
                </menu>

            </div>
        </header>
        `;
    }
}

export let etiquetaHeader = window.customElements.define('header-componente', HeaderComponent);