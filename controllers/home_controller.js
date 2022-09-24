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
                <p class="card-text">Codigo: ${product.code}</p>
                <p class="card-text">Precio: ${product.price}</p>
                <p class="card-text">Cantidad: ${product.Quantity}</p>
            </div>
        </div>
    `;

    return li;
}

const products = await products_service.getproducts().then(response => response.json());


products.forEach(product => {
    lista.appendChild( createProduct(product) );
}
);