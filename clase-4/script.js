/*

alert("Bienvenido al carrito 21! Que desea llevar?");

let ba
const hamburguesa = Number(prompt("Hamburguesas: 1-Baconcheese ($550). 2-Simple con queso ($350). 3-Lechuga y tomate ($400)."))

const entrada = Number(prompt("Acompanamiento: 1-Nuggets ($250). 2-Papas cheddar ($350). 3-Bastones muzzarella ($300)."))

let pedido;

if(hamburguesa == 1){
    pedido = 
}

*/

alert("Bienvenido al juego de adivinar el numero del 0 a 36. Tienes 5 vidas, mucha suerte !!! ");

let numeroUsuario = prompt(`Ingrese un numero. Tienes 5 vidas.`);

let numeroAleatorio = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

let numeroRandom = numeroAleatorio(0,37);

function adivinarNumero(numeroUsuario, numeroRandom){

    let vidas = 5;    

    while(numeroUsuario != numeroRandom){
        vidas--;

    if(vidas == 0){
        alert(`Perdiste!! El numero era ${numeroRandom}`)
        break;
    }
    numeroUsuario = prompt(`Incorrecto, ingrese otro numero. Te quedan ${vidas} vidas. `); 
    }
    
    if(numeroUsuario == numeroRandom){
        alert(`Felicitaciones, ganaste!!! El numero a adivinar era ${numeroRandom}.`);
    }

}

adivinarNumero(numeroUsuario, numeroRandom);
