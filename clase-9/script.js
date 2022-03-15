let lista = document.querySelectorAll('li');

console.log(lista)

for(const element of lista){
	console.log(element.innerText)
}


// for(const pais of paises){
// 	let listaPaises = document.querySelector('#paisesLista');
// }




const botonAgregarPais = document.querySelector('#boton-pais');

botonAgregarPais.addEventListener('click', () => {
	const listaPaises = document.querySelector('#paisesLista');
	const inputPais = document.querySelector('#input-pais');
	
	if (inputPais != '') {
		console.log("Clickeaste el boton botonAgregarPais")
	 	//creo elemento li
	 	let crearLiPais = document.createElement('li');
	 	//aniado al elemento li el valor del input
		crearLiPais.innerText = inputPais.value;

		listaPaises.appendChild(crearLiPais);

		const mySpan = document.createElement('span');
		mySpan.innerText = 'x';
		crearLiPais.appendChild(mySpan);
	}

	const cerrar = document.querySelectorAll('span');
	
	for(const span of cerrar){
		span.addEventListener('click', () =>{
			span.parentElement.style.display = "none";
		})
	}

	inputPais.value = '';
})