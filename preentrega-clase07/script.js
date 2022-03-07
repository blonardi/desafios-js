let Ropa = [
	{id: 1, producto: "Remera/s", precio: 1550},
	{id: 2, producto: "Campera/s", precio: 6500},
	{id: 3, producto: "Jean/s", precio: 5600},
	{id: 4, producto: "Chaleco/s", precio: 2300},
	{id: 5, producto: "Buzo/s", precio: 2990},	
]

class Compra{
	constructor(id,nombre,precio,cantidad){
		this.id   		= id;
		this.name		= nombre;
		this.price		= precio;
		this.quantity	= cantidad;
	}
}

let compraUsuario = [];
let opcionCompraUsuario = '';
let cantidadRopa;
let precioTotalCompra;

alert("***BIENVENIDO A LA TIENDA DE ROPA***");

while(opcionCompraUsuario != "0"){

	opcionCompraUsuario = parseInt(prompt("\n Ingrese 1- Para comprar remeras. \n Ingrese 2- Para comprar camperas. \n Ingrese 3- Para comprar jeans. \n Ingrese 4- Para comprar chalecos. \n Ingrese 5- Para comprar buzos. \n Ingrese 0 si no quiere hacer una compra."));
	cantidadRopa = parseInt(prompt("Ingrese la cantidad de prendas que desea llevar. \n Ingrese 0 si no quiere hacer una compra."));

	for(let prenda of Ropa){
		if(opcionCompraUsuario === prenda.id){
			compraUsuario.push(new Compra(prenda.id, prenda.producto, prenda.precio, cantidadRopa));
			precioTotalCompra += (prenda.precio * cantidadRopa); 
		}
	}
}
	
for(let i = 0; i < compraUsuario.length; i++){
 		console.log(`Usted compro ${compraUsuario[i].quantity} ${compraUsuario[i].name} de ${compraUsuario[i].price}`);
}

console.log(`El precio total de su compra es :  ${precioTotalCompra}`);