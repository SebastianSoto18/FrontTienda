import { products_service } from "../services/product_services.js";

const lista=document.getElementById("productos"); 

function createProduct(product) {
    const li = document.createElement("li");
    li.className = "animate__animated animate__bounceIn cards__item";
    li.innerHTML = `
        <div class="card">
            <img src="../img/descarga.jpeg" alt="" srcset="">
            <div class="card__content">
                <h1 class="card-title">${product.name}</h1>
                <span id="id" style="display:none">${product.id}</span>
                <p class="card-text">Codigo: ${product.code}</p>
                <p class="card-text">Cantidad: ${product.Quantity}</p>
                <p class="card-text">$${product.price}</p>
                <br>
                <button class="btn btn--block" id="agregar" >Agregar al pedido</button>
            </div>
        </div>
    `;

    return li;
}

const products = await products_service.getproducts().then(response => response.json());


products.forEach(product => {
    lista.appendChild( createProduct(product) );
});

const agregar = document.getElementById("agregar");

agregar.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(e.target.parentElement);
});