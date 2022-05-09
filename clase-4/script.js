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
