class FooterComponent extends HTMLElement {
    constructor(){
        super();
        this._shadow = this.attachShadow ({mode: 'open'});
    }

    connectedCallback(){
        this._shadow.innerHTML = `<style>
/*----------------------------------------------------------------*/
/*--------------------------FOOTER--------------------------------*/
/*----------------------------------------------------------------*/

/* =====================================================
   FOOTER PROFESIONAL - ACADEMIA LORANCA
===================================================== */

.footer {
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    color: #ffffff;
    padding: 70px 0 0 0;
    font-family: 'Poppins', sans-serif;
}

.footer-container {
    max-width: 1200px;
    margin: auto;
    padding: 0 20px 50px 20px;
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr 1fr;
    gap: 30px;
    border: 2px solid black
    display: flex;
}



/* ========================
   COLUMNA MARCA
======================== */

.footer-brand p {
    margin:  0;
    line-height: 1.6;
    color: rgba(255,255,255,0.85);
    font-size: 0.95rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.footer-logo img {
    height: 55px;
}

.footer-logo h3 {
    font-size: 1.3rem;
    font-weight: 700;
}

/* ========================
   CONTACTO
======================== */

.footer-contact p {
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.footer-contact a {
    color: #ffffff;
    text-decoration: none;
}

.footer-contact a:hover {
    text-decoration: underline;
}

/* ========================
   COLUMNAS
======================== */

.footer-col {

        margin: 0
        border: 2px solid black;
        padding: 0px;

}

.footer-col h4 {
    margin-bottom: 20px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.footer-col ul {
    list-style: none;
    padding: 0;
}

.footer-col ul li {
    margin-bottom: 10px;
    font-size: 0.9rem;
}

.footer-col ul li a {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    transition: 0.3s;
}

.footer-col ul li a:hover {
    color: #97dff1;
    padding-left: 5px;
    text-decoration: underline;
}

/* ========================
   BOTÓN CTA
======================== */

.footer-cta p {
    font-size: 0.9rem;
    margin-bottom: 20px;
    color: rgba(255,255,255,0.9);
}

.footer-btn {
    display: inline-block;
    background: #ffffff;
    color: #1e3a8a;
    padding: 12px 25px;
    border-radius: 40px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s ease;
}

.footer-btn:hover {
    background: #f1f5f9;
    transform: translateY(-3px);
}

/* ========================
   BARRA INFERIOR
======================== */

.footer-bottom {
    border-top: 1px solid rgba(91, 255, 244, 0.476);
    padding: 20px;
    text-align: center;
    font-size: 0.85rem;
    background: rgba(254, 254, 254, 0.1);
}

.footer-bottom p {
    margin-bottom: 10px;
}

.footer-legal a {
    color: #ffffff;
    text-decoration: none;
    margin: 0 10px;
    font-size: 0.85rem;
}

.footer-legal a:hover {
    text-decoration: underline;
}

/* ========================
   RESPONSIVE
======================== */

@media (max-width: 992px) {
    .footer-container {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
}

@media (max-width: 600px) {
    .footer-container {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .footer-logo {
        justify-content: center;
    }

    .footer-col ul li a:hover {
        padding-left: 0;
    }
}

@media (max-width: 480px) {

    .footer-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 15px;
        padding: 20px 15px;
    }

    .footer-bottom p {
        font-size: 0.85rem;
        line-height: 1.4;
    }

    .footer-legal {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
    }

    .footer-legal a {
        font-size: 0.9rem;
        padding: 3px 0;
        
    }
}



/* =====================================================
   FOOTER PRO
===================================================== */

.footer-col ul li {
    transition: transform 0.25s ease;
}

.footer-col ul li:hover {
    transform: translateX(6px);
}


</style>
`+ this.template;
    }

    get template() {
    return `
    <!--Pie de página-->
    <!-- ================= FOOTER PROFESIONAL ================= -->
    <footer class="footer">
        <div class="footer-container">

            <!-- COLUMNA 1 - MARCA -->
            <div class="footer-col footer-brand">
                <div class="footer-logo">
                    <img src="../imagenes/logo.png" alt="Academia Loranca">
                    <h3>Academia Loranca</h3>
                </div>

                <p>
                    Academia especializada en refuerzo escolar, preparación de exámenes y acompañamiento educativo
                    personalizado en Fuenlabrada - Loranca.

                </p>


               <div class="footer-contact"><br>
    <p>📍 <a href="https://www.google.com/maps/search/?api=1&query=Calle+Alegría+4,+28942+Fuenlabrada,+Madrid" target="_blank" rel="noopener">
        C/ Alegría, 4 (CC, entrada por el supermercado, Nivel Centro 1ª planta, 28942 Fuenlabrada, Madrid)
    </a></p>
    
    <p>📞 <a href="tel:+34652081700">+34 652 08 17 00</a> <a href="./grupos.html#grupo1">(Isabel Grupo 1)</a></p>
    <p>📞 <a href="tel:+34665927240">+34 665 92 72 40</a> <a href="./grupos.html#grupo2">(Laura Grupo 2)</a></p>
    
    <p>✉️ <a href="mailto:info@academialoranca.es">academialoranca22@gmail.com</a></p>
</div>
            </div>

            <!-- COLUMNA 2 - ENLACES -->
            <div class="footer-col">
                <h4>Navegación</h4>
                <ul>
                    <li><a href="./Index.html">Inicio</a></li>
                    <li><a href="./grupos.html">Cursos</a></li>
                    <li><a href="./Index.html#servicios">Servicios</a></li>
                    <li><a href="./contactos.html">Inscripción</a></li>
                    <li><a href="./Index.html#contacto">Ubicación</a></li>
                </ul>
            </div>

            <!-- COLUMNA 3 - NIVELES -->
            <div class="footer-col">
                <h4>Niveles educativos</h4>
                <ul>
                    <li>Educación Primaria</li>
                    <li>ESO</li>
                    <li>Bachillerato</li>
                    <li>Preparación EVAU</li>
                </ul>
            </div>

            <!-- COLUMNA 5 - CTA -->
            <div class="footer-col footer-cta">
                <h4>¿Te interesa?</h4>
                <p>Reserva una clase de prueba gratuita y descubre nuestra metodología.</p>
                <a href="./contactos.html" class="footer-btn">Solicitar información</a>
            </div>

             <!-- COLUMNA 4 - HORARIOS -->
            <div class="footer-col" id="horarios">
                <h4>Horarios</h4>
                <ul>
                
                    <li><strong>Lunes a Jueves:</strong> 15:00 - 20:00 <a href="grupos.html#grupo1">(Grupo 1)</a></li>
                    <li><strong>Lunes a Jueves:</strong> 16:00 - 21:00 <a href="grupos.html#grupo2">(Grupo 2)</a></li>
                 </ul>   
            </div>

        </div>

        <!-- BARRA INFERIOR -->
        <div class="footer-bottom">
            <p>© 2026 Academia Loranca | Todos los derechos reservados</p>
            <div class="footer-legal">
                <a href="#">Política de Privacidad</a>
                <a href="#">Política de Cookies</a>
                <a href="#">Aviso Legal</a>
            </div>
        </div>

       
    </footer>
    
    `;
}
}
export let etiquetaFooter = window.customElements.define('footer-componente', FooterComponent);