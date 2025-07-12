// 🎨 Modo noche
const toggleButton = document.getElementById('toggleMode');
const sonido = document.getElementById('modoSonido');
sonido.volume = 0.1;

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('noche');
    const esNoche = document.body.classList.contains('noche');
    toggleButton.innerHTML = esNoche
        ? '<i class="fas fa-sun"></i> Cambiar a Modo Día'
        : '<i class="fas fa-moon"></i> Cambiar a Modo Noche';

    sonido.currentTime = 0;
    sonido.play();
});

// 💬 Mensajes y sonidos
const card = document.getElementById("card");
const mensaje = document.getElementById("mensajeTexto");
const audio = document.getElementById("audioRespuesta");

const mensajes = {
    1: "¡Muy bien! Mantenerse hidratado es clave para tu salud. 💧",
    2: "¡Genial! Una buena alimentación es energía pura. 🍽️",
    3: "Pedir ayuda es un acto de valentía. ¡Estamos contigo! 🤝",
    4: "¡Qué bueno saberlo! Sigue cuidándote. 😊",
    5: "¡Nunca estás solo! Somos una familia. 🫂"
};

const sonidos = {
    1: "audio/Hidratándome.mp3",
    2: "audio/Alimentándome.mp3",
    3: "audio/Ayúdame.mp3",
    4: "audio/Horadedescanso.mp3",
    5: "audio/EstamosJuntoss.mp3"
};

function mostrarMensaje(opcion) {
    const usuario = prompt("👤 Qual é seu nome?");
    const acao = mensajes[opcion];

    mensaje.textContent = acao;
    card.classList.add("girar");

    if (sonidos[opcion]) {
        audio.src = sonidos[opcion];
        audio.currentTime = 0;
        audio.play();
    }

    // Envia interação ao mural coletivo
    registrarInteracao(usuario || "Anónimo", acao);
}


function girarCard() {
    card.classList.remove("girar");
}

// 📸 Álbum automático y por botones
let indiceActual = 0;
const foto = document.getElementById("fotoAlbum");
const frase = document.getElementById("fraseFoto");

const fotos = Array.from({ length: 20 }, (_, i) => `/img/galeria/foto${i + 1}.png`);

const frases = [
    "Juntos construimos más que código: construimos confianza.",
    "Cada línea que escribimos, la tenemos como familia.",
    "La fuerza de uno nace del apoyo de todos.",
    "No somos solo compañeros, somos aliados del aprendizaje.",
    "Con cada error, aprendemos... y con cada apoyo, crecemos.",
    "El bootcamp nos juntó, la amistad nos conectó.",
    "Un equipo unido puede hackear cualquier desafío.",
    "Más allá del HTML: nos programamos con cariño.",
    "Donde va uno, vamos todos. Porque el camino se hace en comunidad.",
    "Aquí nadie se queda atrás. ¡Avanzamos juntos!",
    "La empatía es nuestro lenguaje favorito.",
    "Creamos código, pero también recuerdos para siempre.",
    "Las diferencias nos hacen únicos, la colaboración nos hace fuertes.",
    "Un equipo no se mide en logros, sino en cómo se acompaña.",
    "Somos como una app bien diseñada: cada uno aporta su funcionalidad.",
    "El éxito del bootcamp no es aprobar… es no rendirse jamás.",
    "La energía que compartimos no cabe en una batería… es humana.",
    "Nuestro mayor proyecto: construirnos como equipo.",
    "Aquí aprendemos tecnología con corazón.",
    "Nos dimos cuenta que la verdadera magia está en lo colectivo."
];

function cambiarFoto(direccion) {
    indiceActual += direccion;
    if (indiceActual >= fotos.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = fotos.length - 1;

    foto.classList.remove("mostrar");

    setTimeout(() => {
        foto.src = fotos[indiceActual];
        frase.textContent = frases[indiceActual];
        foto.classList.add("mostrar");
    }, 100);
}

// ⏱️ Cambio automático
setInterval(() => {
    cambiarFoto(1);
}, 8000);

// 🔁 Cambio por scroll
let fotoIndex = 0;
const scrollFotos = [
    { src: fotos[0], frase: frases[0] },
    { src: fotos[1], frase: frases[1] },
    { src: fotos[2], frase: frases[2] },
    { src: fotos[3], frase: frases[3] },
];

const puntos = [100, 400, 700];

window.addEventListener('scroll', () => {
    const y = window.scrollY;

    for (let i = 0; i < puntos.length; i++) {
        if (y > puntos[i]) actualizarFotoScroll(i);
    }
});

function actualizarFotoScroll(index) {
    if (index !== fotoIndex) {
        foto.classList.remove("mostrar");

        setTimeout(() => {
            foto.src = scrollFotos[index].src;
            frase.textContent = scrollFotos[index].frase;
            foto.classList.add("mostrar");
            fotoIndex = index;
        }, 100);
    }
}


const scrollTriggers = [
    { id: 'scrollTrigger1', foto: fotos[1], frase: frases[1] },
    { id: 'scrollTrigger2', foto: fotos[2], frase: frases[2] },
    { id: 'scrollTrigger3', foto: fotos[3], frase: frases[3] }
];

function verificarScroll() {
    scrollTriggers.forEach(trigger => {
        const elemento = document.getElementById(trigger.id);
        const rect = elemento.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            foto.src = trigger.foto;
            frase.textContent = trigger.frase;
            foto.classList.add("mostrar");
        }
    });
}

window.addEventListener('scroll', verificarScroll);
