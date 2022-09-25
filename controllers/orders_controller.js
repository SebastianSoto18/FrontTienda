const total = document.getElementById("total");
const cantidaproductos = document.getElementById("cantidadproductos");
const tabla = document.getElementById("tabla");
let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

console.log(cantidaproductos);



if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
}


const addcarrito= (e) => {

    console.log(e);
    if(e.path[0].classList.contains("btn")){
        setCarrito(e.target.parentElement, false);
    }
}

const setCarrito = (product, output) => {

    const productInfo = {
        id: product.querySelector("button").getAttribute("data-id"),
        name: product.querySelector("h1").textContent,
        price: product.querySelector("span").textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(productInfo.id)){
        productInfo.cantidad = carrito[productInfo.id].cantidad + 1;
    }

    carrito[productInfo.id] = {...productInfo};
    localStorage.setItem('carrito', JSON.stringify(carrito))

    if (output) {
        pintarCarrito();
    }

}

function pintarCarrito() {

    Object.values(carrito).forEach(product => {
        tabla.innerHTML += `
        <tr id="padre" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${product.name}</th>
            <td id="id">${product.id}</td>
            <td class="py-4 px-6" id="precio">${product.price}</td>
            <td class="py-4 px-6" id="cantidad">${product.cantidad}</td>
            <td class="py-4 px-6 text-right">
                <button type="button" id="aumentar" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 mb-2 ">+</button>
                <button type="button" id="disminuir" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 mb-2">-</button>
            </td>
        </tr>
            `
    })

    pintarFooter();

}


console.log(tabla);

tabla.addEventListener("click", (e) => {
    console.log(e);
    if(e.path[0].id == "aumentar"){
        aumentar(e.target.parentElement.parentElement);
    }
    if(e.path[0].id == "disminuir"){
        disminuir(e.target.parentElement.parentElement);
    }
});

function aumentar(e) {
    carrito[e.querySelector("#id").textContent].cantidad+=1;
    tabla.innerHTML = "";
    pintarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function disminuir(e) {
    carrito[e.querySelector("#id").textContent].cantidad-=1;


    if(carrito[e.querySelector("#id").textContent].cantidad == 0){
        delete carrito[e.querySelector("#id").textContent];
    }

    tabla.innerHTML = "";
    pintarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito))

    if(Object.keys(carrito).length === 0){
        total.innerHTML = "";
    }

}


const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce(( acc, {cantidad, price}) => parseInt(acc) + parseInt(cantidad) * parseInt(price) ,0)


function pintarFooter() {
    total.innerHTML = '$'+ nPrecio;
}

pintarCarrito();

export const carrito_controller = {addcarrito, setCarrito};

