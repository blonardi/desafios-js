// INGRESE EL NUMERO DIVISIBLE

const numero = Number(prompt("Ingrese un numero para ver sus numeros divisibles de 1 al 100. "));
document.write(`<h1>Los numeros de 1 a 100 divisibles por ${numero} son: </h1>`);

for(let i = 1; i < 101; i++){
    if(i % numero == 0){
        document.write(`<h4>${i}</h4>`);
    }
}
