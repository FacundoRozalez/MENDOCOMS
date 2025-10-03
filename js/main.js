// ================= Carrusel de anuncios =================
const anuncios = [
  { img: "img/anuncios/anuncio00.png", 
    nombre: "MANUSHKA<br>PASTELERIA", 
    whatsapp: "https://wa.me/5492615941095?text=Hola%2C%20vi%20su%20anuncio%20en%20la%20revista%20digital%20y%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20lo%20que%20ofrecen.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F", 
    ubicacion: "https://maps.app.goo.gl/q7dMHFFTgadd4uzz6" },

  { img: "img/anuncios/anuncio01.png", 
    nombre: "PASITOS<br>PAÑALERA", 
    whatsapp: "https://wa.me/5492612305874?text=Hola%2C%20vi%20su%20anuncio%20en%20la%20revista%20digital%20y%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20lo%20que%20ofrecen.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F", 
    ubicacion: "https://maps.app.goo.gl/A9QT6kJWknnzfdKQ9" },

    { img: "img/anuncios/anuncio02.png", 
    nombre: "MAFALDA<br>LIBRERIA  REGALERIA", 
    whatsapp: "https://wa.me/54926134477?text=Hola%2C%20vi%20su%20anuncio%20en%20la%20revista%20digital%20y%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20lo%20que%20ofrecen.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F", 
    ubicacion: "https://maps.app.goo.gl/CMaXTVHTwwcndZSRA" },

    { img: "img/anuncios/anuncio04.png", 
    nombre: "SV<br>LABORATORIO   ", 
    whatsapp: "https://wa.me/5492615135421?text=Hola%2C%20vi%20su%20anuncio%20en%20la%20revista%20digital%20y%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20lo%20que%20ofrecen.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F", 
    ubicacion: "https://maps.app.goo.gl/LxNuT7WZoUUPdLaFA" },

];

let index = 0;
const tarjetaActual = document.getElementById("tarjetaActual");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function mostrarAnuncio(i) {
  const a = anuncios[i];
  tarjetaActual.innerHTML = `
    <div class="tarjeta">
      <img src="${a.img}" alt="${a.nombre}" class="imgCarrusel">
      <h4>${a.nombre}</h4>
      <div class="acciones">
        <a href="${a.whatsapp}" target="_blank"> "Enviar Mensaje"</a>
        <a href="${a.ubicacion}" target="_blank"> ¡Encontranos Aqui!</a>
      </div>
    </div>
  `;

  // Evento para ampliar imagen
  const imgCarrusel = document.querySelector(".imgCarrusel");
  imgCarrusel.addEventListener("click", () => {
    const modal = document.getElementById("modalImagen");
    const modalImg = document.getElementById("imgModal");
    const caption = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = a.img;
    caption.innerText = a.nombre;
  });
}

// Cerrar modal
document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalImagen").style.display = "none";
});

// Mostrar primer anuncio al inicio
mostrarAnuncio(0);


// ================= Flipbook dinámico =================
const revistaMes = document.getElementById("revista-mes");
const ediciones = document.querySelector(".ediciones");
const flipbookContainer = document.getElementById("flipbookContainer");
const flipbookIframe = document.getElementById("flipbookIframe");
const btnVolver = document.getElementById("btnVolver");
const tarjetas = document.querySelectorAll(".tarjeta");
const h2Ediciones = document.querySelector("#revista h2"); // selecciona el h2 de Ediciones 2025

// Función para abrir flipbook y ocultar secciones
function abrirFlipbook(url) {
    if (!url) {
        console.error("Error: PDF no definido para este elemento");
        return;
    }
    revistaMes.style.display = 'none';
    ediciones.style.display = 'none';
    h2Ediciones.style.display = 'none'; // ocultamos el h2
    flipbookContainer.style.display = 'block';
    flipbookIframe.src = url;
    btnVolver.style.display = 'block';
}

// Función para cerrar flipbook y mostrar secciones
function cerrarFlipbook() {
    revistaMes.style.display = 'block';
    ediciones.style.display = 'grid'; 
    h2Ediciones.style.display = 'block'; // mostramos el h2
    flipbookContainer.style.display = 'none';
    flipbookIframe.src = '';
    btnVolver.style.display = 'none';

    // 👉 Scroll suave hacia la sección ediciones
    document.getElementById("revista").scrollIntoView({
        behavior: "smooth"
    });
}

// Click en Revista del Mes
revistaMes.addEventListener("click", () => {
    abrirFlipbook(revistaMes.dataset.pdf);
});

// Click en tarjetas de ediciones
tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
        abrirFlipbook(tarjeta.dataset.pdf);
    });
});

// Click en botón volver
btnVolver.addEventListener("click", cerrarFlipbook);

// ================= Nav Scroll Suave (todas las secciones) =================
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1); // quitamos #
        const target = document.getElementById(targetId);
        if (!target) return;

        // Si el flipbook está abierto, lo cerramos antes de movernos
        if (flipbookContainer.style.display === "block") {
            cerrarFlipbook();
        }

        // Scroll suave a la sección correspondiente
        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ================= Auto-carrusel =================
let autoCarrusel = setInterval(() => {
  index = (index + 1) % anuncios.length;
  mostrarAnuncio(index);
}, 5000); // cambia cada 5 segundos

// Al tocar botones, detener temporalmente el auto-carrusel
prevBtn.addEventListener("click", () => {
  clearInterval(autoCarrusel);       // detener autoavance
  index = (index - 1 + anuncios.length) % anuncios.length; 
  mostrarAnuncio(index); 
  reiniciarAutoCarrusel();           // reiniciar después
});

nextBtn.addEventListener("click", () => {
  clearInterval(autoCarrusel);
  index = (index + 1) % anuncios.length; 
  mostrarAnuncio(index); 
  reiniciarAutoCarrusel();
});

// Función para reiniciar auto-carrusel
function reiniciarAutoCarrusel() {
  autoCarrusel = setInterval(() => {
    index = (index + 1) % anuncios.length;
    mostrarAnuncio(index);
  }, 5000);
}
