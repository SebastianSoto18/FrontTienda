import { order_service } from "../services/ordernes_service.js";
import { data_user } from "../utilities/navutilities.js";
import { handleCantidadProductos } from "../utilities/navutilities.js";
const total = document.getElementById("total");
const tabla = document.getElementById("tabla");
export let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
const pedir = document.getElementById("pedir");

handleCantidadProductos();

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
}


const addcarrito= (e) => {

    if(e.path[0].classList.contains("btn")){
        setCarrito(e.target.parentElement, false);
    }
}

const setCarrito = (product, output) => {

    const productInfo = {
        id: product.querySelector("button").getAttribute("data-id"),
        name: product.querySelector("h1").textContent,
        price: product.querySelector("span").textContent,
        maxcantidad: product.querySelector("em").textContent,
        cantidad: 1
    }



    if(carrito.hasOwnProperty(productInfo.id)){

        productInfo.cantidad = carrito[productInfo.id].cantidad + 1;
        
        if(!(carrito[productInfo.id].cantidad < parseInt(carrito[productInfo.id].maxcantidad))){
            Swal.fire({
                icon: 'error',
                title: 'te haz pasado de la cantidad maxima de productos, se a colocado la cantidad maxima de stock en su lugar'
            });
            carrito[product.id].cantidad = parseInt(carrito[product.id].maxcantidad);
        }

        }


        
    

    carrito[productInfo.id] = {...productInfo};
    localStorage.setItem('carrito', JSON.stringify(carrito))

    if (output) {
        pintarCarrito();
    }
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
    });


}

function pintarCarrito() {

    if(tabla != null){//error de github pages el cual dice que es null, por alguna razon 
    Object.values(carrito).forEach(product => {

        tabla.innerHTML += `
        <tr id="padre" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${product.name}</th>
            <td id="id">${product.id}</td>
            <td class="py-4 px-6" id="precio">${product.price}</td>
            <td class="py-4 px-6" id="cantidad">${product.cantidad}</td>
            <td id="maxcantidad" style="display:none;">${product.maxcantidad}</td>
            <td class="py-4 px-6 text-right">
                <button type="button" id="aumentar" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 mb-2 ">+</button>
                <button type="button" id="disminuir" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 mb-2">-</button>
            </td>
        </tr>
            `
    })

}

    pintarFooter();

}


//error cousado por github pages,debido a que segun el, la tabla esta nula en una parte de la pagina donde ni siquiera se llama el archivo
if(tabla==null){
}else{
tabla.addEventListener("click", (e) => {

    if(e.path[0].id == "aumentar"){
        aumentar(e.target.parentElement.parentElement);
    }
    if(e.path[0].id == "disminuir"){
        disminuir(e.target.parentElement.parentElement);
    }
});
}
function aumentar(e) {
    if(carrito[e.querySelector("#id").textContent].cantidad < parseInt(carrito[e.querySelector("#id").textContent].maxcantidad)){

        carrito[e.querySelector("#id").textContent].cantidad+=1;
        tabla.innerHTML = "";
        pintarCarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito))
        handleCantidadProductos();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes comprar mas de lo que hay en stock!',
        })
    }
    
}


function disminuir(e) {
    carrito[e.querySelector("#id").textContent].cantidad-=1;

    if(carrito[e.querySelector("#id").textContent].cantidad == 0){
        delete carrito[e.querySelector("#id").textContent];
    }

    tabla.innerHTML = "";
    pintarCarrito();
    handleButton();
    localStorage.setItem('carrito', JSON.stringify(carrito))
    handleCantidadProductos();
}


function calPrecio() {
    if(Object.keys(carrito).length === 0){
        if(total==null){//esto a causa del error antes mencionado
            return;
        }
        total.innerHTML = "";
        return;
    }
    const nPrecio=Object.values(carrito).reduce(( acc, {cantidad, price}) => parseInt(acc) + parseInt(cantidad) * parseInt(price) ,0)
    return nPrecio;
}



function pintarFooter() {
    if(total==null){//mas de lo mismo 
        return;
    }
    if(Object.keys(carrito).length === 0){
        total.innerHTML = "¡Animate a comprar algo!";
        return;
    }
    total.innerHTML = '$'+ calPrecio();
}

pintarCarrito();


function handleButton(){
    if(pedir!=null){
        if(Object.keys(carrito).length > 0){
            pedir.style.display = "block";
        }else{
            console.log(1)
            pedir.style.display = "none";
        }
    }
}


if(pedir!=null){
pedir.addEventListener("click", async () => {
    const quantity_per_products = Object.values(carrito).map(({cantidad}) => cantidad);
    const products = Object.values(carrito).map(({id}) => id);

    let productsdecode = ""
    products.forEach((product) => {
        productsdecode +=  product+",";
    });

    let quantity_per_productsdecode = ""
    quantity_per_products.forEach((quantity) => {
        quantity_per_productsdecode += quantity+",";
    });

    const date = new Date();
    const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()];
    const fecha = `${day}-${month}-${year}`;
    const Response = await order_service.create_order(data_user.id,data_user.name,data_user.phone,"tucasa",quantity_per_productsdecode.substring(0, quantity_per_productsdecode.length - 1),productsdecode.substring(0, productsdecode.length - 1),"Emited",fecha,calPrecio());

    if(Response.status==201){
        await Swal.fire({
            icon: 'success',
            title: 'Pedido realizado',
            text: 'Tu pedido se ha realizado con exito!',
        })
        localStorage.clear();
        window.location.href = "https://sebastiansoto18.github.io/FrontTienda/pages/home";
    }
    

})
}


handleButton();

export const carrito_controller = {addcarrito, setCarrito};

