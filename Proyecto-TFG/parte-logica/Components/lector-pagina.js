class LectorPaginaComponent extends HTMLElement {

    constructor(){
        super();
        this._shadow = this.attachShadow({mode: 'open'});
        this.parrafos = [];
        this.indiceActual = 0;
        this.reproduciendo = false;
        this.utterance = null;
    }

    connectedCallback(){

        this._shadow.innerHTML = `
            <style>
                :host{
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    z-index: 9999;
                    font-family: Arial, sans-serif;
                }

                .contenedor-lector{
                    display:flex;
                    align-items:center;
                    gap:10px;
                }

                .boton-audio{
                    width:50px;
                    height:50px;
                    border-radius:50%;
                    border:none;
                    background:#3962e9;
                    color:white;
                    font-size:22px;
                    cursor:pointer;
                    box-shadow:0 6px 18px rgba(0, 0, 0, 0.25);
                }

                .controles{
                    display:flex;
                    align-items:center;
                    gap:10px;
                    background:#3962e9;
                    padding:8px 12px;
                    border-radius:12px;
                    box-shadow:0 6px 18px rgba(0, 0, 0, 0.25);

                    opacity:0;
                    transform:translateX(-10px);
                    pointer-events:none;
                    transition:0.3s;
                }

                .controles.activo{
                    opacity:1;
                    transform:translateX(0);
                    pointer-events:auto;
                }

                button{
                    font-size:18px;
                    border:none;
                    background:#3962e9;     
                    color:white;
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    cursor:pointer;
                }

                #play{
                    width:50px;
                    height:50px;
                    font-size:22px;
                }

            </style>

            <div class="contenedor-lector">
                <button class="boton-audio" id="toggle">🔊</button>

                <div class="controles" id="controles">
                    <button id="anterior">⏮</button>
                    <button id="play">▶</button>
                    <button id="siguiente">⏭</button>
                </div>
            </div>
        `;
        this.obtenerParrafos();

        const anterior = this._shadow.getElementById("anterior");
        const play = this._shadow.getElementById("play");
        const siguiente = this._shadow.getElementById("siguiente");

        anterior.addEventListener("click", () => this.anterior());
        siguiente.addEventListener("click", () => this.siguiente());
        play.addEventListener("click", () => this.toggleLectura());

        const toggle = this._shadow.getElementById("toggle");
        const controles = this._shadow.getElementById("controles");

        toggle.addEventListener("click", () => {
            this.abierto = !this.abierto;

            if(this.abierto){
                controles.classList.add("activo");
            } else {
                controles.classList.remove("activo");
            }
        });

        document.addEventListener("click", (e) => {
            const path = e.composedPath(); 
            if (!path.includes(this)) {
                controles.classList.remove("activo");
            }
        });

        window.addEventListener("beforeunload", () => {
            window.speechSynthesis.cancel();
        });
        window.addEventListener("pagehide", () => {
            window.speechSynthesis.cancel();
        });

    }

    /*Desconectarse al cambiar de página*/ 
    disconnectedCallback(){
        window.speechSynthesis.cancel();
    }

    /* Seleciona el texto al leer, solo funciona si tiene etiqueta main */
    obtenerParrafos(contenedor = null){
        let root;

        if(contenedor){
            root = contenedor;
        } else {
            root = document.querySelector("main");
        }

        if(!root) return;

        const elementos = root.querySelectorAll("p, h1, h2, h3, li");
        this.parrafos = Array.from(elementos).map(el => el.innerText);
        this.indiceActual = 0;
    }

    leerActual(){

    if(this.parrafos.length === 0) return;

        window.speechSynthesis.cancel();
        
        this.utterance = new SpeechSynthesisUtterance(this.parrafos[this.indiceActual]);
        this.utterance.lang = "es-ES";

        this.utterance.onend = () => {

            if(this.reproduciendo && this.indiceActual < this.parrafos.length - 1){
                this.indiceActual++;
                this.leerActual();
            } else {
                const playBtn = this._shadow.getElementById("play");
                playBtn.textContent = "▶";
                this.reproduciendo = false;
            }

        };

        window.speechSynthesis.speak(this.utterance);
    }

    leerContenedor(contenedor){
        this.obtenerParrafos(contenedor);
        this.leerActual();
    }

    /* --------------------------------------------Botones de lectura-------------------------------------------- */

    /* Pausar-Continuar */
    toggleLectura(){

        const playBtn = this._shadow.getElementById("play");

        /* Cambiar icono segun estado */
        if(!this.reproduciendo){
            this.leerActual();
            playBtn.textContent = "⏸";
            this.reproduciendo = true;
        }else{
            window.speechSynthesis.pause();
            playBtn.textContent = "▶";
            this.reproduciendo = false;
        }
    }

    /* Boton siguiente apartado*/
    siguiente(){
        if(this.indiceActual < this.parrafos.length - 1){
            this.indiceActual++;
            this.leerActual();
        }
    }

    /* Boton anteior apartado */
    anterior(){
        if(this.indiceActual > 0){
            this.indiceActual--;
            this.leerActual();
        }
    }

}

customElements.define("lector-pagina", LectorPaginaComponent);