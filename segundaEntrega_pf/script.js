const clickButton = document.querySelectorAll('.button');
// console.log(clickButton);
const tbody = document.querySelector('.tbody');
let carrito = []

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCartProject)
})

function addToCartProject(e){
    const button = e.target;
    // console.log(button)
    // con closest tomo la carta mas cercana 
    const item = button.closest('.card');
    // console.log(item)
    // y luego los valores de la carta mas cercana, la card entera
    const itemTitle = item.querySelector('.card-title').textContent;
    console.log(itemTitle);
    const itemPrice = item.querySelector('.precio').textContent;
    console.log(itemPrice)
    const itemImg = item.querySelector('.card-img-top').src;
    // console.log(itemImg)
    //creo un objeto con los datos del item/proyecto
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        imagen: itemImg,
        cantidad: 1,
    }
    // aniado funcion de aniadir item/proyectos al carrito[array]
    addProjectCart(newItem)
}

function addProjectCart(newItem){

    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('hide')
    },2000)
    alert.classList.remove('hide')

    const inputElemento = tbody.getElementsByClassName('input__elemento');
    // console.log(inputElemento)
    
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            console.log(carrito[i].title)
            carrito[i].cantidad ++;  
            const inputValue = inputElemento[i];
            console.log(inputValue)
            inputValue.value++;
            carritoTotal();
            return null;
            //con return null no se ejecuta las funciones de abajo.
        }
    }

    carrito.push(newItem);
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = ''
    console.log(carrito);
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('projectCart')
        const content = `
        
        <th scope="row">1</th>
            <td class="table__proyectos">
                <img src="${item.imagen}" alt="">
                <h6 class="title">${item.title}</h6>	
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
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
    
    const alert = document.querySelector('.remove')

    setTimeout(function(){
        alert.classList.add('remove')
    },2000)
    alert.classList.remove('remove')
    
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

// {/* <td class="table__categoria">
                

                // <button class="delete btn btn-danger">X</button>
            // </td>        */}

// <select class="form-select" name="categoria-proyecto-carrito" id="categoria-proyecto-carrito">
                //     <option value="categoria-tecnologia">Tecnologia</option>
                //     <option value="categoria-medioambiente">MedioAmbiente</option>
                //     <option value="categoria-gastronomia">Gastronomia</option>
                //     <option value="categoria-social">Social</option>	
                // </select>


function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
                
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    
    if(storage){
        carrito = storage
        console.log(carrito)
        renderCarrito()
    }
}