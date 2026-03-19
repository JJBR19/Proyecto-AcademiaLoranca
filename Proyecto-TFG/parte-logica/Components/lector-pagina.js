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

                .lector-container{
                    display:flex;
                    align-items:center;
                    gap:10px;
                }

                .toggle-btn{
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

            <div class="lector-container">
                <button class="toggle-btn" id="toggle">🔊</button>

                <div class="controles" id="controles">
                    <button id="prev">⏮</button>
                    <button id="play">▶</button>
                    <button id="next">⏭</button>
                </div>
            </div>
        `;

        this.obtenerParrafos();

        const prev = this._shadow.getElementById("prev");
        const play = this._shadow.getElementById("play");
        const next = this._shadow.getElementById("next");

        prev.addEventListener("click", () => this.anterior());
        next.addEventListener("click", () => this.siguiente());
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

    toggleLectura(){

        const playBtn = this._shadow.getElementById("play");

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

    siguiente(){

        if(this.indiceActual < this.parrafos.length - 1){
            this.indiceActual++;
            this.leerActual();
        }

    }

    anterior(){

        if(this.indiceActual > 0){
            this.indiceActual--;
            this.leerActual();
        }

    }

}

customElements.define("lector-pagina", LectorPaginaComponent);