class HeaderComponent extends HTMLElement {

    constructor(){
        super();
        this._shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){

        this._shadow.innerHTML = `
        <style>
        
            /*PARTE HEADER*/

            /*-------------- ESTILOS HEADER -------------*/
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

            /*------------------------------------------*/

            /*------------------ LOGO ------------------*/
            #logo {
                height: 90px;
                cursor: pointer;
                transition: transform 0.3s;
            }

            #logo:hover {
                transform: scale(1.05);
            }

            /* Div logo + nombre */
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
            }

            #nombre_academia:hover {
                transform: scale(1.05);
            }

            /*------------------------------------------*/

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

            /* subrayado elegante */
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

            /* ================================
            MENÚ MÓVIL
            ================================ */

            .menu-mobile-btn {
                display: none;
                font-size: 2rem;
                color: white;
                cursor: pointer;
            }

            /* MODO MÓVIL */
            @media (max-width: 768px) {

                /* Ocultamos menú normal */
                #menu-header {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 30%;
                    background: #6a8af0;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    padding: 20px 0;
                    display: none;
                }

                /* Links más grandes */
                .link-encabezado {
                    font-size: 1.2rem;
                }

                /* Mostramos botón */
                .menu-mobile-btn {
                    display: block;
                }

                /* Menú activo */
                #menu-header.active {
                    display: flex;
                    animation: slideDown 0.3s ease;
                }
            }

            /*------------------------------------------*/
        </style>
        ` + this.template;

        //--------MENÚ MOVIL---------//
            // Referencias dentro del Shadow DOM
            const botonMenu = this._shadow.getElementById("menuToggle");
            const menu = this._shadow.getElementById("menu-header");

            // Abrir/Cerrar menú
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
        //---------------------------//

    }

    get template(){
        return `
        <header>
            <div>

                <!-- DIV LOGO -->
                <div id="div-logo">
                    <img src="../imagenes/logo.png" id="logo" alt="Logo Academia Loranca">
                    <div id="nombre_academia">ACADEMIA <br>LORANCA</div>
                </div>

                <!-- BOTÓN MENÚ MÓVIL -->
                <div class="menu-mobile-btn" id="menuToggle">
                    ☰
                </div>

                <!-- ZONA LINKS -->
                <menu id="menu-header">
                    <a class="link-encabezado" href="./Index.html">Inicio</a>
                    <a class="link-encabezado" href="./grupos.html">Cursos</a>
                    <a class="link-encabezado" href="./Index.html#servicios">Servicios</a>
                    <a class="link-encabezado">Horarios</a>
                    <a class="link-encabezado" href="./contactos.html">Contacto</a>
                </menu>

            </div>
        </header>
        `;
    }

}

export let etiquetaHeader = window.customElements.define('header-componente', HeaderComponent);