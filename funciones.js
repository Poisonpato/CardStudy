function comenzar(){
    ponerBG()
    setTimeout(
        function(){
            window.location.assign('conceptos.html');
        },2000)

        //Sonido
        var sfxStart = new Audio('sfx/flipcard.mp3');
        sfxStart.play();
}

function ponerBG(){
    document.querySelector('.bg-transicion').style.backgroundColor="rgba(0,0,0,1)";
    document.querySelector('.bg-transicion').classList.add("bg-transicion-show");
}

function quitarBG(){
    document.querySelector('.bg-transicion').style.backgroundColor="rgba(0,0,0,0.0)";
    setTimeout(
        function(){
            document.querySelector('.bg-transicion').classList.remove('bg-transicion-show');
    },500);
}

function juego() {
    ponerBG();

    // Guardar en localStorage
    localStorage.setItem('concepto1', document.getElementById('concepto1').value);
    localStorage.setItem('descripcion1', document.getElementById('descripcion1').value);

    localStorage.setItem('concepto2', document.getElementById('concepto2').value);
    localStorage.setItem('descripcion2', document.getElementById('descripcion2').value);

    localStorage.setItem('concepto3', document.getElementById('concepto3').value);
    localStorage.setItem('descripcion3', document.getElementById('descripcion3').value);

    localStorage.setItem('concepto4', document.getElementById('concepto4').value);
    localStorage.setItem('descripcion4', document.getElementById('descripcion4').value);

    localStorage.setItem('concepto5', document.getElementById('concepto5').value);
    localStorage.setItem('descripcion5', document.getElementById('descripcion5').value);

    localStorage.setItem('concepto6', document.getElementById('concepto6').value);
    localStorage.setItem('descripcion6', document.getElementById('descripcion6').value);

    const sfxStart = new Audio('sfx/flipcard.mp3');
    sfxStart.play();

    setTimeout(function () {
        window.location.assign('juego.html');
    }, 2000);

    
}

// ===================================JUEGO==================================//
// Variables para controlar el juego
let cards = document.querySelectorAll(".card"); // Todas las cartas
let matched = 0; // Contador de pares encontrados
let cardOne, cardTwo; // Cartas seleccionadas
let disableDeck = false; // Evita clics múltiples mientras se resuelven cartas

// Cronómetro
let tiempoElemento = document.getElementById("tiempo");
let segundos = 0;
let minutos = 0;
let intervalo;

// Inicia el cronómetro
function iniciarCronometro() {
    intervalo = setInterval(() => {
         segundos++;
        if (segundos === 60) {
             minutos++;
            segundos = 0;
        }
        let seg = segundos < 10 ? "0" + segundos : segundos;
        let min = minutos < 10 ? "0" + minutos : minutos;
        tiempoElemento.textContent = `${min}:${seg}`;
    }, 1000);
}

// Detiene el cronómetro
function detenerCronometro() {
    clearInterval(intervalo);
}

// Reinicia el cronómetro
function reiniciarCronometro() {
    clearInterval(intervalo);
    segundos = 0;
    minutos = 0;
    tiempoElemento.textContent = "00:00";
    iniciarCronometro();
}

// Función para voltear carta
function girarCarta(card) {
    if (card !== cardOne && !disableDeck) {
        card.classList.add("flip");
        if (!cardOne) {
            // Primera carta seleccionada
            cardOne = card;
            return;
        }
        // Segunda carta seleccionada
        cardTwo = card;
        disableDeck = true;

        // Comparar las clases (in1, in2, etc.) de las cartas seleccionadas
        let classOne = cardOne.querySelector("h2").className;
        let classTwo = cardTwo.querySelector("h2").className;

        if (classOne === classTwo) {
            // Es un match
            matched++;
            cardOne.removeEventListener("click", seleccionarCarta);
            cardTwo.removeEventListener("click", seleccionarCarta);
            resetCartas();
            if (matched === 6) {
                detenerCronometro();
                document.querySelector('.ganar').style.display = "block";
            }
        } else {
            // No coinciden, dar efecto de "shake" y voltear de nuevo
            setTimeout(() => {
                cardOne.classList.add("shake");
                cardTwo.classList.add("shake");
            }, 400);

            setTimeout(() => {
                cardOne.classList.remove("shake", "flip");
                cardTwo.classList.remove("shake", "flip");
                resetCartas();
            }, 1000);
        }
    }
}

// Restablecer variables de control
function resetCartas() {
    cardOne = cardTwo = null;
    disableDeck = false;
}

// Añadir eventos de clic a cada carta
function seleccionarCarta(e) {
    girarCarta(e.currentTarget);
}

// Baraja las cartas
function barajarCartas() {
    matched = 0;
    cardOne = cardTwo = null;
    disableDeck = false;

    let array = Array.from(cards);
    array.sort(() => Math.random() - 0.5);

    // Reordenar elementos en el DOM
    let contenedor = document.querySelector(".cards");
    array.forEach(card => {
        card.classList.remove("flip");
        contenedor.appendChild(card);
    });

    // Volver a asignar eventos
    cards.forEach(card => {
        card.addEventListener("click", seleccionarCarta);
    });
}

// Función para el botón "Reiniciar"
function reiniciar() {
    reiniciarCronometro();
    barajarCartas();
    document.querySelector('.ganar').style.display = "none";

    //Sonido
        var sfxStart = new Audio('sfx/flipcard.mp3');
        sfxStart.play();
}

// Función para el botón "Nuevo Juego"
function nj(){
    comenzar();
}

