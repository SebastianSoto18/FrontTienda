import { products_service } from "../services/product_services.js";
import { carrito_controller } from "../controllers/orders_controller.js";
import { handleCantidadProductos } from "../utilities/navutilities.js";
const lista=document.getElementById("productos"); 

handleCantidadProductos();


function createProduct(product) {
    const li = document.createElement("li");
    li.className = "animate__animated animate__bounceIn cards__item";
    li.innerHTML = `
        <div class="card">
            <img src="../img/descarga.jpeg" alt="" srcset="">
            <div class="card__content">
                <h1 class="card-title">${product.name}</h1>
                <br>
                <p class="card-text" id="code">Codigo: ${product.code}</p>
                <p class="card-text" >Unidades disponibles: ${product.Quantity}</p>
                <br>
                <span class="card-text" id="price">${product.price}</span>
                <em style="display:none;">${product.Quantity}</em>
                <br>
                <button class="btn btn--block" data-id="${product.id}" >Agregar al pedido</button>
            </div>
        </div>
    `;

    return li;
}

const products = await products_service.getproducts().then(response => response.json());

products.forEach(product => {
    lista.appendChild( createProduct(product) );
});


lista.addEventListener("click", async (e) => {
    carrito_controller.addcarrito(e);
    handleCantidadProductos();
});


