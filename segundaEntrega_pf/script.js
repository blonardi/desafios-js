const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;

const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    getProjectNames()
})

//los items(cards), detectan el click e imprimimos lo que clickeamos
cards.addEventListener('click', e => {
    //  console.log(e);
    addToCarrito(e)
}) 

const tbody = document.querySelector('.tbody'); 
let carrito = []


//Traigo la data del archivo local (API)
const getProjectNames = async () => {
    try{
        const URL2 = 'fetch/data/data.json'
        const res = await fetch(URL2)
        const data = await res.json()
        // console.log(data)
        pintarCards(data)
    } catch (error) {
        console.error(error)
    }
}

//Pinto la data de la API en cartas en el html
const pintarCards = data => {
    // console.log(data)
    data.forEach(async (proyecto) => {
        // console.log(proyecto)
        templateCard.querySelector('.card-img-top').setAttribute("src", proyecto.img)
        templateCard.querySelector('.card-title').textContent = proyecto.nombre
        templateCard.querySelector('#category').textContent = proyecto.categoria
        templateCard.querySelector('.card-text').textContent = proyecto.presentacion
        templateCard.querySelector('.precio').textContent = proyecto.precio
        templateCard.querySelector('.btn-primary').dataset.id = proyecto.id
        // console.log(templateCard)
        const clone = templateCard.cloneNode(true)
        // console.log(clone)
        fragment.appendChild(clone) 
    })
    cards.appendChild(fragment)
}


const addToCarrito = e => {
        if (e.target.classList.contains('btn-primary')) {
            setCarrito(e.target.parentElement)
        }
        e.stopPropagation()
}

const setCarrito = objeto => {
    // // OBJETO CON DATOS DE CARTA CLICKEADA
    const newItem = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        title: objeto.querySelector('.card-title').textContent,
        precio: objeto.querySelector('.precio').textContent,
        imagen: objeto.querySelector('.card-img-top').src,
        cantidad: 1,
    }

    // console.log(newItem)
    addProjectCart(newItem)
}
//////////////////////*///////////////////////////////////////
 
// clickButton.forEach(btn => {
//     btn.addEventListener('click', addToCartProject)
// })

// function addToCartProject(e){
//     // console.log("aprete el boton")
//     const button = e.target;
//     console.log(button)
//     // con closest tomo la carta mas cercana 
//     const item = button.closest('.card');
//     console.log(item)
//     // y luego los valores de la carta mas cercana, la card entera
//     const itemTitle = item.querySelector('.card-title').textContent;
//     // console.log(itemTitle);
//     const itemPrice = item.querySelector('.precio').textContent;
//     // console.log(itemPrice)
//     const itemImg = item.querySelector('.card-img-top').src;
//     // console.log(itemImg)
//     //creo un objeto con los datos del item/proyecto
//     const newItem = {
//         title: itemTitle,
//         precio: itemPrice,
//         imagen: itemImg,
//         cantidad: 1,
//     }
//     // aniado funcion de aniadir item/proyectos al carrito[array]
//     addProjectCart(newItem)
// }

function addProjectCart(newItem){

    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('hide')
    },2000)
    alert.classList.remove('hide')

    const inputElemento = tbody.getElementsByClassName('input__elemento');
    
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            let inputValue = inputElemento[i];
            inputValue.value++;

            carritoTotal();
            return null;
            //con return null no se ejecuta las funciones de abajo.
        }
    }
    carrito.push(newItem);
    // console.log(carrito)
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = '';
    carrito.map(proyecto => {
        const tr = document.createElement('tr');
            tr.classList.add('projectCart');
            const content = `
            
            <th scope="row">${proyecto.id}</th>
                <td class="table__proyectos">
                    <img src="${proyecto.imagen}" alt="">
                    <h6 class="title">${proyecto.title}</h6>	
                </td>
                <td class="table__price"><p>${proyecto.precio}</p></td>
                <td class="table__cantidad">
                  <input type="number" min="1" value=${proyecto.cantidad} class="input__elemento">
                  <button class="delete btn btn-danger">x</button>
                </td>
            `
            tr.innerHTML = content;
            tbody.appendChild(tr);
    
            tr.querySelector(".delete").addEventListener('click', removeProjectCart)
            tr.querySelector('.input__elemento').addEventListener('change',sumaCantidad);
    })

    carritoTotal();
}

function carritoTotal(){
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace('$',''));
        total += precio*item.cantidad;
    })

    itemCartTotal.innerHTML = `Total $${total}`
    addLocalStorage();
}

function removeProjectCart(e){
    const buttonDelete = e.target;
    // console.log(buttonDelete )
    const tr = buttonDelete.closest('.projectCart')
    const title = tr.querySelector('.title').textContent;

    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i,1);
        }
    }
    
    // const alert = document.querySelector('.remove')

    // setTimeout( function(){
    //   alert.classList.add('remove')
    // }, 2000)
    // alert.classList.remove('remove')

    tr.remove(); 
    carritoTotal();
}

function sumaCantidad(e){
    const sumaInput = e.target;
    console.log(sumaInput)
    const tr = sumaInput.closest(".projectCart")
    const title = tr.querySelector('.title').textContent;
    
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value
            item.cantidad = sumaInput.value;
            carritoTotal();
        }
    })

}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
                
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    
    if(storage){
        carrito = storage
        renderCarrito()
    }
}